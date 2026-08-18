<?php
$host = "localhost";
$user = "root"; // Default user for XAMPP
$pass = "";     // Default password for XAMPP (empty)
$dbname = "weather_db";

// Connect to database
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data from JS
$city = $_POST['city'];
$temperature = $_POST['temperature'];
$description = $_POST['description'];
$humidity = $_POST['humidity'];
$wind = $_POST['wind'];
$aqi = $_POST['aqi'];

// Prepare & execute SQL statement
$stmt = $conn->prepare("INSERT INTO weather_logs (city, temperature, description, humidity, wind, aqi) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("", $city, $temperature, $description, $humidity, $wind, $aqi);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["status" => "success"]);
?>
