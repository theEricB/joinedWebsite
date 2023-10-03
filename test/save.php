<?php
// Database connection details
$host = "localhost"; // Change this to your database host
$username = "u260926282_test"; // Change this to your database username
$password = "4K*l&Z|G17L"; // Change this to your database password
$database = "u260926282_test"; // Change this to your database name

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the input value from the form
    $inputValue = $_POST["input_value"];

    // Insert the input value into the database
    $sql = "INSERT INTO test (testInput) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $inputValue); // "s" represents a string value
    $stmt->execute();
    
    // Check if the insertion was successful
    if ($stmt->affected_rows > 0) {
        echo "Value successfully saved to the database.";
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the statement and database connection
    $stmt->close();
    $conn->close();
}
?>
