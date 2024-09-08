import React, { useState, useEffect } from "react";
import RecipeForm from "./recipeForm";
import axiosInstance from "./axiosConfig";  // Verwende die Axios-Konfiguration

const App = () => {
  const [recipes, setRecipes] = useState([]);  // Liste der Rezepte
  const [isEditing, setIsEditing] = useState(false);  // Bearbeitungsmodus
  const [currentRecipe, setCurrentRecipe] = useState(null);  // Rezept zur Bearbeitung

  // Rezepte abrufen (GET-Anfrage an API)
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/recipes");
        console.log(response)
        setRecipes(response.data);  // Rezepte in den Zustand setzen
      } catch (error) {
        console.error("Fehler beim Abrufen der Rezepte:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Rezept hinzufügen (POST-Anfrage an API)
  const addRecipe = async (newRecipe) => {
    try {
      const response = await axiosInstance.post("/recipes", newRecipe);
      setRecipes([...recipes, response.data]);  // Neues Rezept zur Liste hinzufügen
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Rezepts:", error);
    }
  };

  // Rezept bearbeiten (PUT-Anfrage an API)
  const editRecipe = async (id, updatedRecipe) => {
    try {
      const response = await axiosInstance.put(`/recipes/${id}`, updatedRecipe);
      setRecipes(recipes.map((recipe) => (recipe.id === id ? response.data : recipe)));
      setIsEditing(false);  // Bearbeitungsmodus verlassen
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Rezepts:", error);
    }
  };

  // Rezept löschen (DELETE-Anfrage an API)
  const deleteRecipe = async (id) => {
    try {
      await axiosInstance.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));  // Rezept aus der Liste entfernen
    } catch (error) {
      console.error("Fehler beim Löschen des Rezepts:", error);
    }
  };

  // Bearbeitungsmodus aktivieren
  const startEdit = (recipe) => {
    setIsEditing(true);
    setCurrentRecipe(recipe);  // Rezept setzen, das bearbeitet wird
  };

  return (
    <div>
      <h1>Recipe List</h1>
      <button onClick={() => setIsEditing(true)}>Add Recipe</button>

      {isEditing ? (
        <RecipeForm
          addRecipe={addRecipe}
          editRecipe={editRecipe}
          isEditing={isEditing}
          currentRecipe={currentRecipe}
        />
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id} style={recipeCardStyle}>
              <h3>{recipe.author}</h3>
              <p><strong>Date:</strong> {recipe.date}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
              <button onClick={() => startEdit(recipe)}>Edit</button>
              <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Einfache CSS für das Rezept-Layout
const recipeCardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px"
};

export default App;
