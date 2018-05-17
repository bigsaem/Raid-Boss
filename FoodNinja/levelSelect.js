/*Global Variables defined here*/
var popuplevel0;
var popuplevel1;
var titleText;
var level0Text;
var level1Text;
var playerName;


var levelSelectState = {

    init: function () {
        music = game.add.audio('gameOverBGM');
        music.loop = true;
        music.play();

        game.add.sprite(0, 0, 'menu-bg'); //adds the bg menu loading screen image 

        titleText = game.add.text(game.world.centerX, 100, "Level Select", {
            font: '20pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText.anchor.set(0.5);

        level0Text = game.add.text(100, 230, "Tutorial Stage", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        level0Text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        level0Text.anchor.set(0.5);
        level0Text.inputEnabled = true;

        level1Text = game.add.text(350, 230, "Level 1", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        level1Text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        level1Text.anchor.set(0.5);
        level1Text.inputEnabled = true;

        level2Text = game.add.text(600, 230, "Level 2", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        level2Text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        level2Text.anchor.set(0.5);
        level2Text.inputEnabled = true;

        level3Text = game.add.text(850, 230, "Level 3", {
            font: '10pt heroes_legendregular',
            fill: '#FDFFB5',
            align: 'center'
        });
        level3Text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        level3Text.anchor.set(0.5);
        level3Text.inputEnabled = true;

        warning = game.add.text(300, 380, 'Note: Your max score will be reduced if you skip levels!', {
            fontSize: '17px',
            fill: '#FDFFB5',
        });
        warning.inputEnabled = true;

        goBack = game.add.text(460, 450, 'Return to Menu', {
            fontSize: '20px',
            fill: '#FDFFB5',
        });
        goBack.inputEnabled = true;

        /* popuplevel0 = game.add.sprite(250, 320, 'sky2');
        popuplevel0.alpha = 0.8;
        popuplevel0.anchor.set(0.5);
        popuplevel0.inputEnabled = true;
        popuplevel0.input.enableDrag();
        popuplevel0.scale.set(0.1);

        popuplevel1 = game.add.sprite(550, 320, 'sky');
        popuplevel1.alpha = 0.8;
        popuplevel1.anchor.set(0.5);
        popuplevel1.inputEnabled = true;
        popuplevel1.input.enableDrag();
        popuplevel1.scale.set(0.1); */
    },

    create: function () {
        //nothing to create in this state.
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            console.log("clicked inside tutorial end screen update");
            //this.game.state.start('playGame');
        }
        
        //popuplevel0.events.onInputDown.add(showlevel, this);
        //popuplevel1.events.onInputDown.add(showlevel, this);

        level0Text.events.onInputDown.add(goLevel0);
        level0Text.events.onInputOver.add(hover, this);
        level0Text.events.onInputOut.add(hoverOut, this);

        level1Text.events.onInputDown.add(goLevel1);
        level1Text.events.onInputOver.add(hover, this);
        level1Text.events.onInputOut.add(hoverOut, this);

        level2Text.events.onInputDown.add(goLevel2);
        level2Text.events.onInputOver.add(hover, this);
        level2Text.events.onInputOut.add(hoverOut, this);

        level3Text.events.onInputDown.add(goLevel3);
        level3Text.events.onInputOver.add(hover, this);
        level3Text.events.onInputOut.add(hoverOut, this);

        goBack.events.onInputDown.add(goToMainMenu);
        goBack.events.onInputOver.add(hover, this);
        goBack.events.onInputOut.add(hoverOut, this);

      
    }
}

function hover(text) {
    text.fill = "#00FF00";
}

function hoverOut(text) {
    text.fill = '#FDFFB5'
}

function showlevel(popup){
    console.log("showing level");
    //if image is already showing, hide it again.
    if ((tween !== null && tween.isRunning) || popup.scale.x === 1) {
        tween = game.add.tween(popup.scale).to({ x: 0.1, y: 0.1 }, 1000, Phaser.Easing.Elastic.In, true);
        return;
    }
    //if image is hidden, pops it up
    tween = game.add.tween(popup.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
}

function goLevel0(){
    game.sound.stopAll();
    this.game.state.start('playTutorial', true, false, undefined, 0);
}

function goLevel1(){
    game.sound.stopAll();
    this.game.state.start('playGame', true, false, undefined, 0);
}

function goLevel2(){
    var prompt = window.prompt("Please enter your name", "Player");
    playerName = prompt;
    while (playerName.length > 9){
        prompt = window.prompt("Your name cannot exceed 9 characters", "Player");
        playerName = prompt;
    }

    console.log("name is: " + playerName);
    game.sound.stopAll();
    this.game.state.start('level2', true, false, playerName, 0);
}

function goLevel3(){
    var prompt = window.prompt("Please enter your name", "Player");
    playerName = prompt;
    while (playerName.length > 9){
        prompt = window.prompt("Your name cannot exceed 9 characters", "Player");
        playerName = prompt;
    }

    console.log("name is: " + playerName);
    game.sound.stopAll();
    music = game.add.audio('finalStageBGM');
        music.loop = true;
        music.play();
    this.game.state.start('level3', true, false, playerName, 0);
}

function goToMainMenu(){
    game.sound.stopAll();
    this.game.state.start('MainMenu');
}
