<?php
// Database connection details
$host = "localhost"; // Change this to your database host
$username = "u260926282_recipes"; // Change this to your database username
$password = "o~Z0?:GG:"; // Change this to your database password
$database = "u260926282_recipes"; // Change this to your database name

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $ingredients = $_POST["ingredients"];
    $description = $_POST["description"];
    $author = $_POST["author"];
    $date = $_POST["date"];

    $sql = "INSERT INTO recipes (name, ingredients, description, author, date) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $name, $ingredients, $description, $author, $date);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        // Redirect to main.php on success
        header("Location: main.php");
        exit(); // Terminate script execution after redirection
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
