<!DOCTYPE html>
<html>
<head>
    <title>Recipe Blog</title>
</head>
<body>
    <h1>Recipe Blog</h1>
    
    <a href="index.php">Make a New Entry</a><br><br>
    
    <?php
    $host = "localhost"; // Change this to your database host
    $username = "u260926282_recipes"; // Change this to your database username
    $password = "o~Z0?:GG:"; // Change this to your database password
    $database = "u260926282_recipes"; // Change this to your database name
    
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (isset($_GET['delete_id'])) {
        $delete_id = $_GET['delete_id'];
        $delete_sql = "DELETE FROM recipes WHERE id = ?";
        $stmt = $conn->prepare($delete_sql);
        $stmt->bind_param("i", $delete_id);
        if ($stmt->execute()) {
            echo "Entry deleted successfully.";
        } else {
            echo "Error deleting entry: " . $stmt->error;
        }
        $stmt->close();
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
            echo "<form method='post' action='main.php'>";
            echo "<input type='hidden' name='delete_id' value='{$row['id']}'>";
            echo "<input type='submit' value='Delete'>";
            echo "</form>";
            echo "<hr>";
        }
    } else {
        echo "No recipes found.";
    }

    $conn->close();
    ?>
</body>
</html>
