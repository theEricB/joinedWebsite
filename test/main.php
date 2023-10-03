<!DOCTYPE html>
<html>
<head>
    <title>Recipe Blog</title>
</head>
<body>
    <h1>Recipe Blog</h1>
    
    <a href="index.php">Make a New Entry</a><br><br>
    
    <?php
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM recipes";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<h2>{$row['name']}</h2>";
            echo "<p><strong>Author:</strong> {$row['author']}</p>";
            echo "<p><strong>Date:</strong> {$row['date']}</p>";
            echo "<p><strong>Ingredients:</strong><br>{$row['ingredients']}</p>";
            echo "<p><strong>Description:</strong><br>{$row['description']}</p>";
            echo "<hr>";
        }
    } else {
        echo "No recipes found.";
    }

    $conn->close();
    ?>
</body>
</html>
