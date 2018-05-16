<?php

    session_start();
    // $servername = "localhost";
    // $dblogin = "root";
    // $pwd = "root";
    // $dbname = "tapncook";

    $methodType = $_SERVER['REQUEST_METHOD'];

    if ($methodType === 'GET') {

            $uName = $_SESSION["username"];
            if ($uName != NULL) {
            $data = array("msg" => "Welcome! $uName");
            }
    } else {
        $data = array("msg" => "Error: only GET allowed");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>