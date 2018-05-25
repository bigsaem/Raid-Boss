// load in assets and set up loading screen
var loadState = {
    preload: function(){

        //LOAD ALL ASSETS
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
       
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('menubg', 'assets/menu-bg.jpg');
        game.load.image('optionsbg', 'assets/options-bg.jpg');
        game.load.image('howtoplay', 'assets/howtoplay.jpg');
        game.load.image('tip1', 'assets/tips/Tip1.jpg');
        game.load.image('tip2', 'assets/tips/Tip2.jpg');
        game.load.image('tip3', 'assets/tips/Tip3.jpg');

        game.load.image("sky2", 'assets/sky2.png');
        game.load.image("space", 'assets/space.png');
        game.load.image("deepSpace", 'assets/deep-space.jpg');
        game.load.image('underwater', 'assets/underwater.png');
        game.load.image('toxic', 'assets/toxic.png');

        game.load.image("bomb", "assets/bomb.png"); //add bomb features later!
        game.load.spritesheet("foods2", "assets/newfoods.png", 64, 64); //CHANGE coordinats: use this instead of foods
        game.load.spritesheet("easterEggs", "assets/easteregg.png", 61.25, 75.33333); //CHANGE coordinats

        game.load.image("egg1", 'assets/egg.png');
        game.load.image("egg2", 'assets/egg2.png');

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48); //32,48 for the dude, 130.222, 78
        game.load.spritesheet('blob', 'assets/blob.png', 52, 52);
        game.load.spritesheet('foods', 'assets/foodtest.png', 68.375, 68.57142857);
        game.load.image('menu-bg', 'assets/wilderness.jpg');
        game.load.bitmapFont('titleFont', 'assets/fonts/titleFont.png', 'assets/fonts/titleFont.fnt');
        
        game.load.image('closeButton', 'assets/closebutton.png'); //unused

        game.load.audio("menuBGM", "assets/bgm/pillai.mp3");
        game.load.audio("gameOverBGM", "assets/bgm/login.mp3");
        game.load.audio("roshanBGM", "assets/bgm/roshan.mp3");
        game.load.audio("finalStageBGM", "assets/bgm/finalLevel.mp3");
        game.load.audio("level2BGM", "assets/bgm/level2.mp3");

        game.load.audio("jump", "assets/soundeffects/jump.wav");
        game.load.audio("doubleJump", "assets/soundeffects/doubleJump.wav");
        game.load.audio("buffed", "assets/soundeffects/buffed.mp3");
    },
    
    create:function() {
        this.state.start('MainMenu');
    }
}

