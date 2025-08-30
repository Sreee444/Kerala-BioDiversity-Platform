import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RandomDiscovery() {
  const [randomSpecies, setRandomSpecies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history_list, setHistoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('discoveryHistory') || '[]');
    setHistoryList(savedHistory);
  }, []);

  const getRandomSpecies = async () => {
    setLoading(true);
    
    // First try to get from saved species
    const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
    
    if (savedSpecies.length > 0) {
      const randomIndex = Math.floor(Math.random() * savedSpecies.length);
      const species = savedSpecies[randomIndex];
      setRandomSpecies(species);
      
      // Add to history
      const newHistory = [species, ...history_list].slice(0, 10); // Keep last 10
      setHistoryList(newHistory);
      localStorage.setItem('discoveryHistory', JSON.stringify(newHistory));
    } else {
      // If no saved species, make API call for random discovery
      try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(
          `https://api.inaturalist.org/v1/observations?place_id=7161&page=${randomPage}&per_page=1&order=random&quality_grade=research`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const obs = data.results[0];
            const species = {
              id: obs.id,
              name: obs.taxon?.preferred_common_name || obs.taxon?.name || 'Unknown Species',
              scientificName: obs.taxon?.name || 'Unknown',
              family: obs.taxon?.iconic_taxon_name || 'Unknown',
              image: obs.photos?.[0]?.url || '/api/placeholder/400/300',
              description: `Random discovery from Kerala! Observed ${obs.observed_on || 'recently'}.`
            };
            
            setRandomSpecies(species);
            
            // Add to history
            const newHistory = [species, ...history_list].slice(0, 10);
            setHistoryList(newHistory);
            localStorage.setItem('discoveryHistory', JSON.stringify(newHistory));
          }
        }
      } catch (error) {
        console.error('Error fetching random species:', error);
        // Fallback: show a default species
        const fallbackSpecies = {
          id: 'random-' + Date.now(),
          name: 'Kerala Biodiversity',
          scientificName: 'Biodiversitas keralensis',
          family: 'Discovery',
          image: '/api/placeholder/400/300',
          description: 'Explore the amazing biodiversity of Kerala! Use the search feature to discover specific species.'
        };
        setRandomSpecies(fallbackSpecies);
      }
    }
    
    setLoading(false);
  };

  const viewSpeciesDetails = () => {
    if (randomSpecies) {
      // Save species to localStorage if not already there
      const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
      if (!savedSpecies.find(s => s.id === randomSpecies.id)) {
        savedSpecies.push(randomSpecies);
        localStorage.setItem('speciesData', JSON.stringify(savedSpecies));
      }
      history.push(`/species/${randomSpecies.id}`);
    }
  };

  const surpriseMeAgain = () => {
    getRandomSpecies();
  };

  const viewFromHistory = (species) => {
    setRandomSpecies(species);
  };

  const clearHistory = () => {
    setHistoryList([]);
    localStorage.setItem('discoveryHistory', JSON.stringify([]));
  };

  const funFacts = [
    "Kerala is home to over 4,000 flowering plant species! 🌸",
    "The Western Ghats of Kerala hosts 139 mammal species 🐾",
    "Kerala has recorded over 500 bird species 🦅",
    "The state harbors 202 freshwater fish species 🐟",
    "Kerala's forests contain over 150 butterfly species 🦋",
    "The state is home to endangered species like the Nilgiri Tahr 🐐",
    "Kerala's backwaters support unique aquatic ecosystems 🌊"
  ];

  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>🎲 Random Species Discovery</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Let's discover something amazing from Kerala's biodiversity!
        </p>
      </div>

      {/* Fun Fact */}
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#e3f2fd', 
        borderLeft: '4px solid #2196f3',
        borderRadius: '6px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#1976d2', margin: '0 0 0.5rem 0' }}>💡 Did you know?</h3>
        <p style={{ margin: 0, color: '#333' }}>{randomFact}</p>
      </div>

      {/* Main Discovery Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        {loading ? (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Discovering an amazing species...</p>
          </div>
        ) : randomSpecies ? (
          <div>
            <img 
              src={randomSpecies.image} 
              alt={randomSpecies.name}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            />
            
            <h2 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>
              {randomSpecies.name}
            </h2>
            
            <p style={{ 
              color: '#666', 
              fontStyle: 'italic', 
              fontSize: '1.1rem',
              marginBottom: '0.5rem' 
            }}>
              {randomSpecies.scientificName}
            </p>
            
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>
              Category: {randomSpecies.family}
            </p>
            
            <p style={{ 
              color: '#555', 
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto'
            }}>
              {randomSpecies.description}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={viewSpeciesDetails}
                style={{
                  padding: '0.8rem 2rem',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                📖 Learn More
              </button>
              
              <button
                onClick={surpriseMeAgain}
                style={{
                  padding: '0.8rem 2rem',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                🎲 Surprise Me Again!
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
            <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Ready to Explore?</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Click the button below to discover a random species from Kerala's amazing biodiversity!
            </p>
            <button
              onClick={getRandomSpecies}
              style={{
                padding: '1rem 3rem',
                backgroundColor: '#388e3c',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 16px rgba(56,142,60,0.3)'
              }}
            >
              🎯 Surprise Me!
            </button>
          </div>
        )}
      </div>

      {/* Discovery History */}
      {history_list.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#388e3c', margin: 0 }}>📚 Recent Discoveries</h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Clear History
            </button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '1rem' 
          }}>
            {history_list.map((species, index) => (
              <div
                key={index}
                onClick={() => viewFromHistory(species)}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'border-color 0.2s ease, transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#388e3c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img 
                  src={species.image} 
                  alt={species.name}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '0.5rem'
                  }}
                />
                <h5 style={{ color: '#2e7d32', margin: '0', fontSize: '0.9rem' }}>
                  {species.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomDiscovery;
