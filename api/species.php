<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all species
        $result = $conn->query('SELECT * FROM Species');
        $species = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($species);
        break;
    
    case 'POST':
        // Create a new species
        $data = json_decode(file_get_contents('php://input'), true);
        $speciesName = $conn->real_escape_string($data['SpeciesName']);
        
        if ($conn->query("INSERT INTO Species (SpeciesName) VALUES ('$speciesName')")) {
            echo json_encode(['success' => 'Species added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add species']);
        }
        break;

    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
