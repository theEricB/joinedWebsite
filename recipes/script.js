// script.js

import { fetchRecipes, deleteRecipe, addRecipe } from './api.js'; // Import der API-Funktion

// Funktion zur Anzeige der Rezepte im DOM
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Container leeren
    
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.dataset.recipeId = recipe._id;
        recipeDiv.classList.add('recipe');
        recipeDiv.style.position = 'relative'; // Positionierung für den Button sicherstellen

        // "x"-Button erstellen
        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.classList.add('close-button');
        closeButton.onclick = () => {
            if (deleteRecipe(recipeDiv.dataset.recipeId)) {
                recipeContainer.removeChild(recipeDiv);
            }
        };

        // Rezepttitel
        const title = document.createElement('h2');
        title.textContent = recipe.name;
        recipeDiv.appendChild(closeButton); // Button hinzufügen
        recipeDiv.appendChild(title);

        // Zutaten
        const ingredients = document.createElement('p');
        ingredients.classList.add('ingredients');
        ingredients.textContent = `Zutaten: ${recipe.ingredients}`;
        recipeDiv.appendChild(ingredients);

        // Beschreibung
        const description = document.createElement('p');
        description.textContent = recipe.description;
        recipeDiv.appendChild(description);

        // Autor und Erstellungsdatum
        const authorDate = document.createElement('p');
        authorDate.classList.add('author-date');
        const creationDate = new Date(recipe.date).toLocaleDateString();
        authorDate.textContent = `Autor: ${recipe.author}, erstellt am: ${creationDate}`;
        recipeDiv.appendChild(authorDate);

        recipeContainer.appendChild(recipeDiv);
    });
}

document.getElementById('addRecipe').addEventListener('click', () => {
    showAddRecipeForm();
});

function showAddRecipeForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Leert den Container, falls schon ein Formular existiert

    // Formular erstellen
    const form = document.createElement('form');
    form.id = 'addRecipeForm';

    // Name Eingabefeld
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br'));

    // Ingredients Eingabefeld
    const ingredientsLabel = document.createElement('label');
    ingredientsLabel.textContent = 'Ingredients: ';
    const ingredientsInput = document.createElement('textarea');
    ingredientsInput.name = 'ingredients';
    ingredientsInput.required = true;
    form.appendChild(ingredientsLabel);
    form.appendChild(ingredientsInput);
    form.appendChild(document.createElement('br'));

    // Description Eingabefeld
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description: ';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.required = true;
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(document.createElement('br'));

    // Author Eingabefeld
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author: ';
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.name = 'author';
    authorInput.required = true;
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(document.createElement('br'));

    // Date Eingabefeld
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date: ';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.required = true;
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(document.createElement('br'));

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Recipe';
    form.appendChild(submitButton);

    // Form Submit Event
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Verhindert das Standard-Formular-Submit-Verhalten
        const newRecipe = {
            name: nameInput.value,
            ingredients: ingredientsInput.value,
            description: descriptionInput.value,
            author: authorInput.value,
            date: dateInput.value
        };
        console.log('Neues Rezept:', newRecipe);
        addRecipe(newRecipe)

        displayRecipes(await fetchRecipes())
        
        formContainer.style.display = 'none';
        formContainer.innerHTML = '';
    });

    // Formular dem Container hinzufügen und anzeigen
    formContainer.appendChild(form);
    formContainer.style.display = 'block';
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
