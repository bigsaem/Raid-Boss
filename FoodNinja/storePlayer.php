<?php
   // echo "inside file";
    $methodType = $_SERVER['REQUEST_METHOD'];

    // DB Login
    $servername = "db736774578.db.1and1.com";
    $dblogin = "dbo736774578";
    $adminpass = "159753Rb$";
    $dbname = "db736774578";

   /* $servername = "db736774578.db.1and1.com";
$dblogin = "dbo736774578";
$adminpass = "159753Rb$";
$dbname = "db736774578"; */
  //  echo "inside file";
    if ($methodType === 'GET') {
        //echo "inside get";
       // if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            //&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
                // get the data from the post and store in variables
                $name = $_GET["username"];
                $score = $_GET["userScore"];

               // echo "name/score is: " . $name . ",  " . $score;

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);
        
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                  //  echo "inserting..";
                   // $sql = "INSERT INTO user (user_name, password, high_score) VALUES ('$login', '$pwd', 0)";
                    $sql = "INSERT INTO players (Player, HighScore) VALUES ('$name', '$score')";

                    $statement = $conn->prepare($sql);
                    $statement->execute();

                    $data= $statement;
                    $json =  json_encode($data);
    
                    //echo $json;
    
                } catch(PDOException $e) {
                    $data = array("errorlol", $e->getMessage());
                }

    } else {
        // simple error message, only taking POST requests
        $data = array("status" => "fail", "msg" => "Error: only GET allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>