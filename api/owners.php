<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all owners
        $result = $conn->query('SELECT * FROM Owners');
        $owners = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($owners);
        break;
    
    case 'POST':
        // Create a new owner
        $data = json_decode(file_get_contents('php://input'), true);
        $name = $conn->real_escape_string($data['Name']);
        $contactDetails = $conn->real_escape_string($data['ContactDetails']);
        $address = $conn->real_escape_string($data['Address']);
        
        if ($conn->query("INSERT INTO Owners (Name, ContactDetails, Address) VALUES ('$name', '$contactDetails', '$address')")) {
            echo json_encode(['success' => 'Owner added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add owner']);
        }
        break;

    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
