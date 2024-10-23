
const host = 'http://www.cowfoot.xyz/api'
// Funktion, um Rezepte vom Backend-Server zu holen
export async function fetchRecipes() {
    try {
        const response = await fetch(host + '/recipes');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        throw error;
    }
}

export async function deleteRecipe(recipeId) {
    try {
        const response = await fetch(`${host}/recipes/${recipeId}`, {
            method: 'DELETE', // Methode auf DELETE setzen
            headers: {
                'Content-Type': 'application/json', // Optional, abhängig von der API
            }
        });
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return true;
    } catch (err) {
        throw new Error(err)
    }
}

export async function addRecipe(recipe) {
    try {
        const response = await fetch(`${host}/recipes}`, {
            method: 'POST',
            body: JSON.stringify({
                name: recipe.name,
                ingredients: recipe.ingredients,
                description: recipe.description,
                author: recipe.author,
                date: recipe.date
            }),
            headers: {
                'Content-Type': 'application/json', // Optional, abhängig von der API
            }
        });
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return true;
    } catch (err) {
        throw new Error(err)
    }
}