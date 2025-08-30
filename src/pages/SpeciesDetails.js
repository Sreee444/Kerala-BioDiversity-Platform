import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function SpeciesDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Get species from localStorage or API
    const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
    const foundSpecies = savedSpecies.find(s => s.id.toString() === id);
    
    if (foundSpecies) {
      setSpecies(foundSpecies);
      
      // Check if it's in favorites
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some(fav => fav.id.toString() === id));
    }
    setLoading(false);
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id.toString() !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(species);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getConservationStatus = () => {
    // Simulate conservation status based on observation count
    if (!species) return { status: 'Unknown', color: '#999', description: 'Status unknown' };
    
    const obsCount = parseInt(species.description.match(/Observations: (\d+)/) || [0, 0])[1];
    
    if (obsCount > 1000) return { status: 'Least Concern', color: '#4caf50', description: 'Stable population' };
    if (obsCount > 500) return { status: 'Near Threatened', color: '#ff9800', description: 'Declining population' };
    if (obsCount > 100) return { status: 'Vulnerable', color: '#f44336', description: 'At risk' };
    return { status: 'Data Deficient', color: '#9e9e9e', description: 'Insufficient data' };
  };

  const getSeasonalInfo = () => {
    if (!species) return null;
    
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) {
      return {
        bestTime: 'October - March',
        season: 'Post-monsoon and winter',
        details: 'Best viewing during cooler months when most plants are in bloom'
      };
    } else if (isBird) {
      return {
        bestTime: 'November - February',
        season: 'Winter migration period',
        details: 'Many migratory birds visit Kerala during winter months'
      };
    } else {
      return {
        bestTime: 'Year-round',
        season: 'All seasons',
        details: 'Can be spotted throughout the year in suitable habitats'
      };
    }
  };

  const getHabitatInfo = () => {
    if (!species) return 'Various habitats';
    
    const desc = species.description.toLowerCase();
    if (desc.includes('forest')) return 'Dense tropical forests';
    if (desc.includes('water') || desc.includes('aquatic')) return 'Aquatic environments';
    if (desc.includes('mountain')) return 'Mountainous regions';
    if (desc.includes('urban')) return 'Urban and suburban areas';
    return 'Diverse habitats across Kerala';
  };

  const getElevationRange = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    return isPlant ? '0-2695m (Sea level to peak altitudes)' : '0-1500m (Lower to mid elevations)';
  };

  const getEcosystem = () => {
    const desc = species.description.toLowerCase();
    if (desc.includes('forest')) return 'Western Ghats forest ecosystem';
    if (desc.includes('water')) return 'Freshwater/Coastal ecosystem';
    return 'Tropical biodiversity hotspot';
  };

  const getSize = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) return 'Varies from small herbs to large trees';
    if (isBird) return 'Small to medium-sized (10-50cm)';
    return 'Species-specific size variations';
  };

  const getKeyFeatures = () => {
    const desc = species.description.toLowerCase();
    if (desc.includes('flower')) return 'Distinctive flowering patterns';
    if (desc.includes('bird')) return 'Unique plumage and beak structure';
    if (desc.includes('leaf')) return 'Characteristic leaf arrangements';
    return 'Species-specific morphological traits';
  };

  const getIdentificationTips = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) return 'Look for leaf shape, flower color, and growth pattern';
    if (isBird) return 'Observe size, coloration, and behavior patterns';
    return 'Note habitat preferences and seasonal activity';
  };

  const getSimilarSpecies = () => {
    return 'Related species in the same family group';
  };

  const getFeedingInfo = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) return 'Photosynthesis and nutrient absorption from soil';
    if (isBird) return 'Varied diet including seeds, insects, and fruits';
    return 'Species-specific feeding habits';
  };

  const getReproductionInfo = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) return 'Flowering and seed production cycles';
    if (isBird) return 'Seasonal breeding with nest construction';
    return 'Life cycle patterns vary by species';
  };

  const getBehaviorInfo = () => {
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    const isAnimal = species.description?.includes('🐾');
    
    if (isBird) return 'Active during daylight hours, social flocking';
    if (isAnimal) return 'Territorial behavior with specific activity patterns';
    return 'Adaptive behavior to local environment';
  };

  const getThreats = () => {
    return [
      'Habitat destruction and fragmentation',
      'Climate change impacts',
      'Human encroachment',
      'Pollution and contamination',
      'Invasive species competition'
    ];
  };

  const getConservationEfforts = () => {
    return [
      'Protected area establishment',
      'Wildlife corridor creation',
      'Community awareness programs',
      'Research and monitoring',
      'Habitat restoration projects'
    ];
  };

  const getFunFacts = () => {
    const isPlant = species.family?.includes('Plantae') || species.description?.includes('🌿');
    const isBird = species.family?.includes('Aves') || species.description?.includes('🦅');
    
    if (isPlant) {
      return [
        'Kerala hosts over 4,000 flowering plant species',
        'Many plants have traditional medicinal uses',
        'Some species are endemic to the Western Ghats',
        'Plants play crucial roles in ecosystem balance'
      ];
    } else if (isBird) {
      return [
        'Kerala records over 500 bird species',
        'Many are seasonal migrants from northern regions',
        'Some species are endemic to the Western Ghats',
        'Birds are excellent environmental indicators'
      ];
    } else {
      return [
        'Kerala is a global biodiversity hotspot',
        'Home to many endemic species',
        'Rich ecosystem diversity supports varied wildlife',
        'Traditional knowledge helps in conservation'
      ];
    }
  };

  if (loading) {
    return <div className="loading">Loading species details...</div>;
  }

  if (!species) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Species not found</h2>
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
    );
  }

  const conservation = getConservationStatus();
  const seasonal = getSeasonalInfo();

  return (
    <div className="species-details" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      {/* Header with back button and favorite */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => history.goBack()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#388e3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        
        <button
          onClick={toggleFavorite}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isFavorite ? '#f44336' : '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>

      {/* Main species info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <img 
            src={species.image} 
            alt={species.name}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
          />
        </div>
        
        <div>
          <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>{species.name}</h1>
          <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
            {species.scientificName}
          </p>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            <strong>Category:</strong> {species.family}
          </p>
          
          {/* Conservation Status */}
          <div style={{ 
            padding: '1rem', 
            backgroundColor: conservation.color + '20', 
            border: `2px solid ${conservation.color}`,
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h3 style={{ color: conservation.color, margin: '0 0 0.5rem 0' }}>
              Conservation Status: {conservation.status}
            </h3>
            <p style={{ margin: 0, color: '#555' }}>{conservation.description}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#2e7d32' }}>Description</h2>
        <p style={{ lineHeight: '1.6', color: '#555' }}>{species.description}</p>
      </div>

      {/* Additional Information Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Habitat & Distribution */}
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '12px',
          border: '1px solid #e3f2fd'
        }}>
          <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>🌍 Habitat & Distribution</h3>
          <div style={{ lineHeight: '1.6' }}>
            <p><strong>Primary Habitat:</strong> {getHabitatInfo()}</p>
            <p><strong>Distribution:</strong> Found across Kerala's Western Ghats</p>
            <p><strong>Elevation Range:</strong> {getElevationRange()}</p>
            <p><strong>Ecosystem:</strong> {getEcosystem()}</p>
          </div>
        </div>

        {/* Physical Characteristics */}
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#fff3e0', 
          borderRadius: '12px',
          border: '1px solid #ffe0b2'
        }}>
          <h3 style={{ color: '#f57c00', marginBottom: '1rem' }}>📏 Physical Characteristics</h3>
          <div style={{ lineHeight: '1.6' }}>
            <p><strong>Size:</strong> {getSize()}</p>
            <p><strong>Key Features:</strong> {getKeyFeatures()}</p>
            <p><strong>Identification:</strong> {getIdentificationTips()}</p>
            <p><strong>Similar Species:</strong> {getSimilarSpecies()}</p>
          </div>
        </div>
      </div>

      {/* Ecology & Behavior */}
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#f3e5f5', 
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #e1bee7'
      }}>
        <h3 style={{ color: '#7b1fa2', marginBottom: '1rem' }}>🔬 Ecology & Behavior</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ color: '#8e24aa', margin: '0 0 0.5rem 0' }}>Feeding</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{getFeedingInfo()}</p>
          </div>
          <div>
            <h4 style={{ color: '#8e24aa', margin: '0 0 0.5rem 0' }}>Reproduction</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{getReproductionInfo()}</p>
          </div>
          <div>
            <h4 style={{ color: '#8e24aa', margin: '0 0 0.5rem 0' }}>Behavior</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{getBehaviorInfo()}</p>
          </div>
        </div>
      </div>

      {/* Conservation & Threats */}
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#ffebee', 
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #ffcdd2'
      }}>
        <h3 style={{ color: '#c62828', marginBottom: '1rem' }}>⚠️ Conservation & Threats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ color: '#d32f2f', margin: '0 0 0.5rem 0' }}>Current Threats</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555' }}>
              {getThreats().map((threat, index) => (
                <li key={index} style={{ marginBottom: '0.3rem' }}>{threat}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#d32f2f', margin: '0 0 0.5rem 0' }}>Conservation Efforts</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555' }}>
              {getConservationEfforts().map((effort, index) => (
                <li key={index} style={{ marginBottom: '0.3rem' }}>{effort}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Seasonal Information */}
      {seasonal && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🗓️ Best Time to Spot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Best Time</h4>
              <p style={{ margin: 0 }}>{seasonal.bestTime}</p>
            </div>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Season</h4>
              <p style={{ margin: 0 }}>{seasonal.season}</p>
            </div>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Details</h4>
              <p style={{ margin: 0 }}>{seasonal.details}</p>
            </div>
          </div>
        </div>
      )}

      {/* Fun Facts */}
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #c8e6c9'
      }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🎯 Fun Facts & Trivia</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {getFunFacts().map((fact, index) => (
            <div key={index} style={{ 
              padding: '1rem', 
              backgroundColor: 'rgba(255,255,255,0.7)', 
              borderRadius: '8px',
              border: '1px solid rgba(46,125,50,0.2)'
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>💡</span>
              <span style={{ color: '#555' }}>{fact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Information */}
      {seasonal && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🗓️ Best Time to Spot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Best Time</h4>
              <p style={{ margin: 0 }}>{seasonal.bestTime}</p>
            </div>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Season</h4>
              <p style={{ margin: 0 }}>{seasonal.season}</p>
            </div>
            <div>
              <h4 style={{ color: '#388e3c', margin: '0 0 0.5rem 0' }}>Details</h4>
              <p style={{ margin: 0 }}>{seasonal.details}</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Actions */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => history.push('/gallery')}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🖼️ View Gallery
        </button>
        
        <button
          onClick={() => history.push('/compare')}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ⚖️ Compare Species
        </button>
      </div>
    </div>
  );
}

export default SpeciesDetails;
