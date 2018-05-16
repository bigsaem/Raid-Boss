<?php

require_once 'vendor/autoload.php';


$methodType = $_SERVER['REQUEST_METHOD'];


if ($methodType === 'GET') {
        $output = $_GET['output'];
        $ingredients = $_GET["ingredients"];

        $requestString = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="
        .$ingredients[0]."%2C+".$ingredients[1]."%2C+".$ingredients[2]."%2C+".$ingredients[3]."%2C+".$ingredients[4]."&limitLicense=false&number=6&ranking=2";

        //this requires Unirest. Unirest is needed to use the API. 
        $response = Unirest\Request::get($requestString,
        array(
            "X-Mashape-Key" => "r8vXkqjsrjmsh2sYTcnFu4HIyAMGp14tqKvjsnQtsrvyKoKmmb",  //this is the API key.
            "Accept" => "application/json"
        )
        );

        /*$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/479101/information?includeNutrition=false",
  array(
    "X-Mashape-Key" => "r8vXkqjsrjmsh2sYTcnFu4HIyAMGp14tqKvjsnQtsrvyKoKmmb",
    "Accept" => "application/json"
  )
);*/
       // $requestStringTime 
        switch($output) { //can remove this later, this is just copy pasted from the lab, where case:json and case:html
            case "json":

                $data= $response; 
                $json =  json_encode($data);

                echo $json;

            
                break; 
        }



} else {
    echo $data;
}



?>

