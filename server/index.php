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

    if(preg_match('#^/employees(?:/(\d+))?$#', $requestUri, $matches)){
        if($requestMethod === "GET"){
            $stmt = $pdo->query("SELECT e.employee_id, c.name AS company_name, e.name AS employee_name, e.email, e.salary FROM employees e
            JOIN companies c ON e.company_id = c.company_id");
            $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header('Content-Type: application/json');
            echo json_encode($employees);
        } else if($requestMethod === "PUT"){    
            $employeeId = isset($matches[1]) ? (int)$matches[1] : null;
            $input = json_decode(file_get_contents('php://input'), true);
            if($employeeId && isset($input['email']) && !empty($input['email'])){
                try {
                    $stmt = $pdo->prepare('UPDATE employees SET email = :email WHERE employee_id = :employeeId');
                    $stmt->execute(['email' => $input['email'], 'employeeId' => $employeeId]);
                    header('Content-Type: application/json');
                    echo json_encode(['message' => "Update employee $employeeId email successful"]);
                    exit;
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
                    exit;
                }
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            exit;
        }
    } else if($requestUri === "/upload"){
        if($requestMethod === "POST"){
            $csvData = json_decode(file_get_contents('php://input'), true);
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
    } else {
        // Default response for unhandled routes
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Endpoint not found']);
        exit;
    }

?>