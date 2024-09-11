<!DOCTYPE html>
<html>
<head>
    <title>Neues Rezept</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Neues Rezept</h1>
    
    <form method="post" action="save.php">
        <label for="name"><strong>Titel:</strong></label>
        <input type="text" name="name" id="name" required><br><br>

        <label for="ingredients"><strong>Zutaten:</strong></label><br>
        <textarea name="ingredients" id="ingredients" rows="4" cols="50" required></textarea><br><br>

        <label for="description"><strong>Beschreibung:</strong></label><br>
        <textarea name="description" id="description" rows="4" cols="50" required></textarea><br><br>

        <label for="author"><strong>Autor:</strong></label>
        <input type="text" name="author" id="author" required><br><br>

        <label for="date"><strong>Datum:</strong></label>
        <input type="date" name="date" id="date" required><br><br>

        <button type="submit" class="button">Speichern</button>
    </form>
    
    <br><br>
    <a href="./" class="button">Zeige alle Rezepte...</a>
</body>
</html>
