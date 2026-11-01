
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import ImageSearch from '../components/ImageSearch';
import { searchTreflePlants } from '../api/trefle';
import { fetchPlantNetData } from '../api/plantnet';

function Home() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'plants', 'animals'
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [searchContext, setSearchContext] = useState('kerala biodiversity');
  const resultsRef = useRef(null);
  const history = useHistory();

  // Load some initial species on component mount
  useEffect(() => {
    const loadInitialSpecies = async () => {
      setLoading(true);
      try {
        const results = await searchTreflePlants('kerala biodiversity');
        setSpecies(results);
      } catch (error) {
        console.error('Initial load error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialSpecies();
  }, []);

  const handleSearch = async (query) => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    setHasUserSearched(true);
    setSearchContext(normalizedQuery);
    setLoading(true);
    try {
      const results = await searchTreflePlants(normalizedQuery);
      setSpecies(results);
    } catch (error) {
      console.error('Search error:', error);
      setSpecies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = async (searchTerm) => {
    await handleSearch(searchTerm);
  };

  const handleImageSearch = async (imageFile) => {
    setHasUserSearched(true);
    setSearchContext('image identification');
    setImageLoading(true);
    try {
      console.log('Uploading image for identification...');
      const result = await fetchPlantNetData(imageFile);
      
      if (result && result.results && result.results.length > 0) {
        // Convert PlantNet results to our species format
        const identifiedSpecies = result.results.slice(0, 5).map((item, index) => ({
          id: `plantnet_${Date.now()}_${index}`,
          name: item.species?.commonNames?.[0] || item.species?.scientificNameWithoutAuthor || 'Unknown Species',
          scientificName: item.species?.scientificNameWithoutAuthor || 'Unknown species',
          family: item.species?.family?.scientificNameWithoutAuthor || 'Unknown family',
          image: item.images?.[0]?.url?.m || item.images?.[0]?.url?.s || 'https://via.placeholder.com/300x200?text=No+Image',
          description: `Confidence: ${Math.round(item.score * 100)}%. ${item.species?.genus?.scientificNameWithoutAuthor || ''} species identified from uploaded image.`
        }));
        
        setSpecies(identifiedSpecies);
        console.log('Species identification successful:', identifiedSpecies);
      } else {
        console.log('No species identified from image');
        // Fallback to show some example species
        const fallbackSpecies = await searchTreflePlants('tropical biodiversity');
        setSpecies(fallbackSpecies);
      }
    } catch (error) {
      console.error('Image identification error:', error);
      // Show error message
      setSpecies([{
        id: 'error_1',
        name: 'Image Analysis Failed',
        scientificName: 'Please try another image',
        family: 'System Message',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
        description: 'Unable to identify species from the uploaded image. Please try a clearer photo with visible features.'
      }]);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (!hasUserSearched) return;
    if (loading || imageLoading) return;
    if (!resultsRef.current) return;

    resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [species, loading, imageLoading, hasUserSearched]);

  const quickSearchTerms = [
    { label: '🌺 Plants', term: 'kerala plants', category: 'plants' },
    { label: '🐾 Animals', term: 'kerala animals', category: 'animals' },
    { label: '🌿 Herbs', term: 'medicinal plants', category: 'plants' },
    { label: '🦅 Birds', term: 'kerala birds', category: 'animals' },
    { label: '🌳 Trees', term: 'forest trees', category: 'plants' },
    { label: '🐘 Wildlife', term: 'kerala wildlife', category: 'animals' }
  ];

  const tabStyle = (tab) => ({
    padding: '0.5rem 1rem',
    backgroundColor: activeTab === tab ? '#2e7d32' : 'transparent',
    color: activeTab === tab ? 'white' : '#2e7d32',
    border: `2px solid #2e7d32`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    fontSize: '1rem'
  });

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Discover Kerala's BioDiversity</h1>
        <p>Explore the rich flora and fauna of God's Own Country</p>
        
        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button 
            style={tabStyle('all')}
            onClick={() => setActiveTab('all')}
          >
            🌍 All Species
          </button>
          <button 
            style={tabStyle('plants')}
            onClick={() => setActiveTab('plants')}
          >
            🌿 Plants
          </button>
          <button 
            style={tabStyle('animals')}
            onClick={() => setActiveTab('animals')}
          >
            🦎 Animals
          </button>
        </div>
      </div>
      
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        
        <div style={{ margin: '1rem 0' }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', textAlign: 'center' }}>
            Quick Explore:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {quickSearchTerms
              .filter(item => activeTab === 'all' || item.category === activeTab)
              .map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(item.term)}
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  border: '1px solid #c8e6c9',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 500
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#c8e6c9';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#e8f5e8';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="divider">or</div>
        <ImageSearch onImageSearch={handleImageSearch} />

        {/* Feature Access Buttons */}
        <div style={{ 
          marginTop: '3rem', 
          padding: '2.5rem', 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ 
              color: '#2e7d32', 
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🚀 Discover More Features
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: '1.1rem',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Unlock the full potential of Kerala's biodiversity exploration
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1.5rem',
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(2, 1fr)'
            },
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            <div
              onClick={() => history.push('/gallery')}
              style={{
                padding: '1.8rem 1.5rem',
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                color: 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
                border: 'none',
                transform: 'translateY(0)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 12px 40px rgba(33, 150, 243, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.3)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🖼️</div>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem', fontWeight: '600' }}>Species Gallery</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
                Browse our complete collection in a stunning visual gallery
              </p>
            </div>

            <div
              onClick={() => history.push('/favorites')}
              style={{
                padding: '1.8rem 1.5rem',
                background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                color: 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)',
                border: 'none',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 12px 40px rgba(244, 67, 54, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(244, 67, 54, 0.3)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>❤️</div>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem', fontWeight: '600' }}>My Favorites</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
                Your personal collection of beloved species
              </p>
            </div>

            <div
              onClick={() => history.push('/compare')}
              style={{
                padding: '1.8rem 1.5rem',
                background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                color: 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(156, 39, 176, 0.3)',
                border: 'none',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 12px 40px rgba(156, 39, 176, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(156, 39, 176, 0.3)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>⚖️</div>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem', fontWeight: '600' }}>Compare Species</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
                Analyze differences and similarities side by side
              </p>
            </div>

            <div
              onClick={() => history.push('/discovery')}
              style={{
                padding: '1.8rem 1.5rem',
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                color: 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(255, 152, 0, 0.3)',
                border: 'none',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 12px 40px rgba(255, 152, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(255, 152, 0, 0.3)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🎲</div>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem', fontWeight: '600' }}>Random Discovery</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
                Let serendipity guide your biodiversity journey
              </p>
            </div>
          </div>

          {/* Additional Quick Stats */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.5)'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '1.8rem', color: '#2e7d32', fontWeight: 'bold' }}>4000+</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Plant Species</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', color: '#ff9800', fontWeight: 'bold' }}>500+</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Bird Species</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', color: '#9c27b0', fontWeight: 'bold' }}>139</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Mammals</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', color: '#2196f3', fontWeight: 'bold' }}>∞</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Discoveries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={resultsRef}
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f8fff8',
          border: '1px solid #dcefdc',
          borderRadius: '10px'
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Search Results</h3>
        <p style={{ margin: 0, color: '#666' }}>
          Showing results for <strong>{searchContext}</strong>
        </p>
      </div>

      {loading && <div className="loading">Searching for species...</div>}
      {imageLoading && <div className="loading">🔍 Identifying species from your image...</div>}

      <PlantList plants={species} />
    </div>
  );
}

export default Home;
