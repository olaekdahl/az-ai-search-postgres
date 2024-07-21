import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import UpsertForm from "./components/UpsertForm";

const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (searchResults) => {
    setResults(searchResults);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <SearchForm onSearch={handleSearch} />
        <UpsertForm />
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <SearchResults results={results} />
      </div>
    </div>
  );
};

export default App;
