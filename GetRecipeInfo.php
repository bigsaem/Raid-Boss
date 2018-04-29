<?php

require_once 'vendor/autoload.php';

$methodType = $_SERVER['REQUEST_METHOD'];

$id = "";

if($methodType === "GET"){
    $id = $_GET["id"];

    $requestString = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id.
    "/analyzedInstructions?stepBreakdown=true";
    //print_r ($requestString); 

    //This part requires Unirest. Unirest is required for us to use the API. 
    $response = Unirest\Request::get($requestString,
    array(
        "X-Mashape-Key" => "r8vXkqjsrjmsh2sYTcnFu4HIyAMGp14tqKvjsnQtsrvyKoKmmb", //this is the API key. 
        "Accept" => "application/json"
    )   
); 
    $data  = $response; 
    $json =  json_encode($data);

    echo $json;

}

?>

