import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SEARCH_API}:8080/search`, {
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter search term" 
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <button type="submit" style={{ padding: '8px', fontSize: '16px' }}>Search</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default SearchForm;