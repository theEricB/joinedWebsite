<!DOCTYPE html>
<html>
<head>
    <title>Recipe Entry</title>
</head>
<body>
    <h1>Recipe Entry</h1>
    
    <form method="post" action="save.php">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required><br><br>

        <label for="ingredients">Ingredients:</label><br>
        <textarea name="ingredients" id="ingredients" rows="4" cols="50" required></textarea><br><br>

        <label for="description">Description:</label><br>
        <textarea name="description" id="description" rows="4" cols="50" required></textarea><br><br>

        <label for="author">Author:</label>
        <input type="text" name="author" id="author" required><br><br>

        <label for="date">Date:</label>
        <input type="date" name="date" id="date" required><br><br>

        <button type="submit">Save</button>
    </form>
    
    <br><br>
    <a href="main.php">View All Entries</a>
</body>
</html>
