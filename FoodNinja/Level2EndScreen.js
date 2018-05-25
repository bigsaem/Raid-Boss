
var playerScore;
var playerName;
var level;
var goBack;
var leaderboard;
var music;
var popupTip3;
var tempScore;
var nextLevel;

var level2EndState = {

    init: function (name, score) {
        console.log("inside endscreen, passed score is: " + score);
        music = game.add.audio('finalStageBGM');
        music.loop = true;
        music.play();

        playerScore = score;
        level = stageLevel;
        playerName = name;

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 

        var titleText = game.add.text(game.world.centerX, 100, "Congrats, you have made it to the final level", {
            font: '17pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        var nextLine = game.add.text(game.world.centerX, 230, "Foods will come in all directions at various speeds.", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLine.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLine.anchor.set(0.5);

        nextLevel = game.add.text(game.world.centerX, 450, "Click to proceed to the final level", {
            font: '23pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        nextLevel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        nextLevel.anchor.set(0.5);
        nextLevel.inputEnabled = true;

        popupTip3 = game.add.sprite(game.world.centerX, 320, 'tip3');
        popupTip3.alpha = 0.8;
        popupTip3.anchor.set(0.5);
        popupTip3.inputEnabled = true;
        popupTip3.input.enableDrag();
        popupTip3.scale.set(0.3);
    },

    create: function () {
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            console.log("clicked inside tutorial end screen update");
            //this.game.state.start('playGame');
        }
        
        popupTip3.events.onInputDown.add(showTip);
        nextLevel.events.onInputDown.add(goToLevel3);
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

function showTip(){
    console.log("showing tip");
    //if image is already showing, hide it again.
    if ((tween !== null && tween.isRunning) || popupTip3.scale.x === 1) {
        tween = game.add.tween(popupTip3.scale).to({ x: 0.3, y: 0.3 }, 1000, Phaser.Easing.Elastic.In, true);
        return;
    }
    //if image is hidden, pops it up
    tween = game.add.tween(popupTip3.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
}

function goToLevel3(){
    console.log("going to level 3...Score thus far is: " + playerScore);
    //game.sound.stopAll();
    this.game.state.start('level3', true, false, playerName, playerScore);
}

