<?php
    // Enable CORS
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    
    // Handle OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    $dsn = 'mysql:host=mysql;port=3306;dbname=mydatabase;charset=utf8mb4';
    $username = 'user';
    $password = 'password';

    // Create PDO instance database connection
    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }

    $requestUri = $_SERVER['REQUEST_URI'];
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    if($requestUri === "/upload"){
        if($requestMethod === "POST"){
            $rawBody = file_get_contents("php://input");
            $jsonData = json_decode($rawBody, true);

            $stmt = $pdo->query("SELECT * FROM companies WHERE company_id = 1");
            $company = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode($company);
            exit;
            
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    // Default response for unhandled routes
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Endpoint not found']);
    exit;
?>