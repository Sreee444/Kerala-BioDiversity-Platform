import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Gallery() {
  const [allSpecies, setAllSpecies] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or masonry
  const history = useHistory();

  const categories = ['All', 'Plants', 'Animals', 'Birds', 'Reptiles', 'Amphibians', 'Insects'];

  useEffect(() => {
    const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
    setAllSpecies(savedSpecies);
    setFilteredSpecies(savedSpecies);
  }, []);

  useEffect(() => {
    let filtered = [...allSpecies];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(species => {
        const desc = species.description.toLowerCase();
        const family = species.family?.toLowerCase() || '';
        
        switch (selectedCategory) {
          case 'Plants':
            return desc.includes('🌿') || family.includes('plantae');
          case 'Birds':
            return desc.includes('🦅') || family.includes('aves');
          case 'Reptiles':
            return desc.includes('🐍') || family.includes('reptilia');
          case 'Amphibians':
            return desc.includes('🐸') || family.includes('amphibia');
          case 'Insects':
            return desc.includes('🦋') || family.includes('insecta');
          case 'Animals':
            return desc.includes('🐾') || (!desc.includes('🌿') && !family.includes('plantae'));
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'scientific':
          return a.scientificName.localeCompare(b.scientificName);
        case 'category':
          return a.family.localeCompare(b.family);
        default:
          return 0;
      }
    });

    setFilteredSpecies(filtered);
  }, [selectedCategory, sortBy, allSpecies]);

  const viewSpecies = (speciesId) => {
    history.push(`/species/${speciesId}`);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🖼️ Species Gallery</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Explore our complete collection of Kerala's biodiversity
        </p>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          >
            <option value="name">Name</option>
            <option value="scientific">Scientific Name</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* View Mode */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            View:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'grid' ? '#388e3c' : '#ddd',
                color: viewMode === 'grid' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'masonry' ? '#388e3c' : '#ddd',
                color: viewMode === 'masonry' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Masonry
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginLeft: 'auto', alignSelf: 'end' }}>
          <span style={{ color: '#666', fontSize: '1rem' }}>
            {filteredSpecies.length} species found
          </span>
        </div>
      </div>

      {/* Gallery */}
      {filteredSpecies.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ color: '#666' }}>No species found</h2>
          <p style={{ color: '#888' }}>Try selecting a different category or search for species first.</p>
          <button
            onClick={() => history.push('/')}
            style={{
              padding: '0.8rem 2rem',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}
          >
            Search Species
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(250px, 1fr))' 
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          gridAutoRows: viewMode === 'masonry' ? 'masonry' : 'auto'
        }}>
          {filteredSpecies.map((species, index) => (
            <div
              key={species.id}
              onClick={() => viewSpecies(species.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ...(viewMode === 'masonry' && {
                  breakInside: 'avoid',
                  marginBottom: '1rem'
                })
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
              <img 
                src={species.image} 
                alt={species.name}
                style={{
                  width: '100%',
                  height: viewMode === 'grid' ? '200px' : 'auto',
                  maxHeight: viewMode === 'masonry' ? '300px' : 'none',
                  objectFit: 'cover'
                }}
              />
              
              <div style={{ padding: '1rem' }}>
                <h3 style={{ 
                  color: '#2e7d32', 
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  lineHeight: '1.3'
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
                  fontSize: '0.8rem',
                  margin: '0'
                }}>
                  {species.family}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
