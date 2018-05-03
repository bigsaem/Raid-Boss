<?php
    // get the session
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    // DB Login
    $servername = "localhost";
    $dblogin = "root";
    $adminpass = "root";
    $dbname = "tapncook";

    if ($methodType === 'POST') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
            if(isset($_POST["username"]) && !empty($_POST["username"])
                && isset($_POST["password"]) && !empty($_POST["password"])){

                // get the data from the post and store in variables
                $login = $_POST["username"];
                $pwd = $_POST["password"];

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);
        
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                    $sql = "SELECT * FROM user WHERE user.user_name = '$login' AND user.password = '$pwd'";
                    //$hs = ""

                    $statement = $conn->prepare($sql);
                    $statement->execute();
                    $count = $statement->rowCount();
        
                    if($count > 0) {
                        // sucess
                        $_SESSION['username'] = $login;
                        //$_SESSION['password'] = $pwd;
                        //$_SESSION['high_score'] = ;
                        // $_SESSION['lastname'] = "Ferguson";
                        // $_SESSION['email'] = "arron_ferguson@bcit.ca";
                        // $_SESSION['loggedin'] = true;
    
                        $sid= session_id();
                        $data = array("status" => "Success");
    
                    } else {
                        $data = array("msg" => "User name and/or password not correct.");
                    }
        
                } catch(PDOException $e) {
                    $data = array("errorlol", $e->getMessage());
                }

            } else {
                $data = array("status" => "fail", "msg" => "Either login or password were absent.");
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