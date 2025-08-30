

// PlantNet API: Fetch plant images by scientific name
// Docs: https://my.plantnet.org/
const PLANTNET_API_KEY = '2b10QIwrqwt7bZoNgKI6jBT';

export const fetchPlantNetData = async (imageFile) => {
    const formData = new FormData();
    formData.append('images', imageFile);
    formData.append('organs', 'auto');
    const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${PLANTNET_API_KEY}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('PlantNet API error');
        return await response.json();
    } catch (err) {
        return { error: err.message };
    }
};

// Fetch plant image from PlantNet by scientific name
export const fetchPlantNetImage = async (scientificName) => {
    if (!scientificName) return '';
    try {
        const url = `https://my-api.plantnet.org/v2/species/all/search?api-key=${PLANTNET_API_KEY}&q=${encodeURIComponent(scientificName)}`;
        const response = await fetch(url);
        if (!response.ok) return '';
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
            // Try to get the first image from the first result
            const images = data.results[0].images;
            if (images && images.length > 0 && images[0].url && images[0].url.m) {
                return images[0].url.m;
            }
        }
        return '';
    } catch {
        return '';
    }
};
