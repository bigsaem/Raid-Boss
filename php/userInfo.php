<?php
    session_start();
    
    $methodType = $_SERVER['REQUEST_METHOD'];

    if ($methodType === 'GET') {

        // retrieves username from SESSION
        $uName = $_SESSION["username"];

        // checks if username exists
        if ($uName != NULL) {
        $data = array("msg" => "$uName");
        }

    } else {
        $data = array("msg" => "Error: only GET allowed");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>