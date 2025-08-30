import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Compare() {
  const [allSpecies, setAllSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
    setAllSpecies(savedSpecies);
    setFilteredSpecies(savedSpecies.slice(0, 10)); // Show first 10 for selection
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allSpecies.filter(species =>
        species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        species.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpecies(filtered.slice(0, 10));
    } else {
      setFilteredSpecies(allSpecies.slice(0, 10));
    }
  }, [searchTerm, allSpecies]);

  const addToComparison = (species) => {
    if (selectedSpecies.length >= 3) {
      alert('You can compare up to 3 species at a time.');
      return;
    }
    
    if (!selectedSpecies.find(s => s.id === species.id)) {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  const removeFromComparison = (speciesId) => {
    setSelectedSpecies(selectedSpecies.filter(s => s.id !== speciesId));
  };

  const clearComparison = () => {
    setSelectedSpecies([]);
  };

  const getComparisonData = (species) => {
    const obsMatch = species.description.match(/Observations: (\d+)/);
    const observations = obsMatch ? parseInt(obsMatch[1]) : 0;
    
    return {
      observations,
      category: species.family,
      conservationRisk: observations < 100 ? 'High' : observations < 500 ? 'Medium' : 'Low',
      habitat: species.description.includes('forest') ? 'Forest' : 
               species.description.includes('water') ? 'Aquatic' :
               species.description.includes('urban') ? 'Urban' : 'Various'
    };
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ color: '#2e7d32', marginBottom: '2rem' }}>⚖️ Species Comparison</h1>

      {/* Species Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Select Species to Compare</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search species to add to comparison..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              style={{
                backgroundColor: 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              onClick={() => addToComparison(species)}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#388e3c'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            >
              <img 
                src={species.image} 
                alt={species.name}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '0.5rem'
                }}
              />
              <h4 style={{ color: '#2e7d32', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>
                {species.name}
              </h4>
              <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
                {species.scientificName}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Species for Comparison */}
      {selectedSpecies.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#388e3c', margin: 0 }}>
              Comparing {selectedSpecies.length} Species
            </h2>
            <button
              onClick={clearComparison}
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
          </div>

          {selectedSpecies.length === 1 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Add at least one more species to start comparing.
            </p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${selectedSpecies.length}, 1fr)`, 
              gap: '1rem',
              backgroundColor: '#f9f9f9',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              {selectedSpecies.map((species) => {
                const compData = getComparisonData(species);
                
                return (
                  <div key={species.id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h3 style={{ color: '#2e7d32', margin: 0, fontSize: '1.1rem' }}>
                        {species.name}
                      </h3>
                      <button
                        onClick={() => removeFromComparison(species.id)}
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        ×
                      </button>
                    </div>
                    
                    <img 
                      src={species.image} 
                      alt={species.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '1rem'
                      }}
                    />
                    
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Scientific:</strong> {species.scientificName}
                      </p>
                      <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Category:</strong> {compData.category}
                      </p>
                      <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Observations:</strong> {compData.observations}
                      </p>
                      <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>Conservation Risk:</strong>{' '}
                        <span style={{ 
                          color: compData.conservationRisk === 'High' ? '#f44336' : 
                                compData.conservationRisk === 'Medium' ? '#ff9800' : '#4caf50'
                        }}>
                          {compData.conservationRisk}
                        </span>
                      </p>
                      <p style={{ margin: '0 0 1rem 0' }}>
                        <strong>Habitat:</strong> {compData.habitat}
                      </p>
                      
                      <button
                        onClick={() => history.push(`/species/${species.id}`)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          backgroundColor: '#2196f3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comparison Summary */}
          {selectedSpecies.length >= 2 && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: '#e8f5e8', 
              borderRadius: '12px' 
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>📊 Comparison Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Most Observed</h4>
                  <p style={{ margin: 0 }}>
                    {selectedSpecies.reduce((max, current) => 
                      getComparisonData(current).observations > getComparisonData(max).observations ? current : max
                    ).name}
                  </p>
                </div>
                
                <div>
                  <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Highest Risk</h4>
                  <p style={{ margin: 0 }}>
                    {selectedSpecies.find(s => getComparisonData(s).conservationRisk === 'High')?.name || 
                     selectedSpecies.find(s => getComparisonData(s).conservationRisk === 'Medium')?.name || 
                     'All Low Risk'}
                  </p>
                </div>
                
                <div>
                  <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Categories</h4>
                  <p style={{ margin: 0 }}>
                    {[...new Set(selectedSpecies.map(s => getComparisonData(s).category))].join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Compare;
