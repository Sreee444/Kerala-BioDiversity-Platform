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
  const quickCategories = [
    { name: 'Plants', emoji: '🌿', color: '#4caf50' },
    { name: 'Animals', emoji: '🐾', color: '#ff9800' },
    { name: 'Herbs', emoji: '🌿', color: '#8bc34a' },
    { name: 'Birds', emoji: '🦅', color: '#2196f3' },
    { name: 'Trees', emoji: '🌳', color: '#795548' },
    { name: 'Wildlife', emoji: '🦎', color: '#f44336' }
  ];

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
        const desc = species.description?.toLowerCase() || '';
        const family = species.family?.toLowerCase() || '';
        const name = species.name?.toLowerCase() || '';
        const scientificName = species.scientificName?.toLowerCase() || '';
        
        switch (selectedCategory) {
          case 'Plants':
            return desc.includes('plant') || desc.includes('🌿') || desc.includes('tree') || 
                   desc.includes('flower') || desc.includes('herb') || desc.includes('leaf') ||
                   family.includes('plantae') || family.includes('plant') ||
                   name.includes('tree') || name.includes('plant') || name.includes('flower') ||
                   scientificName.includes('plant');
          case 'Birds':
            return desc.includes('bird') || desc.includes('🦅') || desc.includes('🐦') ||
                   family.includes('aves') || family.includes('bird') ||
                   name.includes('bird') || scientificName.includes('bird');
          case 'Reptiles':
            return desc.includes('reptile') || desc.includes('🐍') || desc.includes('🦎') ||
                   family.includes('reptilia') || family.includes('reptile') ||
                   name.includes('snake') || name.includes('lizard') || name.includes('reptile');
          case 'Amphibians':
            return desc.includes('amphibian') || desc.includes('🐸') || desc.includes('frog') ||
                   family.includes('amphibia') || family.includes('amphibian') ||
                   name.includes('frog') || name.includes('toad');
          case 'Insects':
            return desc.includes('insect') || desc.includes('🦋') || desc.includes('🐛') ||
                   desc.includes('butterfly') || desc.includes('bee') || desc.includes('ant') ||
                   family.includes('insecta') || family.includes('insect') ||
                   name.includes('butterfly') || name.includes('bee') || name.includes('ant');
          case 'Animals':
            return desc.includes('animal') || desc.includes('🐾') || desc.includes('mammal') ||
                   desc.includes('wildlife') || (!desc.includes('🌿') && !desc.includes('plant')) ||
                   family.includes('mammalia') || family.includes('animal') ||
                   name.includes('deer') || name.includes('elephant') || name.includes('tiger');
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'scientific':
          return (a.scientificName || '').localeCompare(b.scientificName || '');
        case 'category':
          return (a.family || '').localeCompare(b.family || '');
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

      {/* Quick Category Filters */}
      <div style={{ 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ 
          color: '#333', 
          marginBottom: '1rem', 
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          Quick Explore:
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.8rem',
          justifyContent: 'center'
        }}>
          {quickCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                if (category.name === 'Herbs') {
                  setSelectedCategory('Plants'); // Map herbs to plants
                } else if (category.name === 'Trees') {
                  setSelectedCategory('Plants'); // Map trees to plants
                } else if (category.name === 'Wildlife') {
                  setSelectedCategory('Animals'); // Map wildlife to animals
                } else {
                  setSelectedCategory(category.name);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.2rem',
                backgroundColor: selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals') 
                  ? category.color : 'white',
                color: selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals') 
                  ? 'white' : category.color,
                border: `2px solid ${category.color}`,
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals') 
                  ? `0 4px 12px ${category.color}40` : '0 2px 8px rgba(0,0,0,0.1)',
                transform: selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals') 
                  ? 'translateY(-2px)' : 'translateY(0)',
                minWidth: '100px'
              }}
              onMouseOver={(e) => {
                if (!(selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals'))) {
                  e.target.style.backgroundColor = `${category.color}10`;
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseOut={(e) => {
                if (!(selectedCategory === category.name || 
                  (category.name === 'Herbs' && selectedCategory === 'Plants') ||
                  (category.name === 'Trees' && selectedCategory === 'Plants') ||
                  (category.name === 'Wildlife' && selectedCategory === 'Animals'))) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      {/* Mobile-First Filter Controls */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px'
      }}>
        {/* Top Row - Category and Results Count */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '0.95rem',
                backgroundColor: 'white'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ 
            alignSelf: 'end',
            textAlign: 'right',
            minWidth: 'fit-content'
          }}>
            <span style={{ 
              color: '#666', 
              fontSize: '0.95rem',
              fontWeight: '600',
              background: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}>
              {filteredSpecies.length} species found
            </span>
          </div>
        </div>

        {/* Bottom Row - Sort and View Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '0.95rem',
                backgroundColor: 'white'
              }}
            >
              <option value="name">Name</option>
              <option value="scientific">Scientific Name</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div style={{ minWidth: 'fit-content' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
              View:
            </label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.6rem 1rem',
                  backgroundColor: viewMode === 'grid' ? '#388e3c' : 'white',
                  color: viewMode === 'grid' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                📊 Grid
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                style={{
                  padding: '0.6rem 1rem',
                  backgroundColor: viewMode === 'masonry' ? '#388e3c' : 'white',
                  color: viewMode === 'masonry' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                🧱 Masonry
              </button>
            </div>
          </div>
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
