
/////This file displays the Leaderboard///////
//THE COORDINATES OF THE LEADERBOARD ARE CURRENTLY HARD CODED!!! THUS THERE WILL BE MISALIGNMENTS IN THE BOARD.
var goBack;
var music;

var leaderboard = {
    // Called first
    preload: function () {
        music = game.add.audio('gameOverBGM');
        music.loop = true;
        music.play();

    },

    // Called after preload
    create: function () {

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 
        
        /*Adds the "High Scores" text to the screen.*/
        var title = game.add.text(520, 100, 'High Scores', {
            fontSize: '32px',
            fill: '#00FFFF',
        });
        title.anchor.set(0.5, 0.5);

        goBack = game.add.text(450, 500, 'Return to Menu', {
            fontSize: '32px',
            fill: '#FDFFB5',
        });
        goBack.inputEnabled = true;
        
        /*Ajax call to get the high scores from database.*/
        $.ajax({
            url: "getHighScores.php",
            dataType: "html",
            type: "GET",
            data: { output: 'html' },
            success: function (data) {
                console.log(data);
                // YOUR CODE GOES HERE
                console.log("Getting html");
                
                var scores =  game.add.text(250, 150, data, {
                    fontSize: '20px',
                    fill: '#00FFFF',
                    wordWrap: "false",
                    boundsAlignH: "right",
                    whiteSpace: "pre",
                    letterSpacing: "5px",
                });  
                scores.wordWrapWidth = 460;
                //$("#htmlTable").append(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(textStatus + " " + errorThrown);
            }
        }); 

    },

    // Called once every frame, ideally 60 times per second
    update: function () {
        goBack.events.onInputOver.add(hover, this);
        goBack.events.onInputOut.add(hoverOut, this);
        goBack.events.onInputDown.add(returnedToMenu);

    }
}

function hover(text) {
    text.fill = "#00FF00";
}

function hoverOut(text) {
    text.fill = '#FDFFB5'
}

function returnedToMenu(){
    game.sound.stopAll();
    this.game.state.start('MainMenu');
}
