<?php
    session_start();
    // DB login
    $servername = "db736774578.db.1and1.com";
    $dblogin = "dbo736774578";
    $adminpass = "159753Rb$";
    $dbname = "db736774578";

    // localhost testing
    // $servername = "localhost";
    // $dblogin = "root";
    // $pwd = "root";
    // $dbname = "tapncook";

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("msg" => "$methodType");

    if ($methodType === 'GET') {

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);

            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // grabs username from SESSION
            $uName = $_SESSION["username"];
            // increments count in db for username
            $sql = "UPDATE user SET user.counter = user.counter + 1 WHERE user.user_name = ?";

            $statement = $conn->prepare($sql);
            $statement->execute(array($uName));

            $data = array("msg" => $uName);
            
        } catch(PDOException $e) {
            $data = array("msg" => $e->getMessage());
        }
    } else {
        $data = array("msg" => "Error: only GET allowed");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>