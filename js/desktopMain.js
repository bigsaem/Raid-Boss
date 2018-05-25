$(document).ready(function () {

      var ingredients = ["", "", "", "", ""];
      var count = 0;
      var basketCount = 0;
      
      //if the input text (ingredients input) is pressed, do this
      $('#searchBar > input').keyup( function(e) {
        //checks if the user entered a duplicate , if so, do nothing and return
        for (let i = 0; i < ingredients.length - 1; i++) {
          if (ingredients[i] == $(this).val()) {
            return;
          }
        }
        //if not duplicate, and the # of inputted ingredients is less than 5, add it to the basket
        if (e.keyCode == 13 && count < 5) {
          var sb = $(this).val();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + "> p").text(sb);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          console.log(sb);
          ingredients[count] = sb;
          count++;
          $(this).val("");
        }

        //if # of inputted ingredient is 5, go to easter egg game
        if (e.keyCode == 13 && count == 5) {
          console.log("triggered easter egg!");
          window.location.href = 'http://tapncook.ca/FoodNinja/foodninja.html';
        }
      });

      //if the input text (ingredients input) is pressed, do this
      $('#searchbar').keyup( function(e) {
        //checks if the user entered a duplicate , if so, do nothing and return
        for (let i = 0; i < ingredients.length - 1; i++) {
          if (ingredients[i] == $(this).val()) {
            return;
          }
        }
        //if not duplicate, and the # of inputted ingredients is less than 5, add it to the basket
        if (e.keyCode == 13 && count < 5) {
          var sb = $(this).val();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + "> p").text(sb);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          console.log(sb);
          ingredients[count] = sb;
          count++;
          $(this).val("");
        }

        //if # of inputted ingredient is 5, go to easter egg game
        if (e.keyCode == 13 && count == 5) {
          console.log("triggered easter egg!");
          window.location.href = 'http://tapncook.ca/FoodNinja/foodninja.html';
        }
      });

      $('#vegDiv > p').click(function() {
        
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idVeg = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idVeg);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idVeg;
          console.log(ingredients);
          count++;
        }
      });

      $('#fruitDiv > p').click(function() {
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idFruit = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idFruit);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idFruit;
          console.log(ingredients);
          count++;
        }
      });

      $('#breadDiv > p').click(function() {
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idBread = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idBread);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idBread;
          console.log(ingredients);
          count++;
        }
      });     

      $("#meatDiv > p").click( function() {
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idMeat = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idMeat);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idMeat;
          console.log(ingredients);
          count++;
        }
      });

      $("#dairyDiv > p").click(function() {
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idDairy = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idDairy);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idDairy;
          console.log(ingredients);
          count++;
        }
      });

      $("#miscDiv > p").click(function() {
        for (let i = 0; i<ingredients.length-1;i++){
          if(ingredients[i]==$(this).text()){
            return;
          }
        }
        if (count < 5) {
          var idDairy = $(this).text();
					$("#bdiv" + count + "").show();
          $("#bdiv" + count + " > p").text(idDairy);
          $("#arrow").show(500);
          $("#inc").css("display", "flex");
          ingredients[count] = idDairy;
          console.log(ingredients);
          count++;
        }
      });
			
		$("#search").click(function (){
        $("#searchBar").fadeIn(200);
        $("#searchCover").fadeIn(200);
        $("#search-title").fadeIn(200);
        $("#search-input").focus();
        $("#searchBar").css("display", "block");
        $("#searchCover").css("display", "block");
        $("#search-title").css("display", "inline");
      });
      $("#searchCover").click(function () {
        $("#searchBar").css("display", "none");
        $("#searchCover").css("display", "none");
        $("#search-title").css("display", "none");
      });
      $("#vegIcon").click(function () {
        $("#vegDiv").slideToggle(150);
      });
      $("#fruitIcon").click(function () {
        $("#fruitDiv").slideToggle(150);
      });
      $("#breadIcon").click(function () {
        $("#breadDiv").slideToggle(150);
      });
      $("#meatIcon").click(function () {
        $("#meatDiv").slideToggle(150);
      });
      $("#dairyIcon").click(function () {
        $("#dairyDiv").slideToggle(150);
      }); 
      $("#miscIcon").click(function () {
        $("#miscDiv").slideToggle(150);
      });
        /*****************************************/
        /*********removal functionality **********/
        /*****************************************/
			$(".basketItem").click(function() {
				var ids = $(this).text();
        console.log(ids);
        $(this).hide();
        console.log(ingredients);


        for (let i = 0; i < ingredients.length - 1; i++) {
          if (ingredients[i] == ids) {
            ingredients[i] = "";
            var removedIndex = i;
            console.log(ingredients);
            console.log("removed index: " + removedIndex);
          }
        }
        for (var i = ingredients.length - 1; i > removedIndex; i--) {
          if (ingredients[i] != "") {
            ingredients[removedIndex] = ingredients[i];
            ingredients[i] = "";
            console.log(ingredients);
            break;
          }
        }

        count--;
        if (count == 0) {
          $("#arrow").slideUp();
        }

        console.log(ids);
      });


      /*****************************************/
      /*********removal functionality end*******/
      /*****************************************/

      ///////////////////////////////////////////////
      //         Counter Function                  //
      ///////////////////////////////////////////////

      $(".clickCounter").click(function () {
        $.ajax({
          url: "./php/counter.php",
          dataType: "json",
          type: "GET",
          success: function (data) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#p1").text(jqXHR.statusText);
          }
        });
      });

      ///////////////////////////////////////////////
      //         Retrieve User Info                //
      ///////////////////////////////////////////////

      $.ajax({
        url: "./php/userInfo.php",
        dataType: "json",
        type: "GET",
        success: function (data) {
          if(data.msg !=null){
            $("#userInfo").after(data.msg + '&nbsp;&nbsp;&nbsp;');
            $("#loginNav").css("display", "block");
            $("#loginNav").css("float", "");
            $("break").css("display", "none");
            $("#userInfo").css("display", "inline-block");
            $("#logoutButton").css("display", "inline-block");
            $("#header p").css("margin-bottom", "0");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error");
        }
      });

      ///////////////////////////////////////////////
      //         Logout Button                     //
      ///////////////////////////////////////////////

      $("#logoutButton").click(function () {
        $.ajax({
          url: "./php/logout.php",
          dataType: "json",
          type: "GET",
          success: function (data) {
            $("#loginNav").html(data.msg);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#p1").text(jqXHR.statusText);
          }
        });
      });

      ///////////////////////////////////////////
      ///// recipe page start ///////////////////
      ///////////////////////////////////////////

      $("#arrow").click(function () {
        $("#whole").hide(500);
        $(".wrapper").show(500);
        var counter = 0;
        $.ajax({
          url: "GetRecipeID.php",
          dataType: "json",
          type: "GET",
          data: {
            output: 'json',
            ingredients: ingredients
          },
          success: function (data) {
            var items = data;
            console.log(items);
           //assigning unique id and attribute for each card
           var x = 0;
           $(".recipe_ingredient").each(function(){
                if(items["body"][x] !=null) {
                    $(this).attr('id', 'ingredient_' + items['body'][x]['id']);
                }
                x++;
            });
            x = 0;

            $(".card").each(function(){
                if ((items["body"][x]) != null) {
                    $(this).attr('id', items["body"][x]["id"]);
                    //console.log($(this).attr('id'));
                }
                x++;
                counter++;
                console.log(counter);
            });
            x = 0;
            //set the image attribute depending on its id
            $(".recipe_image").each(function(){
                if ((items["body"][x]) != null) {
                    $(this).attr('id', items["body"][x]["id"]);
                    $(this).attr('src', items["body"][x]["image"]);
                    $(this).attr('text', items['body'][x]['title']);
                }
                x++;
            });

            x = 0;
            $(".recipe_title").each(function(){
                if ((items["body"][x]) != null) {
                    $(this).attr('id', 'title_' + items["body"][x]["id"]);
                    $(this).text(items["body"][x]["title"]);
                }
                x++;
            });
            
            x = 0;
            $(".card-read-more").each(function(){
              if((items["body"][x])!=null) {
                $(this).attr('id', 'read_' + items["body"][x]["id"]);
              }
              x++;
            });

            //this code is to put ingredients information onto individual cards.
            while (true){
            console.log("---" + counter);
                if (counter == 6){
                    $(".card").each(function(){
                        var individual_card = $(this);
                        $.ajax({
                            url: "GetRecipeInfo.php",
                            dataType: "json",
                            type: "GET",
                            data: {
                                output: 'json',
                                id: $(this).attr("id")
                            },
                            success: function (data) {
                                var dataBody = data["body"][0];
                                var ingredientsNeeded = new Array();
                                console.log("-------data array--------");
                                console.log(dataBody);
                                console.log("--------------------");
                                var stringIngredient = "";
                                if (data["body"][0] != undefined){
                                    for (var i = 0; i < dataBody["steps"].length; i++) {
                                        for (var j = 0; j < dataBody["steps"][i]["ingredients"].length; j++) {
                                            if (!ingredientsNeeded.includes(dataBody["steps"][i]["ingredients"][j]["name"].charAt(0).toUpperCase() 
                                                + dataBody["steps"][i]["ingredients"][j]["name"].substr(1))) {
                                                //Save the ingredients into the ingredienet array after capitalizing the first character.
                                                ingredientsNeeded.push(dataBody["steps"][i]["ingredients"][j]["name"].charAt(0).toUpperCase() 
                                                + dataBody["steps"][i]["ingredients"][j]["name"].substr(1));
                                            } else {
                                                console.log("duplicate ingredient: " + dataBody["steps"][i]["ingredients"][j]["name"]);
                                            }
                                        }
                                    }
                                }
                                else {
                                stringIngredient = "Sorry, no recipe instructions can be obtained.";
                                //console.log("databody not defined!");
                                }
                                

                                //this code is to capitalize the first character of ingredients.
                                for(let i = 0; i < ingredientsNeeded.length; i++){
                                    if (i == ingredientsNeeded.length-1){
                                        stringIngredient += ingredientsNeeded[i];
                                    } else{
                                        stringIngredient += ingredientsNeeded[i] + ", ";
                                    }   
                                }
                                console.log(individual_card.attr('id') +":"+ stringIngredient); 
                                $("#ingredient_" + $(individual_card).attr('id')).text(stringIngredient);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $("#header").text(textStatus + " " + errorThrown +
                                jqXHR.responseText);
                                }
                            });
                        }); return;
                    }
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#header").text(textStatus + " " + errorThrown +
              jqXHR.responseText);
          }
        });
      });

      //modal pops up if a user clicks the image
      $(".recipe_image").on("click", function() {
        $('#imagepreview').attr('src', $(this).attr('src')); // here asign the image to the modal when the user click the enlarge link
        $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
        $('.modal-title').text($(this).attr('text'));
        var chosenCard = $(this);
        //Add recipe and insturction information on modal
        $.ajax({
            url: "GetRecipeInfo.php",
            dataType: "json",
            type: "GET",
            data: {
                output: 'json',
                id: $(this).attr("id")
            },
            success: function (data) {
                var dataBody = data["body"][0];
                console.log(dataBody);
                //add ingredient information
                $(".ingredient_content").text($('#ingredient_' + chosenCard.attr('id')).text());
                
                //add instruction information
                var recipeTable = "<ol>";
                //APPENDS THE RECIPE STEPS
                if (data["body"][0] != undefined){
                for (var i = 0; i < dataBody["steps"].length; i++) {
                    recipeTable+= "<li>" + dataBody["steps"][i]["step"] + "</li><br/>";
                }
                recipeTable += "</ol>";
                }
                $(".instructions_content").html(recipeTable);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#header").text(textStatus + " " + errorThrown +
                jqXHR.responseText);
                }
            });
        //add basic information on modal
        $.ajax({
            url: "GetRecipeAdditionalInfo.php",
            dataType: "json",
            type: "GET",
            data: { id: $(this).attr("id") },
            success: function (data) {
                var info = data;
                //do stuff
                console.log("ready in "+ info["body"]["readyInMinutes"] + " minutes");
                console.log("IS IT VEGETARIAN? "+ info["body"]["vegetarian"]);
                console.log("is it vegan? "+ info["body"]["vegan"]);
                console.log("is it gluten free? "+ info["body"]["glutenFree"]);
                console.log("dairy free?  "+ info["body"]["dairyFree"]);
                //I am appending it to the div with class ".stats_RECIPEID"
                var estimatedTime =  "Estimated Time: " + info["body"]["readyInMinutes"] + " minutes. </br>";
                var basicInfo ="";
                var infoBody = info["body"];
                basicInfo += "Ready in "+ info["body"]["readyInMinutes"] + " minutes </br>"; 
                if (infoBody["vegetarian"] === true){
                    console.log("is vegetarian");
                    basicInfo += "For Vegetarians! </br>";
                }
                if (infoBody["vegan"] === true){
                    basicInfo += "For Vegans! </br>";
                }
                if (infoBody["glutenFree"] === true){
                    basicInfo += "Gluten Free! </br>";
                }
                if (infoBody["dairyFree"] === true){
                    basicInfo += "Dairy Free! </br>";
                }
                $(".information_content").html(basicInfo);
            },
            error: function (jqXHR, textStatus, errorThrown) {
            console.log("ajax failed");
            console.log(textStatus + " " + errorThrown
            + jqXHR.responseText);
            }
        });      
      });
    });
    /************************************************/
    /*****************Nav bar function***************/
    /************************************************/
    function openNav() {
            document.getElementById("mySidenav").style.width = "350px";
            document.getElementById("cover").style.display = "block";
        }
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("cover").style.display = "none";
    }