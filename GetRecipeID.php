<?php

require_once 'vendor/autoload.php';

$methodType = $_SERVER['REQUEST_METHOD'];


if ($methodType === 'GET') {
    $ingredients = $_GET["ingredients"];

    $requestString = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="
    .$ingredients[0]."%2C+".$ingredients[1]."%2C+".$ingredients[2]."%2C+".$ingredients[3]."%2C+".$ingredients[4]."&limitLicense=false&number=5&ranking=2";

    //This part requires Unirest. 
    $response = Unirest\Request::get($requestString,
    array(
        "X-Mashape-Key" => "r8vXkqjsrjmsh2sYTcnFu4HIyAMGp14tqKvjsnQtsrvyKoKmmb",
        "Accept" => "application/json"
    )
    );

    $data= $response; 
    $json =  json_encode($data);

    echo $json;

    break; 


} else {
    echo $data;
}



?>

