<?php

    // DB Login
    $servername = "db736774578.db.1and1.com";
    $dblogin = "dbo736774578";
    $adminpass = "159753Rb$";
    $dbname = "db736774578";

    // localhost testing
    // $servername = "localhost";
    // $dblogin = "root";
    // $adminpass = "root";
    // $dbname = "tapncook";

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("msg" => "$methodType");

    if ($methodType === 'GET') {

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $adminpass);

            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // selects first 5 users by count in descending order
            $sql = "SELECT user.user_name, user.counter FROM user ORDER BY user.counter DESC LIMIT 5";

            $statement = $conn->prepare($sql);
            $statement->execute();

            // returns data as html
            echo "<table class=\"table table-light\"><thead class=\"thead-dark\"><tr><th>User</th><th>Score</th></tr></thead>";

            foreach ($statement as $row) {
                echo "<tr><td>" . $row['user_name'] . "</td><td>" . $row['counter'] . "</td></tr>";
              }
            echo "</table>";

        } catch(PDOException $e) {
            $data = array("msg" => $e->getMessage());
        }
        
    } else {
        $data = array("msg" => "Error: only GET allowed");
    }

?>