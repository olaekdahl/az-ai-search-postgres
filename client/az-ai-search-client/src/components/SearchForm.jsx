import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SEARCH_API}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query, skip: 0 })  // Initial skip is 0 for new search
      });
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter search term" 
      />
      <button type="submit">Search</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default SearchForm;