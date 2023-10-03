<!DOCTYPE html>
<html>
<head>
    <title>Neues Rezept</title>
</head>
<body>
    <h1>Neues Rezept:</h1>
    
    <form method="post" action="save.php">
        <label for="name">Titel:</label>
        <input type="text" name="name" id="name" required><br><br>

        <label for="ingredients">Zutaten:</label><br>
        <textarea name="ingredients" id="ingredients" rows="4" cols="50" required></textarea><br><br>

        <label for="description">Beschreibung:</label><br>
        <textarea name="description" id="description" rows="4" cols="50" required></textarea><br><br>

        <label for="author">Author:</label>
        <input type="text" name="author" id="author" required><br><br>

        <label for="date">Datum:</label>
        <input type="date" name="date" id="date" required><br><br>

        <button type="submit">Save</button>
    </form>
    
    <br><br>
    <a href="index.php">Zeige alle Rezepte</a>
</body>
</html>
