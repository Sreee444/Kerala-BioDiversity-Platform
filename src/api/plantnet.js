// PlantNet API docs: https://my.plantnet.org/
const PLANTNET_API_KEY = process.env.REACT_APP_PLANTNET_API_KEY;

export const fetchPlantNetData = async (imageFile) => {
    if (!PLANTNET_API_KEY) {
        throw new Error('PlantNet API key is missing. Set REACT_APP_PLANTNET_API_KEY in your environment.');
    }

    const formData = new FormData();
    formData.append('images', imageFile);
    formData.append('organs', 'auto');
    const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${PLANTNET_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`PlantNet API error (${response.status})`);
    }

    return await response.json();
};
