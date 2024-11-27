const host = 'http://www.cowfoot.xyz/api';

// Function to fetch recipes from the server
export async function fetchRecipes() {
    try {
        const response = await fetch(`${host}/recipes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

// Function to add a new recipe to the server
export async function addRecipe(recipe) {
    try {
        const response = await fetch(`${host}/recipes`, { // fixed URL
            method: 'POST',
            body: JSON.stringify({
                name: recipe.name,
                ingredients: recipe.ingredients,
                description: recipe.description,
                author: recipe.author,
                date: recipe.date
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (err) {
        console.error('Error adding recipe:', err);
        throw err;
    }
}

// New function to update a recipe on the server
export async function updateRecipe(recipeId, updatedData) {
    try {
        const response = await fetch(`${host}/recipes/${recipeId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Error updating recipe:', err);
        throw err; // Re-throw the error so it can be caught in the form submission
    }
}

