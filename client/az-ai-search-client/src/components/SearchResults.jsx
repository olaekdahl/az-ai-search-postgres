import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            SCORE: {result.score} - {result.document.accountnumber}: {result.document.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;