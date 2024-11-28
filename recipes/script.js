import { fetchRecipes, addRecipe, updateRecipe } from './api.js';

// Function to display recipes on the page
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear container

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.dataset.recipeId = recipe._id;
        recipeDiv.classList.add('recipe');

        // Edit button for each recipe
        const editButton = document.createElement('button');
        editButton.textContent = 'edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => {
            showRecipeForm(recipe); // Show the form to edit the selected recipe
        };

        // Recipe title
        const title = document.createElement('h2');
        title.textContent = recipe.name;
        recipeDiv.appendChild(editButton); // Add edit button
        recipeDiv.appendChild(title);

        // Ingredients
        const ingredients = document.createElement('p');
        ingredients.classList.add('ingredients');
        ingredients.textContent = `Ingredients: ${recipe.ingredients}`;
        recipeDiv.appendChild(ingredients);

        // Description
        const description = document.createElement('p');
        description.textContent = recipe.description;
        recipeDiv.appendChild(description);

        // Author and Date
        const authorDate = document.createElement('p');
        authorDate.classList.add('author-date');
        const creationDate = new Date(recipe.date).toLocaleDateString();
        authorDate.textContent = `Author: ${recipe.author}, created on: ${creationDate}`;
        recipeDiv.appendChild(authorDate);

        recipeContainer.appendChild(recipeDiv);
    });
}

// Function to show the recipe form (for adding or editing)
function showRecipeForm(recipe = null) {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear any existing form

    // Create the form
    const form = document.createElement('form');
    form.id = recipe ? 'editRecipeForm' : 'addRecipeForm';

    // Name input
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.value = recipe ? recipe.name : '';
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br'));

    // Ingredients input
    const ingredientsLabel = document.createElement('label');
    ingredientsLabel.textContent = 'Ingredients: ';
    const ingredientsInput = document.createElement('textarea');
    ingredientsInput.name = 'ingredients';
    ingredientsInput.required = true;
    ingredientsInput.value = recipe ? recipe.ingredients : '';
    form.appendChild(ingredientsLabel);
    form.appendChild(ingredientsInput);
    form.appendChild(document.createElement('br'));

    // Description input
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description: ';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.required = true;
    descriptionInput.value = recipe ? recipe.description : '';
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(document.createElement('br'));

    // Author input
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author: ';
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.name = 'author';
    authorInput.required = true;
    authorInput.value = recipe ? recipe.author : '';
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(document.createElement('br'));

    // Date input
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date: ';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.required = true;
    dateInput.value = recipe ? new Date(recipe.date).toISOString().split('T')[0] : '';
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(document.createElement('br'));

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = recipe ? 'Update Recipe' : 'Add Recipe';
    form.appendChild(submitButton);

    // Form Submit Event
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newRecipe = {
            name: nameInput.value,
            ingredients: ingredientsInput.value,
            description: descriptionInput.value,
            author: authorInput.value,
            date: dateInput.value
        };

        try {
            if (recipe) {
                // Update existing recipe
                await updateRecipe(recipe._id, newRecipe);
            } else {
                // Add new recipe
                await addRecipe(newRecipe);
            }

            // Reload and display updated recipes
            const updatedRecipes = await fetchRecipes();
            updatedRecipes.reverse();
            displayRecipes(updatedRecipes);

            // Close and clear the form
            formContainer.style.display = 'none';
            formContainer.innerHTML = '';
        } catch (error) {
            console.error('Error updating or adding recipe:', error);
            alert('An error occurred while saving the recipe. Please try again.');
        }
    });

    // Show form container
    formContainer.appendChild(form);
    formContainer.style.display = 'block';
}

// Load recipes when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const recipes = await fetchRecipes();
        recipes.reverse(); // Show newest recipes first
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error displaying recipes:', error);
    }
});
