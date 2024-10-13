// script.js

import { fetchRecipes } from './api.js'; // Import der API-Funktion

// Funktion zur Anzeige der Rezepte im DOM
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Container leeren
    
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const title = document.createElement('h2');
        title.textContent = recipe.name;
        recipeDiv.appendChild(title);

        const ingredients = document.createElement('p');
        ingredients.classList.add('ingredients');
        ingredients.textContent = `Zutaten: ${recipe.ingredients}`;
        recipeDiv.appendChild(ingredients);

        const description = document.createElement('p');
        description.textContent = recipe.description;
        recipeDiv.appendChild(description);

        const authorDate = document.createElement('p');
        authorDate.classList.add('author-date');
        const creationDate = new Date(recipe.date).toLocaleDateString();
        authorDate.textContent = `Autor: ${recipe.author}, erstellt am: ${creationDate}`;
        recipeDiv.appendChild(authorDate);

        recipeContainer.appendChild(recipeDiv);
    });
}

// Rezepte laden, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const recipes = await fetchRecipes();
        recipes.reverse();
        displayRecipes(recipes); // Rezepte im DOM anzeigen
    } catch (error) {
        console.error('Fehler bei der Darstellung der Rezepte:', error);
    }
});
