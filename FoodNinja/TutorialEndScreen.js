
var playerScore;
var playerName;
var level;
var goBack;
var leaderboard;
var music;
var popupTip1;
var tempScore;
var nextLevel;

var tutorialEndState = {

    init: function (score, stageLevel, name) {

        music = game.add.audio('menuBGM');
        music.loop = true;
        music.play();

        playerScore = score;
        level = stageLevel;
        playerName = name;

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 

        var titleText = game.add.text(game.world.centerX, 100, "Tutorial too easy?", {
            font: '17pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        var nextLine = game.add.text(game.world.centerX, 200, "I sure hope so, that was just a warm up!", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLine.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLine.anchor.set(0.5);

        nextLevel = game.add.text(game.world.centerX, 400, "Click to proceed to Level 1", {
            font: '23pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLevel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLevel.anchor.set(0.5);
        nextLevel.inputEnabled = true;

        popupTip1 = game.add.sprite(game.world.centerX, 300, 'tip1');
        popupTip1.alpha = 0.8;
        popupTip1.anchor.set(0.5);
        popupTip1.inputEnabled = true;
        popupTip1.input.enableDrag();
        popupTip1.scale.set(0.3);




    },

    create: function () {

    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            console.log("clicked inside tutorial end screen update");
            //this.game.state.start('playGame');
        }
        
        popupTip1.events.onInputDown.add(showTip0);
        nextLevel.events.onInputDown.add(goLevel1);
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

function showTip0(){
    console.log("showing tip");
    //if image is already showing, hide it again.
    if ((tween !== null && tween.isRunning) || popupTip1.scale.x === 1) {
        tween = game.add.tween(popupTip1.scale).to({ x: 0.3, y: 0.3 }, 1000, Phaser.Easing.Elastic.In, true);
        return;
    }
    //if image is hidden, pops it up
    tween = game.add.tween(popupTip1.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
}

function goLevel1(){
    console.log("going to level 1...");
    game.sound.stopAll();
    this.game.state.start('playGame', true, false, playerName);
}

