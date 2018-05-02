<?php
    // empty JSON
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("msg" => "$methodType");

    if ($methodType === 'POST') {

        foreach ($_POST as $key => $value){
            // simply parrot back what was sent
            $data[$key] = $value;
        }
        echo json_encode($data, JSON_FORCE_OBJECT);
        return;


        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
            if(isset($_POST["username"]) && !empty($_POST["username"])
                && isset($_POST["password"]) && !empty($_POST["password"])){


                // get the data from the post and store in variables
                $username = $_POST["username"];
                $pwd = $_POST["password"];

                $data = array("msg" => "Thank you $username $pwd, you've been added to our mailing list!",
                    "username" => "$username", "password" => "$pwd");
                ////////////////////////////////////////////////////////////
                ///   HERE'S WHERE YOU COULD DO A DATABASE ENTRY UPDATE
                ////////////////////////////////////////////////////////////

                $servername = "localhost";
                $dblogin = "root";
                $password = "root";
                $dbname = "tapncook";

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$bdname", $dblogin, $password);

                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    $sql = "INSERT INTO 'user' (user_name, password) VALUES (:uName, :pWord)";

                    $statement = $conn->prepare($sql);
                    $statement->execute(array(":uName" => $username, ":pWord" => $pwd));
                } catch (PDOEXCEPTION $e) {
                    echo "<p>$sql</p>";
                    $error = $e->getMessage();
                    echo "<p>$error</p>";
                }


            } else {
                $data = array("msg" => "Either firstName, lastName, or email were not filled out correctly.");
            }



        } else {
            // not AJAX
            $data = array("msg" => "Has to be an AJAX call.");
        }


    } else {
        // simple error message, only taking POST requests
        $data = array("msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>