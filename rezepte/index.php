<!DOCTYPE html>
<html>
<head>
    <title>CowFoot Rezepte</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>CowFoot Rezepte</h1>
    
    <a href="new.php" class="button">Rezept hinzufügen...</a><br><br>
    
    <?php
    $host = "localhost"; // Change this to your database host
    $username = "u260926282_recipes"; // Change this to your database username
    $password = "o~Z0?:GG:"; // Change this to your database password
    $database = "u260926282_recipes"; // Change this to your database name
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
        $delete_id = $_POST['delete_id'];
        $delete_sql = "DELETE FROM recipes WHERE id = ?";
        $stmt = $conn->prepare($delete_sql);
        $stmt->bind_param("i", $delete_id);
        $stmt->execute();
        $stmt->close();
    }

    // Updated SQL query with ORDER BY for reverse order
    $sql = "SELECT * FROM recipes ORDER BY id DESC";
    $result = $conn->query($sql);

    // some error logs if not working correctly    
    error_log("Query Result: " . print_r($result, true));
    if (!$result) {
        die("Error: " . mysqli_error($conn));
    }

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<h2>{$row['name']}</h2>";
            echo "<p class='entryPart'><strong>Autor:</strong> {$row['author']}</p>";
            echo "<p class='entryPart'><strong>Datum:</strong> {$row['date']}</p>";
            echo "<p class='entryPart'><strong>Zutaten:</strong><br>" . nl2br($row['ingredients']) . "</p>";
            echo "<p class='entryPart'><strong>Beschreibung:</strong><br>" . nl2br($row['description']) . "<br><br></p>";            
            echo "<form method='post' action='index.php'>";
            echo "<input type='hidden' name='delete_id' value='{$row['id']}'>";
            echo "<input type='submit' class='button' value='Löschen' onclick=\"return confirm('Bist Du sicher? Lösche nie eines Anderen Rezepte!');\">";
            echo "</form>";
            echo "<hr>";
        }
    } else {
        echo "No recipes found.";
    }

    $conn->close();
    ?>

    <h1><br></h1>

</body>
</html>
