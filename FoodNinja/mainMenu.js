///////////////Responsible for the Main Menu Phaser State//////////////////////////

/*Declare global variables used in this script */
var playerName; //variable to hold the player name, it will be passed to other states and eventually sent to the database.
var newGame; 
var howToPlay;
var highScores;
var levelSelect;
var popupHowTo;
var tween = null;

var music;

var menuState = {

    init: function () {

        /*Starts music */
        music = game.add.audio('menuBGM');
        music.loop = true;
        music.play();

        /*Adds the background screen*/
        game.add.sprite(0, 0, 'menu-bg'); 

        /*Adds game title */
        var titleText = game.add.text(game.world.centerX, 100, "Food Ninja", {
            font: '50pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        /*Adds New Game option text */
        newGame = game.add.text(50, 270, "New Game", {
            font: '20pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        newGame.inputEnabled = true;

        /*Adds How To Play option text */
        howToPlay = game.add.text(50, 350, "How To Play", {
            font: '20pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        howToPlay.inputEnabled = true;

        /*Adds High Scores option text */
        highScores = game.add.text(50, 430, "High Scores", {
            font: '20pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        highScores.inputEnabled = true;

        /*Adds Level Select option text */
        levelSelect = game.add.text(50, 510, "Level Select", {
            font: '20pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        levelSelect.inputEnabled = true;

        /*Adds Tip Popup image */
        popupHowTo = game.add.sprite(610.1565995713416, 368.06720124573263, 'howtoplay');
        popupHowTo.alpha = 0.8;
        popupHowTo.anchor.set(0.5);
        popupHowTo.inputEnabled = true;
        popupHowTo.input.enableDrag();
        popupHowTo.scale.set(0.1);
    },

    create: function () {

        /*Adds Jquery event handlers to all buttons*/
        newGame.events.onInputOver.add(hover, this);
        howToPlay.events.onInputOver.add(hover, this);
        highScores.events.onInputOver.add(hover, this);
        levelSelect.events.onInputOver.add(hover, this);

        newGame.events.onInputOut.add(hoverOut, this);
        howToPlay.events.onInputOut.add(hoverOut, this);
        highScores.events.onInputOut.add(hoverOut, this);
        levelSelect.events.onInputOut.add(hoverOut, this);

        newGame.events.onInputDown.add(startGame);
        howToPlay.events.onInputDown.add(showManual);
        highScores.events.onInputDown.add(showScores);
        levelSelect.events.onInputDown.add(selectLevel);

        popupHowTo.events.onInputDown.add(showManual);
    },

    update: function () {
        //Nothing to update in this state.
    }
}

/*Highlights the text on hover*/
function hover(text) {
    text.fill = "#00FF00";
}

/*Removes the highlight on text on hover-out*/
function hoverOut(text) {
    text.fill = '#FDFFB5'
}

/*Starts the game by asking user to input their username, and then changes to tutorial state.*/
function startGame() {

    console.log("starting game");
    var prompt = window.prompt("Please enter your name", "Player");
    playerName = prompt;
    while (playerName.length > 9){
        prompt = window.prompt("Your name cannot exceed 9 characters", "Player");
        playerName = prompt;
    }

    console.log("name is: " + playerName);
    game.sound.stopAll();
    if (playerName.toLowerCase == "raid boss"){
        this.game.state.start('playTutorial', true, false, playerName); //replace this with secret levels
    }
    if (!(playerName == null)){
        console.log("entered non-null name");
        this.game.state.start('playTutorial', true, false, playerName); //true: clear world, false: dont clear cache, playerName: passed on
    }

}

//Shows the instructions using tween elastic animation.
function showManual() {
    console.log("showing manual");
    //If image is already showing, hide it again.
    if ((tween !== null && tween.isRunning) || popupHowTo.scale.x === 1) {
        tween = game.add.tween(popupHowTo.scale).to({ x: 0.1, y: 0.1 }, 1000, Phaser.Easing.Elastic.In, true);
        return;
    }
    //If image is hidden, pops it up
    tween = game.add.tween(popupHowTo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
}

function showScores() {
    console.log("showing scores");
    game.sound.stopAll();

    this.game.state.start('showLeaderBoard');

}

function selectLevel() {
    console.log("showing level select");
    game.sound.stopAll();

    this.game.state.start('showLevelSelect');
}

