
import React, { useState, useEffect } from 'react';
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
    setLoading(true);
    try {
      const results = await searchTreflePlants(query);
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

  const quickSearchTerms = [
    { label: '🌺 Plants', term: 'kerala plants', category: 'plants' },
    { label: '� Animals', term: 'kerala animals', category: 'animals' },
    { label: '� Herbs', term: 'medicinal plants', category: 'plants' },
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
      </div>

      {loading && <div className="loading">Searching for species...</div>}
      {imageLoading && <div className="loading">🔍 Identifying species from your image...</div>}
      
      <PlantList plants={species} />
    </div>
  );
}

export default Home;
