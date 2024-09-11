<!DOCTYPE html>
<html>
<head>
    <title>Rezept bearbeiten</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Rezept bearbeiten</h1>
    
    <?php
    $host = "localhost"; // Change this to your database host
    $username = "u260926282_recipes"; // Change this to your database username
    $password = "o~Z0?:GG:"; // Change this to your database password
    $database = "u260926282_recipes"; // Change this to your database name
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['edit_id'])) {
        $edit_id = $_POST['edit_id'];
        $sql = "SELECT * FROM recipes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $edit_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        } else {
            echo "Recipe not found.";
            exit(); // Terminate script execution
        }
    } else {
        echo "Invalid request.";
        exit(); // Terminate script execution
    }
    ?>

    <form method="post" action="update.php">
        <input type="hidden" name="edit_id" value="<?php echo $row['id']; ?>">
        
        <label for="name"><strong>Titel:</strong></label>
        <input type="text" name="name" id="name" value="<?php echo $row['name']; ?>" required><br><br>
        
        <label for="ingredients"><strong>Zutaten:</strong></label><br>
        <textarea name="ingredients" id="ingredients" rows="4" cols="50" required><?php echo $row['ingredients']; ?></textarea><br><br>
        
        <label for="description"><strong>Beschreibung:</strong></label><br>
        <textarea name="description" id="description" rows="4" cols="50" required><?php echo $row['description']; ?></textarea><br><br>
        
        <label for="author"><strong>Autor:</strong></label>
        <input type="text" name="author" id="author" value="<?php echo $row['author']; ?>" required><br><br>
        
        <label for="date"><strong>Datum:</strong></label>
        <input type="date" name="date" id="date" value="<?php echo $row['date']; ?>" required><br><br>
        
        <button type="submit" class="button">Speichern</button>
    </form>

    <br><br>
    <a href="./" class="button">Abbrechen</a>
</body>
</html>
