$(document).ready(function () {

    var ingredients = ["", "", "", "", ""];
    var count = 0;
    var basketCount = 0;

    //if the input text (ingredients input) is pressed, do this
    $('#searchBar > input').keyup(function (e) {
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

    $('#vegDiv > p').click(function () {

        for (let i = 0; i < ingredients.length - 1; i++) {
            if (ingredients[i] == $(this).text()) {
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

    $('#fruitDiv > p').click(function () {
        for (let i = 0; i < ingredients.length - 1; i++) {
            if (ingredients[i] == $(this).text()) {
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

    $('#breadDiv > p').click(function () {
        for (let i = 0; i < ingredients.length - 1; i++) {
            if (ingredients[i] == $(this).text()) {
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

    $("#meatDiv > p").click(function () {
        for (let i = 0; i < ingredients.length - 1; i++) {
            if (ingredients[i] == $(this).text()) {
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

    $("#dairyDiv > p").click(function () {
        for (let i = 0; i < ingredients.length - 1; i++) {
            if (ingredients[i] == $(this).text()) {
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

    $("#search").click(function () {
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
    /*****************************************/
    /*********removal functionality **********/
    /*****************************************/
    $(".basketItem").click(function () {
        var ids = $(this).text();
        console.log("removing " + ids);
        $(this).hide();

        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i] == ids) {
                ingredients[i] = "";
                var removedIndex = i;
                console.log(removedIndex);
                console.log("removed index: " + removedIndex);
            }
        }
        for (var i = ingredients.length - 1; i > removedIndex; i--) {
            if (ingredients[i] != "") {
                ingredients[removedIndex] = ingredients[i];
                ingredients[i] = "";
                break;
            }
        }
        console.log(ingredients);

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
            if (data.msg != null) {
                $("#userInfo").after(data.msg);
                $("#loginNav").css("display", "block");
                $("#userInfo").css("display", "inline-block");
                $("#logoutButton").css("display", "inline-block");
                $("#loginHide").css("display", "none");
                $("#signupHide").css("display", "none");
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
                $("#loginHide").css("display", "block");
                $("#signupHide").css("display", "block");
                setTimeout(function() {
                    location.reload();
                }, 1500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
            }
        });
    });


    $("#arrow").click(function () {
        $("#whole").hide(500);
        $("#menu").show(500);

        $.ajax({
            url: "./GetRecipeID.php",
            dataType: "json",
            type: "GET",
            data: {
                output: 'json',
                ingredients: ingredients
            },
            success: function (data) {
                var items = data;
                var x = 0;
                $('.recipes').each(function (i, $this) {
                    if ((items["body"][x]) == null) {
                        $(this).hide();
                    }
                    x++;
                });

                x = 0;
                //Loops through all the recipeID classes, and sets the recipe title for each.
                $('.recipeName').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).text(items["body"][x]["title"] /*+ " and ID: " + items["body"][x]["id"]*/ );
                        $(this).attr('id', "name_" + items["body"][x]["id"]);
                    }
                    x++;
                });

                x = 0;
                //loops through all the recipeID classes, and sets the images for each
                $('.images').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        //$(this).text(items["body"][x]["image"]);
                        $(this).attr('src', items["body"][x]["image"]);
                        $(this).attr('id', items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                $('.wrappers').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).attr('id', items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                //assign id number to information dropdown bar
                $('.information').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).attr('id', items["body"][x]["id"]);
                        $(this).attr('class', $(this).attr('class') + "_" + items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                //Loops through all the recipeStats classes (paragraph element that holds stats (time, dietary needs))
                //, and changes the class name
                //to "statsrecipe id" for future reference
                $('.recipeStats').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        console.log((items["body"][x]));
                        $(this).attr('class', "stats_" + items["body"][x]["id"]);
                        //$(this).addClass(items["body"][x]["id"]);
                        //$(this).attr('src', items["body"][x]["image"]);
                    }
                    x++;
                });
                x = 0;

                //Loops through all the recipeNumber classes (paragraph element), and changes the class name
                //to the recipe id for future reference
                $('.ingredients').each(function (i, $this) {

                    if ((items["body"][x]) != null) {
                        $(this).attr('id', items["body"][x]["id"]);
                        $(this).attr('class', $(this).attr('class') + "_" + items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                $('.ingredientAPI').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).attr('class', "ing_" + items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                $('.instructions').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).attr('id', items["body"][x]["id"]);
                        $(this).attr('class', $(this).attr('class') + "_" + items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;
                $('.recipeIns').each(function (i, $this) {
                    if ((items["body"][x]) != null) {
                        $(this).attr('class', "rec_" + items["body"][x]["id"]);
                    }
                    x++;
                });
                x = 0;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(textStatus + " " + errorThrown +
                    jqXHR.responseText);
            }
        });
    });
    //prevent to put the same information into paragraphs.
    showmenu = [];
    $('.wrappers').click(function (e) {

        // don't allow the anchor to visit the link
        e.preventDefault();
        $('.information_' + $(this).attr('id')).toggle(200);
        $('.ingredients_' + $(this).attr('id')).toggle(200);
        $('.instructions_' + $(this).attr('id')).toggle(200);
        $('.stats_' + $(this).attr('id')).hide(200);
        $('.ing_' + $(this).attr('id')).hide(200);
        $('.rec_' + $(this).attr('id')).hide(200);
        //prevent to put the same information into paragraphs.
        if (showmenu["" + $(this).attr("id")] == null) {
            showmenu["" + $(this).attr("id")] = true;

            console.log('clicked to get recipe info');
            var clickedElement = this;

            $.ajax({
                url: "./GetRecipeInfo.php",
                dataType: "json",
                type: "GET",
                data: {
                    output: 'json',
                    id: $(this).attr("id")
                },
                success: function (data) {
                    var dataBody = data["body"][0];


                    //APPENDS THE INGREDIENTS LIST TO THE PARAGRAPH ELEMENT WITH CLASS NAME = RECIPE ID, WITHOUT ADDING DUPLICATE INGREDIENTS
                    //$("." + $(clickedElement).attr("id")).append("<b>Ingredients needed:</b> ");
                    $("." + $(clickedElement).attr("id")).append('<b>Ingredients</b><br/>');

                    var ingredientsNeeded = "";
                    if (data["body"][0] != undefined) {
                        for (var i = 0; i < dataBody["steps"].length; i++) {
                            for (var j = 0; j < dataBody["steps"][i]["ingredients"].length; j++) {
                                if (ingredientsNeeded.indexOf(dataBody["steps"][i]["ingredients"][j]["name"]) == -1) {
                                    ingredientsNeeded += (dataBody["steps"][i]["ingredients"][j]["name"] + ", ");
                                } else {
                                    console.log("duplicate ingredient: " + dataBody["steps"][i]["ingredients"][j][
                                        "name"
                                    ]);
                                }
                            }
                        }
                    } else {
                        ingredientsNeeded = "Sorry, no recipe instructions can be obtained. ";
                        console.log("databody not defined!");
                    }
                    //Capitalize the first letter of each ingredient
                    console.log(ingredientsNeeded);

                    $(".ing_" + $(clickedElement).attr("id")).append(ingredientsNeeded);

                    var recipeTable = "<ol>";
                    //APPENDS THE RECIPE STEPS
                    if (data["body"][0] != undefined) {

                        for (var i = 0; i < dataBody["steps"].length; i++) {
                            recipeTable += "<li>" + dataBody["steps"][i]["step"] + "</li><br/>";
                        }
                        recipeTable += "</ol>";
                    }
                    $(".rec_" + $(clickedElement).attr("id")).append(recipeTable);

                    //////NEW CHANGESS (TIME FEATURE)  VIA NESTED AJAX CALL/////
                    $.ajax({
                        url: "./GetRecipeAdditionalInfo.php",
                        dataType: "json",
                        type: "GET",
                        data: {
                            id: $(clickedElement).attr("id")
                        },
                        success: function (response) {
                            var info = response;
                            //do stuff
                            console.log("ready in " + info["body"]["readyInMinutes"] + " minutes");
                            console.log("IS IT VEGETARIAN? " + info["body"]["vegetarian"]);
                            console.log("is it vegan? " + info["body"]["vegan"]);
                            console.log("is it gluten free? " + info["body"]["glutenFree"]);
                            console.log("dairy free?  " + info["body"]["dairyFree"]);
                            //I am appending it to the div with class ".stats_RECIPEID" 
                            $(".stats_" + $(clickedElement).attr("id")).append("Estimated Time: " + info["body"]["readyInMinutes"] + " minutes. </br>");

                            var infoBody = info["body"];
                            console.log("infobody vegetarian is:" + infoBody["vegetarian"]); //this returns a boolean value 
                            if (infoBody["vegetarian"] === true) {
                                console.log("is vegetarian");
                                $(".stats_" + $(clickedElement).attr("id")).append("For Vegetarians! </br>");
                            }
                            if (infoBody["vegan"] === true) {
                                $(".stats_" + $(clickedElement).attr("id")).append("For Vegans! </br>");
                            }
                            if (infoBody["glutenFree"] === true) {
                                $(".stats_" + $(clickedElement).attr("id")).append("Gluten Free! </br>");
                            }
                            if (infoBody["dairyFree"] === true) {
                                $(".stats_" + $(clickedElement).attr("id")).append("Dairy Free! </br>");
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("ajax failed");
                            console.log(textStatus + " " + errorThrown +
                                jqXHR.responseText);
                        }

                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#p1").text(textStatus + " " + errorThrown +
                        jqXHR.responseText);
                }
            });
        }
    });
    //drop down bar functionality
    $(".information").click(function () {
        $(".stats_" + $(this).attr("id")).toggle(200);
    });
    $(".ingredients").click(function () {
        $(".ing_" + $(this).attr("id")).toggle(200);
    });
    $(".instructions").click(function () {
        $(".rec_" + $(this).attr("id")).toggle(200);
    });
    //recipe hovering effect
    $(".wrappers").hover(function () {
        $(this).css("filter", "opacity(80%)");
    }, function () {
        $(this).css("filter", "");
    });
    //recipe click effect
    $(".wrappers").mousedown(function () {
        $(this).css("filter", "opacity(90%)");
        $(this).css("width", "95%");
        console.log("#" + $(this).attr("id"));
        $("#name_" + $(this).attr("id")).css("width", "95%");
    }).mouseup(function () {
        $(this).css("filter", "");
        $(this).css("width", "100%");
        $("#name_" + $(this).attr("id")).css("width", "100%");
    });
    //recipe touch effect (cannot use :active cause we need to move recipe title paragraph as well)
    $(".wrappers").bind('touchstart', function () {
        $(this).css("filter", "opacity(90%)");
        $(this).css("width", "95%");
        console.log("#" + $(this).attr("id"));
        $("#name_" + $(this).attr("id")).css("width", "95%");
    }).bind('touchend', function () {
        $(this).css("filter", "");
        $(this).css("width", "100%");
        $("#name_" + $(this).attr("id")).css("width", "100%");
    });

    $(".col-sm-12").css("padding", "0");
    $(".recipes").css("border", "solid 1px crimson");
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
/*************recipe page style ****************/
$(".recipeIns").css("text-align", "left");
$(".ingredients").css("background-color", "orange");
$(".instructions").css("background-color", "orange");
$(".information").css("background-color", "orange");
$(".information").css("border", "1px solid  black");
$(".ingredients").css("border", "1px solid  black");
$(".instructions").css("border", "1px solid black");