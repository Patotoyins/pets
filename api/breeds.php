<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all breeds
        $result = $conn->query('SELECT * FROM Breeds');
        $breeds = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($breeds);
        break;
    
    case 'POST':
        // Create a new breed
        $data = json_decode(file_get_contents('php://input'), true);
        $breedName = $conn->real_escape_string($data['BreedName']);
        $speciesID = (int)$data['SpeciesID'];
        
        if ($conn->query("INSERT INTO Breeds (BreedName, SpeciesID) VALUES ('$breedName', $speciesID)")) {
            echo json_encode(['success' => 'Breed added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add breed']);
        }
        break;

    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
