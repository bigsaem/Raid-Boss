/*This javascript file displays the menu when you lose all your lives*/
/*This also includes a function that sends the user score to the database.*/

var playerScore;
var playerName;
var level;
var goBack;
var leaderboard;
var music;

var gameOverState = {

    init: function (name, stageLevel, score) {

        music = game.add.audio('gameOverBGM');
        music.loop = true;
        music.play();

        playerScore = score;
        level = stageLevel;
        playerName = name;

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 

        var titleText = game.add.text(game.world.centerX, 100, "You Ran Out Of Lives", {
            font: '35pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        var summary = game.add.text(150, 250, "Your score is " + playerScore + ".    Please Get Good, " + playerName, {
            font: '15pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });

        goBack = game.add.text(game.world.centerX, 450, 'Return to Menu', {
            fontSize: '20px',
            fill: '#FDFFB5',
        });
        goBack.inputEnabled = true;

        leaderboard = game.add.text(game.world.centerX, 400, "See Leaderboard", {
            font: '25px',
            fill: '#FDFFB5',
            align: 'center'
        });
        leaderboard.inputEnabled = true;

    },

    create: function () {

        console.log("sending data");
        sendData();
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            console.log("clicked inside menu update");
            //this.game.state.start('playGame');
        }

        goBack.events.onInputOver.add(hover, this);
        leaderboard.events.onInputOver.add(hover, this);

        goBack.events.onInputOut.add(hoverOut, this);
        leaderboard.events.onInputOut.add(hoverOut, this);

        goBack.events.onInputDown.add(goToMainMenu);
        leaderboard.events.onInputDown.add(showLeaderBoard);
    }
}

function hover(text) {
    text.fill = "#00FF00";
}

function hoverOut(text) {
    text.fill = '#FDFFB5'
}

function goToMainMenu(){
    game.sound.stopAll();
    this.game.state.start('MainMenu');
}

function showLeaderBoard(){
    game.sound.stopAll();
    this.game.state.start('showLeaderBoard');
}

/*Sends the player and scores data to the database/*/
function sendData(){
    if (playerName === "" || playerName === "player x" || playerName === undefined){
     //   console.log("null name, returning");
        return; //dont save data if player doesnt enter a name. (can change this to also include player X)
    }
    console.log("not null name");
    console.log("player score is: " + playerScore)
   // console.log(playerName.toString);

    playerScore = JSON.stringify(playerScore);
    playerName = JSON.stringify(playerName);

    jsonName = JSON.parse(playerName);
    jsonScore = JSON.parse(playerScore);
 
    console.log("jsonName: " + jsonName);
    console.log("jsonScore: " + jsonScore);

    $.ajax({
        url: "storePlayer.php",
        type: "GET",
        dataType: "json",
        data: {
            username: jsonName,
           userScore: jsonScore
          },
        success: function (data) {
            console.log("Data returned from server: ", data);
            var listData = data.msg;
            // for (var key in data) {
            //     listData += data[key] + " ";
            // }
           // $("#p1").text(listData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
           console.log("Something went wrong: " + errorThrown);
        }

    });



}