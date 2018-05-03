<?php

require_once 'vendor/autoload.php';


$methodType = $_SERVER['REQUEST_METHOD'];

$id = "";
//echo "sup";
if ($methodType === 'GET') {

    $id = $_GET["id"];

   // echo "this is the new id: ". $id;
    $requestString = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id."/information?includeNutrition=false";

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