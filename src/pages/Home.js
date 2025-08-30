
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import ImageSearch from '../components/ImageSearch';
import { searchTreflePlants } from '../api/trefle';
import { fetchPlantNetData } from '../api/plantnet';

function Home() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Load some initial plants on component mount
  useEffect(() => {
    const loadInitialPlants = async () => {
      setLoading(true);
      try {
        const results = await searchTreflePlants('kerala plants');
        setPlants(results);
      } catch (error) {
        console.error('Initial load error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialPlants();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchTreflePlants(query);
      setPlants(results);
    } catch (error) {
      console.error('Search error:', error);
      setPlants([]);
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
        // Convert PlantNet results to our plant format
        const identifiedPlants = result.results.slice(0, 5).map((plant, index) => ({
          id: `plantnet_${Date.now()}_${index}`,
          name: plant.species?.commonNames?.[0] || plant.species?.scientificNameWithoutAuthor || 'Unknown Plant',
          scientificName: plant.species?.scientificNameWithoutAuthor || 'Unknown species',
          family: plant.species?.family?.scientificNameWithoutAuthor || 'Unknown family',
          image: plant.images?.[0]?.url?.m || plant.images?.[0]?.url?.s || 'https://via.placeholder.com/300x200?text=No+Image',
          description: `Confidence: ${Math.round(plant.score * 100)}%. ${plant.species?.genus?.scientificNameWithoutAuthor || ''} species identified from uploaded image.`
        }));
        
        setPlants(identifiedPlants);
        console.log('Plant identification successful:', identifiedPlants);
      } else {
        console.log('No plants identified from image');
        // Fallback to show some example plants
        const fallbackPlants = await searchTreflePlants('tropical plants');
        setPlants(fallbackPlants);
      }
    } catch (error) {
      console.error('Image identification error:', error);
      // Show error message plants
      setPlants([{
        id: 'error_1',
        name: 'Image Analysis Failed',
        scientificName: 'Please try another image',
        family: 'System Message',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
        description: 'Unable to identify plant from the uploaded image. Please try a clearer photo with visible plant features.'
      }]);
    } finally {
      setImageLoading(false);
    }
  };

  const quickSearchTerms = [
    { label: '🌺 Hibiscus', term: 'hibiscus' },
    { label: '🥥 Coconut', term: 'coconut' },
    { label: '🌹 Rose', term: 'rosa' },
    { label: '🌿 Ficus', term: 'ficus' },
    { label: '🥭 Mango', term: 'mango' },
    { label: '🎋 Bamboo', term: 'bamboo' }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Discover Kerala's Flora</h1>
        <p>Explore the rich botanical diversity of God's Own Country</p>
      </div>
      
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        
        <div style={{ margin: '1rem 0' }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', textAlign: 'center' }}>
            Quick Search:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {quickSearchTerms.map((item, index) => (
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

      {loading && <div className="loading">Searching for plants...</div>}
      {imageLoading && <div className="loading">🔍 Identifying plant from your image...</div>}
      
      <PlantList plants={plants} />
    </div>
  );
}

export default Home;
