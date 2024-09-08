import React, { useState, useEffect } from "react";

const RecipeForm = ({ addRecipe, editRecipe, isEditing, currentRecipe }) => {
  const [recipe, setRecipe] = useState({
    author: "",
    date: "",
    ingredients: "",
    description: ""
  });

  useEffect(() => {
    if (isEditing) {
      setRecipe(currentRecipe);  // Setze die Felder auf das zu bearbeitende Rezept
    }
  }, [isEditing, currentRecipe]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editRecipe(currentRecipe.id, recipe);  // Bearbeiten eines Rezepts
    } else {
      addRecipe({ ...recipe, id: Math.random() * 1000 });  // Hinzufügen eines neuen Rezepts
    }
    setRecipe({ author: "", date: "", ingredients: "", description: "" });  // Felder leeren
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Recipe" : "Add Recipe"}</h2>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={recipe.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={recipe.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ingredients:</label>
        <input
          type="text"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">{isEditing ? "Update Recipe" : "Add Recipe"}</button>
    </form>
  );
};

export default RecipeForm;
