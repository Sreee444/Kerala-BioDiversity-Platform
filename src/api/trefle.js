// Real biodiversity data using iNaturalist API - includes both plants and animals
// Docs: https://www.inaturalist.org/pages/api+reference

const BASE_URL = 'https://api.inaturalist.org/v1';

export const searchTreflePlants = async (query) => {
  if (!query) return [];
  
  try {
    // Search for both plants and animals using iNaturalist API
    let url = `${BASE_URL}/taxa?q=${encodeURIComponent(query)}&per_page=12&order=desc&order_by=observations_count`;
    
    // Add specific filters based on query
    if (query.toLowerCase().includes('plant') || query.toLowerCase().includes('flora')) {
      url += '&iconic_taxa=Plantae';
    } else if (query.toLowerCase().includes('animal') || query.toLowerCase().includes('bird') || query.toLowerCase().includes('wildlife')) {
      url += '&iconic_taxa=Animalia,Aves,Mammalia,Reptilia,Amphibia';
    }
    // If no specific filter, search all life forms
    
    console.log('Fetching from iNaturalist:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('iNaturalist API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    console.log('iNaturalist API response:', data);
    
    if (data && data.results && Array.isArray(data.results)) {
      return data.results.map(species => {
        // Determine if it's a plant or animal
        const isPlant = species.iconic_taxon_name === 'Plantae';
        const isAnimal = ['Animalia', 'Aves', 'Mammalia', 'Reptilia', 'Amphibia', 'Insecta'].includes(species.iconic_taxon_name);
        
        let categoryIcon = '🌍'; // default
        if (isPlant) categoryIcon = '🌿';
        else if (species.iconic_taxon_name === 'Aves') categoryIcon = '🦅';
        else if (species.iconic_taxon_name === 'Mammalia') categoryIcon = '🦎';
        else if (species.iconic_taxon_name === 'Reptilia') categoryIcon = '🐍';
        else if (species.iconic_taxon_name === 'Amphibia') categoryIcon = '🐸';
        else if (species.iconic_taxon_name === 'Insecta') categoryIcon = '🦋';
        else if (isAnimal) categoryIcon = '🐾';

        return {
          id: species.id,
          name: species.preferred_common_name || species.name || species.matched_term,
          scientificName: species.name,
          family: species.iconic_taxon_name || 'Unknown category',
          image: species.default_photo?.medium_url || species.default_photo?.url || 'https://static.inaturalist.org/photos/1/medium.jpg',
          description: `${categoryIcon} ${species.iconic_taxon_name || 'Species'} • Observations: ${species.observations_count || 0}. ${species.wikipedia_summary ? species.wikipedia_summary.substring(0, 150) + '...' : 'Biodiversity species from Kerala region.'}`
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('iNaturalist API error:', error);
    
    // Fallback to real Wikipedia biodiversity data if API fails
    const fallbackSpecies = await getWikipediaBiodiversityData(query);
    return fallbackSpecies;
  }
};

// Fallback function using Wikipedia API for biodiversity data
const getWikipediaBiodiversityData = async (query) => {
  try {
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);
    
    if (response.ok) {
      const data = await response.json();
      return [{
        id: Date.now(),
        name: data.title || query,
        scientificName: data.title || query,
        family: 'Wikipedia source',
        image: data.thumbnail?.source || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
        description: data.extract || 'No description available.'
      }];
    }
    
    return [];
  } catch (error) {
    console.error('Wikipedia fallback error:', error);
    return [];
  }
};
