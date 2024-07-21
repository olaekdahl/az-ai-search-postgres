import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from "./components/SearchResults";
import UpsertForm from './components/UpsertForm';

const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (searchResults) => {
    setResults(searchResults);
  };

  return (
    <div className="App">
      <UpsertForm />
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default App;
