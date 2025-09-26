const API_KEY='65fab2d27bb74586b344f890527b61bf';
const BASE_URL='https://api.spoonacular.com/recipes';

export const searchRecipes = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&number=12&addRecipeInformation=true`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al recibir la Informacion:', error);
        return [];
    }
};