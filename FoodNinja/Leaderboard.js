
//THE COORDINATES OF THE LEADERBOARD ARE HARD CODED!!! IT WILL NOT LINE UP DUE TO HTML BEING STUPID
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
        
        // Create some text in the middle of the game area
        var title = game.add.text(520, 100, 'High Scores', {
            fontSize: '32px',
            fill: '#00FFFF',
        });
        title.anchor.set(0.5, 0.5);

        goBack = game.add.text(450, 450, 'Return to Menu', {
            fontSize: '32px',
            fill: '#00FFFF',
        });
        goBack.inputEnabled = true;

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
                    wordWrap: true,
                });  
                scores.wordWrapWidth = 450;
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
