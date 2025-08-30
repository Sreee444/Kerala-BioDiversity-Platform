// Real plant data using iNaturalist API - free and reliable with real images
// Docs: https://www.inaturalist.org/pages/api+reference

const BASE_URL = 'https://api.inaturalist.org/v1';

export const searchTreflePlants = async (query) => {
  if (!query) return [];
  
  try {
    // Search for plant taxa using iNaturalist API
    const url = `${BASE_URL}/taxa?q=${encodeURIComponent(query)}&rank=species&iconic_taxa=Plantae&per_page=12&order=desc&order_by=observations_count`;
    
    console.log('Fetching from iNaturalist:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('iNaturalist API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    console.log('iNaturalist API response:', data);
    
    if (data && data.results && Array.isArray(data.results)) {
      return data.results.map(plant => ({
        id: plant.id,
        name: plant.preferred_common_name || plant.name || plant.matched_term,
        scientificName: plant.name,
        family: plant.ancestor_ids?.length > 0 ? 'Family data available' : 'Unknown family',
        image: plant.default_photo?.medium_url || plant.default_photo?.url || 'https://static.inaturalist.org/photos/1/medium.jpg',
        description: `Observations: ${plant.observations_count || 0}. ${plant.wikipedia_summary || 'Species in the plant kingdom.'}`
      }));
    }
    
    return [];
  } catch (error) {
    console.error('iNaturalist API error:', error);
    
    // Fallback to real Wikipedia plant data if API fails
    const fallbackPlants = await getWikipediaPlantData(query);
    return fallbackPlants;
  }
};

// Fallback function using Wikipedia API for plant data
const getWikipediaPlantData = async (query) => {
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
