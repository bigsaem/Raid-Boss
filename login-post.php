<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    // DB Login
    // $servername = "db736774578.db.1and1.com";
    // $dblogin = "dbo736774578";
    // $adminpass = "159753Rb$";
    // $dbname = "db736774578";

    $servername = "localhost";
    $dblogin = "root";
    $adminpass = "root";
    $dbname = "tapncook";

    // Checks if method is a POST
    if ($methodType === 'POST') {

        // Checks if it is truly an AJAX call
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            
            // Checks if either username or password is empty
            if(isset($_POST["username"]) && !empty($_POST["username"])
                && isset($_POST["password"]) && !empty($_POST["password"])){

                // Gets the data from the post and store in variables
                $login = $_POST["username"];
                $pwd = $_POST["password"];

                // Hashes the password with md5
                $pass = md5($pwd);

                // try catch to connect to database
                try {

                    // connecting to db using PDO with provided credentials
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);
        
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                    // SQL statement to check if username and password exists
                    $sql = "SELECT * FROM user WHERE user.user_name = ? AND user.password = ?";

                    // exectues SQL statement using unnamed parameters
                    $statement = $conn->prepare($sql);
                    $statement->execute(array($login, $pass));
                    // counts the rows returned from executing the statement
                    $count = $statement->rowCount();
        
                    // checks if the count returned is greater than 0 (user exists in db)
                    if($count > 0) {
                        // start the session
                        session_start();
                        // assign session variables
                        $_SESSION["username"] = $login;
                        //$_SESSION['counter'] = $counter; 
                        //$_SESSION['loggedin'] = true;
    
                        $sid= session_id();
                        $data = array("msg" => "Success", "sid" => $sid, "username" => $login);
    
                    } else {
                        $data = array("msg" => "Username and/or password not correct.");
                    }
        
                } catch(PDOException $e) {
                    // cannot connect to db
                    $data = array("error", $e->getMessage());
                }

            } else {
                // missing username or password
                $data = array("status" => "fail", "msg" => "Either username or password were absent.");
            }

        } else {
            // not AJAX
            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }

    } else {
        // simple error message, only taking POST requests
        $data = array("status" => "fail", "msg" => "Error: only POST allowed.");
    }

    // returns data as JSON
    echo json_encode($data, JSON_FORCE_OBJECT);

?>