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
            $csvData = json_decode($rawBody, true);

            try {
                $pdo->beginTransaction();

                forEach($csvData as $row) {
                    $companyName = $row['companyName'];
                    $employeeName = $row['employeeName'];
                    $emailAddress = $row['emailAddress'];
                    $salary = $row['salary'];

                    $stmt = $pdo->prepare('SELECT * FROM companies WHERE name = :companyName');
                    $stmt->execute(["companyName" => $companyName]);
                    $company = $stmt->fetch(PDO::FETCH_ASSOC);

                    if($company) {
                        $companyId = $company['company_id'];
                    } else {
                        $stmt = $pdo->prepare('INSERT INTO companies (name) VALUES (:companyName)');
                        $stmt->execute(["companyName" => $companyName]);
                        $companyId = $pdo->lastInsertId();
                    }

                    $stmt = $pdo->prepare('INSERT INTO employees (name, email, salary, company_id) VALUES (:employeeName, :emailAddress, :salary, :companyId)');
                    $stmt->execute([
                        'employeeName' => $employeeName,
                        'emailAddress' => $emailAddress,
                        'salary' => $salary,
                        'companyId' => $companyId
                    ]);
                }
                $pdo->commit();
    
                header('Content-Type: application/json');
                echo json_encode(['message' => 'File data uploaded successfully']);
                exit;

            } catch (PDOException $e) {
                $pdo->rollBack();
                http_response_code(500);
                echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
                exit;
            }


            $stmt = $pdo->query("SELECT * FROM companies WHERE company_id = 1");
            $company = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode($company);
            exit;
            
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            exit;
        }
    } 

    // Default response for unhandled routes
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Endpoint not found']);
    exit;
?>