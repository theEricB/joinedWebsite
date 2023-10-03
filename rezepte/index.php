<!DOCTYPE html>
<html>
<head>
    <title>CowFoot Rezepte</title>
</head>
<body>
    <h1>CowFoot Rezepte</h1>
    
    <a href="new.php">Rezept hinzufügen...</a><br><br>
    
    <?php
    $host = "bauscher.xyz"; // Change this to your database host
    $username = "u260926282_recipes"; // Change this to your database username
    $password = "o~Z0?:GG:"; // Change this to your database password
    $database = "u260926282_recipes"; // Change this to your database name
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Updated SQL query with ORDER BY for reverse order
    $sql = "SELECT * FROM recipes ORDER BY id DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<h2>{$row['name']}</h2>";
            echo "<p><strong>Author:</strong> {$row['author']}</p>";
            echo "<p><strong>Date:</strong> {$row['date']}</p>";
            echo "<p><strong>Ingredients:</strong><br>" . nl2br($row['ingredients']) . "</p>";
            echo "<p><strong>Description:</strong><br>" . nl2br($row['description']) . "</p>";            
            echo "<form method='post' action='main.php?delete_id={$row['id']}'>";
            #echo "<input type='submit' value='Delete'>";
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
