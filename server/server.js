import express from 'express';
import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";
const indexName = process.env.SEARCH_INDEX || "";

app.use(cors());
app.use(express.json());

// Initialize Azure Search client
const searchClient = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

app.post('/search', async (req, res) => {
  const searchQuery = req.body.q || '*';
  const skip = req.body.skip || 0;

  try {
    const searchOptions = {
        select: ["accountnumber", "name"],
        searchFields: ["accountnumber", "name"]
    };
    const searchResults = await searchClient.search(searchQuery, {...searchOptions, skip: skip });
    const results = [];
    for await (const result of searchResults.results) {
        results.push({
          score: result["@search.score"],
          ...result
        });
    }
    res.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).send({ error: 'Failed to search' });
  }
});

app.post('/upsert', async (req, res) => {
  try {
    const document = req.body;

    // Upsert the document
    await searchClient.mergeOrUploadDocuments([document]);

    res.status(200).send({ message: 'Document upserted successfully' });
  } catch (error) {
    console.error('Error upserting document:', error);
    res.status(500).send({ error: 'Failed to upsert document' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});