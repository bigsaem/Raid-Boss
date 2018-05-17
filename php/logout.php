<?php
    session_start();

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("msg" => "$methodType");

    // destroys session if logout is requested
    if ($methodType === 'GET') {
        session_destroy();
        $data = array("msg" => "Logged out");

    } else {
        $data = array("msg" => "Error: only GET allowed");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>