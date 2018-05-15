<?php

$methodType = $_SERVER['REQUEST_METHOD'];

    $servername = "localhost";
    $dblogin = "root";
    $password = "";
    $dbname = "foodninja";
    $statement;
    $data = array("status" => "fail", "msg" => "On $methodType");

    if ($methodType === 'GET') {
      
        if(isset($_GET['output'])) {
            $output = $_GET['output'];


            // YOUR CODE GOES HERE TO GRAB THE DATA FROM THE DATABASE
            // (I.E., YOUR TRY CATCH)
          try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
           
            //echo "the data is: " . $data;
        } catch(PDOException $e) {
            $data = array("error", $e->getMessage());
        } /////////////////////////////////////////////////////////

        switch($output) {
            case "html":
                  

            // YOUR CODE GOES HERE TO OUTPUT THE DATA FROM THE DATABASE
            //
        
        //THIS PART
          $sql = "SELECT * FROM players ORDER BY highscore DESC"; 

         $statement = $conn->prepare($sql);
         $statement->execute();  
        
         $spaces1;
         $spaces2;
         //echo "the statement is: " . $statement;
         //probably try to change this to json...
         foreach($statement as $item) {
             if (strlen($item["Player"]) < 15){
                 $spaces1 = 10 - strlen($item["Player"]);
                 echo $item["Player"];
                 //echo $spaces1;
                 for ($i = 0; $i < $spaces1; $i++){
                    echo " ";
                    echo 1;
                 }
                 
             }
             if (strlen($item["HighScore"]) < 20){
                 $spaces2 = 20 - strlen($item["HighScore"]);
                 for ($i = 0; $i < $spaces2; $i++){
                     // echo " ";
                 }
                 echo $item["HighScore"];
                 echo "\n";
             }
             else {
                 echo "LOL CHEATER";
             }
             //echo $item["Player"] . "       " .$item["HighScore"] . "     ";
         }
        break;
    }
        
         //this outputs raw html, which i cant format in phaser right now :(
         /*echo "<table><tr><th>ID</th><th>Player</th><th>Score</th></tr>";
         foreach($statement as $item) {
                echo "<tr><td>" . $item['Player']
                    . "</td><td>" . $item['HighScore']
                    . "</td></tr>";
         }
         echo "</table>";

         break;
        } */
    
    }
} else {
    $data = array("msg" => "Error: only GET allowed");
}
?>