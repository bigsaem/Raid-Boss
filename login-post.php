<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    // DB Login
    $servername = "db736774578.db.1and1.com";
    $dblogin = "dbo736774578";
    $adminpass = "159753Rb$";
    $dbname = "db736774578";

    // $servername = "localhost";
    // $dblogin = "root";
    // $adminpass = "root";
    // $dbname = "tapncook";

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
                $pass = md5($pwd);

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);
        
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                    $sql = "SELECT * FROM user WHERE user.user_name = ? AND user.password = ?";

                    $statement = $conn->prepare($sql);
                    $statement->execute(array($login, $pass));
                    $count = $statement->rowCount();
        
                    if($count > 0) {
                        if (session_status() == PHP_SESSION_NONE) {
                            session_start();
                        }
                        // sucess
                        $_SESSION['username'] = $login;
                        $_SESSION['loggedin'] = true;
    
                        $sid= session_id();
                        $data = array("msg" => "Success", "sid" => $sid, "username" => $login);
    
                    } else {
                        $data = array("msg" => "User name and/or password not correct.");
                    }
        
                } catch(PDOException $e) {
                    $data = array("error", $e->getMessage());
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