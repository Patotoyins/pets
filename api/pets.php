<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all pets
        $result = $conn->query('SELECT * FROM Pets');
        $pets = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($pets);
        break;
    
    case 'POST':
        // Create a new pet
        $data = json_decode(file_get_contents('php://input'), true);
        $name = $conn->real_escape_string($data['Name']);
        $speciesID = (int)$data['SpeciesID'];
        $breedID = (int)$data['BreedID'];
        $dateOfBirth = $conn->real_escape_string($data['DateOfBirth']);
        $ownerID = (int)$data['OwnerID'];
        
        if ($conn->query("INSERT INTO Pets (Name, SpeciesID, BreedID, DateOfBirth, OwnerID) VALUES ('$name', $speciesID, $breedID, '$dateOfBirth', $ownerID)")) {
            echo json_encode(['success' => 'Pet added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add pet']);
        }
        break;

    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
