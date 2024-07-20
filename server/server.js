import express from 'express';
import { SearchIndexClient, AzureKeyCredential } from '@azure/search-documents';
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

app.post('/search', async (req, res) => {
  const searchQuery = req.body.q || '*';
  const skip = req.body.skip || 0;

  const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const searchClient = indexClient.getSearchClient(indexName);

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
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});