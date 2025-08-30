
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search plants & animals... (try: kerala birds, medicinal plants)"
        style={{
          padding: '0.7rem 1rem',
          width: 380,
          fontSize: '1rem',
          borderRadius: 6,
          border: '1.5px solid #bdbdbd',
          outline: 'none',
          boxShadow: '0 1px 4px #0001',
          background: '#f9f9f9',
          fontWeight: 500,
        }}
      />
      <button 
        type="submit" 
        style={{
          padding: '0.7rem 1.2rem',
          backgroundColor: '#388e3c',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
