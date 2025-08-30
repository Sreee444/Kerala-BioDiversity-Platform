import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (speciesId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== speciesId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  };

  const viewSpecies = (speciesId) => {
    history.push(`/species/${speciesId}`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2e7d32' }}>❤️ My Favorite Species</h1>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💚</div>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>No favorites yet!</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            Start exploring and add species to your favorites by clicking the heart icon.
          </p>
          <button
            onClick={() => history.push('/')}
            style={{
              padding: '0.8rem 2rem',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Explore Species
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {favorites.map((species) => (
            <div
              key={species.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
            >
              <div onClick={() => viewSpecies(species.id)}>
                <img 
                  src={species.image} 
                  alt={species.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ 
                    color: '#2e7d32', 
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.2rem'
                  }}>
                    {species.name}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {species.scientificName}
                  </p>
                  <p style={{ 
                    color: '#888', 
                    fontSize: '0.9rem',
                    margin: '0'
                  }}>
                    {species.family}
                  </p>
                </div>
              </div>
              
              <div style={{ 
                padding: '0 1rem 1rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => viewSpecies(species.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  View Details
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(species.id);
                  }}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                  title="Remove from favorites"
                >
                  💔
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
