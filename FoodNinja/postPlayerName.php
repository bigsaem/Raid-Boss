<?php
    //echo "inside file";
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    // DB Login
    $servername = "localhost";
    $dblogin = "";
    $adminpass = "";
    $dbname = "foodninja";
    //echo "inside file";
    if ($methodType === 'POST') {
        //echo "inside post";
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
                // get the data from the post and store in variables
                $name = $_POST[username];
                $score = $_POST[userScore];

               // echo "name/score is: " . $name . ",  " . $score;

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);
        
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    //echo "inserting..";
                   // $sql = "INSERT INTO user (user_name, password, high_score) VALUES ('$login', '$pwd', 0)";
                    $sql = "INSERT INTO Players (Player, HighScore)
                    VALUES ($name, $score)";

                    $statement = $conn->prepare($sql);
                    $statement->execute();
                    $count = $statement->rowCount();
    
                } catch(PDOException $e) {
                    $data = array("errorlol", $e->getMessage());
                }

        } else {
            // not AJAX
            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }

    } else {
        // simple error message, only taking POST requests
        $data = array("status" => "fail", "msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>