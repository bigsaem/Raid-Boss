
var playerScore;
var playerName;
var level;
var goBack;
var leaderboard;
var music;
var popupTip2;
var tempScore;
var nextLevel;

var level1EndState = {

    init: function (name, score) {
        console.log("inside endscreen, passed score is: " + score);
        music = game.add.audio('menuBGM');
        music.loop = true;
        music.play();

        playerScore = score;
        level = stageLevel;
        playerName = name;

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 

        var titleText = game.add.text(game.world.centerX, 100, "Are you getting the hang of double jumps?", {
            font: '17pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        var nextLine = game.add.text(game.world.centerX, 230, "Note: Scores are saved between levels, but HP is not", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLine.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLine.anchor.set(0.5);

        nextLevel = game.add.text(game.world.centerX, 450, "Click to proceed to Level 2", {
            font: '23pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLevel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLevel.anchor.set(0.5);
        nextLevel.inputEnabled = true;

        popupTip2 = game.add.sprite(game.world.centerX, 320, 'tip2');
        popupTip2.alpha = 0.8;
        popupTip2.anchor.set(0.5);
        popupTip2.inputEnabled = true;
        popupTip2.input.enableDrag();
        popupTip2.scale.set(0.3);
    },

    create: function () {
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            console.log("clicked inside tutorial end screen update");
            //this.game.state.start('playGame');
        }
        
        popupTip2.events.onInputDown.add(showTip2);
        nextLevel.events.onInputDown.add(goNextLevel);
        nextLevel.events.onInputOver.add(hover, this);
        nextLevel.events.onInputOut.add(hoverOut, this);
    }
}

function hover(text) {
    text.fill = "#00FF00";
}

function hoverOut(text) {
    text.fill = '#FDFFB5'
}

function showTip2(){
    console.log("showing tip");
    //if image is already showing, hide it again.
    if ((tween !== null && tween.isRunning) || popupTip2.scale.x === 1) {
        tween = game.add.tween(popupTip2.scale).to({ x: 0.3, y: 0.3 }, 1000, Phaser.Easing.Elastic.In, true);
        return;
    }
    //if image is hidden, pops it up
    tween = game.add.tween(popupTip2.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
}

function goNextLevel(){
    console.log("going to level 2...Score thus far is: " + playerScore);
    game.sound.stopAll();
    this.game.state.start('level2', true, false, playerName, playerScore);
}

