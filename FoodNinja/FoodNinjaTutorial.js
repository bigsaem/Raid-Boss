//The main game code that deafs with the actual gameplay. Full comments are provided cuz i get confused.

//Constants cuz magic numbers are awful to debug with, thanks Bruce
var playerGravity = 1000;
var foodGravity = 200;
var playerVelocity = 500;
var playerNegativeVelocity = -500;
var jumpVelocity = -600;
var doubleJumpVelocity = -500;
var fastFall = 2000; //have to hard code for some reason...
var foodGravityX = 0; //default: food doesnt move horizontally
var foodGravityXSuction = 50; //for special ability use only
var numberOfBuffs = 3; //this is the number of buffs in the game: add one to this when you add a new buff
var comboRequirement = 2; //this sets the # of conseuctive food collects you need to get a combo
var foodSpawnDelay = 2; //in seconds: 1 food spawn per second
var maxFoods = 50; //max number of food spawn in this level

//other variables
var player; //defines the player object
var playerName;
var platforms;  //defines the platform groups (made into a group so can add more later)
var cursors; //defines the keyboard cursors.
var gn = new GyroNorm();  //mobile tilt

var food;   //array of food sprites
food = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

var stageLevel = 0 //level 0
var hp = 10;
var combos = 0; //keeps track of conseuctive grabs
var heatCheck = 0; //keeps track of 'streaks' 
var index = 0;  //used to go through the food array
var score = 0;  //each food grabbed = 1 point
var scoreText;  //displays the score in text
var hitPlatform; //hitPlatform = true if player hit a platform
var jump=0; //used to keep track of single/double jumps
var count = 0; //used to keep track the amount of foods that were caught or fell down on the ground -> used to determine when game ends

var levelText;
var comboText ="";
var buffText = "";
var buff = "";

var mobileDevice = false;  //assumes user is playing on laptop...

//calls the isMobile function and sets mobileDevice to true if it is mobile device. 
if (isMobile()){
    console.log("in mobile!")
    mobileDevice = true;
}

var tutorialState  = {

    init: function(name){
        playerName = name;
        console.log("in game name:" + playerName);
    },

    preload: function() {
        //nothing to preload in this state.
    },

    create: function() {

        //  Enables physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Creates the background for the game.
        var sky = game.add.sprite(0, 0, 'sky2');

        platforms = game.add.group();
        //  Enables physics for any object that is created in this group
        platforms.enableBody = true;

        //Create the ground.
        var ground = platforms.create(0, game.world.height - 30, 'ground');

        //  Scale ground and sky to fit the screen of the game.
        ground.scale.setTo(3, 2);
        sky.scale.setTo(2,1);

        //  This stops the ground from moving when it collides 
        ground.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'blob');
        player.scale.setTo(1,1);

        //  enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.0001;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
       // player.animations.add('left', [0, 1, 2, 3], 10, true);
       // player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        game.input.onTap.add(onTap, this);

        //this repeatedly spawns 50 food sprites in 1 second intervals
        game.time.events.repeat(Phaser.Timer.SECOND * 1.5, 10, spawnFood, this);
        
        //Creates score text
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });

        //Creates hp text
        hpText = game.add.text(50, 50, 'HP: ' + hp, { fontSize: '20px', fill: '#000' });

        //Creates level text for tutorial
        levelText= game.add.text(370, 16, 'Tutorial Stage: 10 foods', { fontSize: '32px', fill: '#000' });

        //Combo text
        comboText: game.add.text(850, 16, 'Combos: ' + combos, { fontSize: '20px', fill: '#000' });

        //Buff text
        buffText: game.add.text(850, 50, 'Buffs: ' + buff, { fontSize: '20px', fill: '#000' });

        //Initiazes controls.
        cursors = game.input.keyboard.createCursorKeys();
        

    },

    update: function() {
        if (game.pause == true){
            return;
        }
        gn.init().then(function(){
            gn.start(function(data){
                // Process:
                // data.do.alpha	( deviceorientation event alpha value )
                // data.do.beta		( deviceorientation event beta value )
                // data.do.gamma	( deviceorientation event gamma value )
                // data.do.absolute	( deviceorientation event absolute value )

                // data.dm.x		( devicemotion event acceleration x value )
                // data.dm.y		( devicemotion event acceleration y value )
                // data.dm.z		( devicemotion event acceleration z value )

                // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
                // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
                // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

                // data.dm.alpha	( devicemotion event rotationRate alpha value )
                // data.dm.beta		( devicemotion event rotationRate beta value )
                // data.dm.gamma	( devicemotion event rotationRate gamma value )
                //alert(data.dm.alpha + ", " + data.dm.beta + ", " + data.dm.gamma);
                if (data.dm.gx < -0.5){
                    player.body.velocity.x = -playerVelocity;
                    //player.body.acceleration.x= -200;
                   // player.animations.play('left');
                }
                else if (data.dm.gx > 0.5){
                    player.body.velocity.x = playerVelocity;
                    //player.body.acceleration.x= 200;
                   // player.animations.play('right');
                }
                else if (isMobile) {
                   // player.animations.stop();
                    //player.frame = 4;
                }

                /*scoreText.text = 'Score: ' + data.dm.alpha + ", " + data.dm.beta + ", " + data.dm.gamma 
                +" || " + data.do.alpha + ", " + data.do.beta + ", "  + data.do.gamma 
                +" || " + data.dm.x + ", " + data.dm.y + ", "  + data.dm.z
                +" || " + data.dm.gx + ", " + data.dm.gy + ", "  + data.dm.gz; */
            });
        }).catch(function(e){
        // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
            console.log("failed gyro");
        }); 

        //  Collide the player and the foods with the platforms
        hitPlatform = game.physics.arcade.collide(player, platforms);

        //Checks if the food hits the ground, if so, removes the food.
        var foodHitPlatform; 
        var position;
        for (var i = 0; i< food.length; i++){
            footHitPlatform = game.physics.arcade.collide(food[i], platforms);
            if (footHitPlatform){
                    food[i].kill();
                    count++;
                    hp--;
                    combos = 0;
                    heatCheck = 0;
            }
        }

        //  Checks to see if the player overlaps with any of the foods, if it does, collect fruit
        game.physics.arcade.overlap(player, food, collectFood, null, this);
        
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        
        //mobile tap jump
        if (cursors.up.isDown) {
            if (player.body.touching.down && hitPlatform){
                    if (player.body.velocity.y < 0 ){
                        player.body.velocity.y = jumpVelocity;
                        var music = game.sound.play("jump");
                        console.log ("touch jump");
                        jump = 1;
                    }
            }
            else if (!player.body.touching.down && !hitPlatform){
                if (player.body.velocity.y > 0 && jump == 1){
                    player.body.velocity.y = doubleJumpVelocity;
                    var music = game.sound.play("doubleJump");
                    console.log("touch double jump");
                    jump = 0;
                }
            }
        } 

        //failed attempt at multi touch
      /*  if (game.input.pointer1.up.isDown &&game.input.pointer2.up.isDown ) {

            if (!player.body.touching.down && !hitPlatform){
              
                    player.body.velocity.y = 2000;
                    console.log("fast fall");
                
            }
        } */
        
        if (mobileDevice == true){
        }

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -playerVelocity;
            player.body.acceleration.x= 4;

          //  player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = playerVelocity;

          //  player.animations.play('right');
        }
        else if (!isMobile) {
            //  Stand still
            //player.animations.stop();
            player.frame = 4;
        }

        //fast fall for pc
        if (cursors.down.isDown && !player.body.touching.down && !hitPlatform){
            player.body.velocity.y = 2000;
        }
        
        ///////////////////////////CHANGE COUNT TO 10 LATER... CHANGED FOR TESTING////////////////////////
        //game over check, remove this later
        if (count == 10){
            var tempScore = score;
            //game.pause = true; //uncommenting this will 'get the char' stuck
            score = 0;
            hp = 10;
            count = 0;
            index = 0;
            jump = 0;
            //finalScore = game.add.text(300, 300, 'Your score is: ' + score, { fontSize: '32px', fill: '#000' });
            console.log("progressing to end screen");
            //game.time.events.repeat(Phaser.Timer.SECOND * 1, 1, goToTutorialEndScreen, this);
            //this.game.state.start('showTutorialEndScreen', true, false, tempScore, stageLevel, playerName);
            game.time.events.repeat(Phaser.Timer.SECOND * 1, 1, goToTutorialEndScreen, this);
        }

          //updates combo/buff texts
          comboText.text = 'Combos: ' + combos;
          buffText.text = 'Buffs: ' + buff;
          hpText.text = 'HP: ' + hp;

        //game over if hp = 0
        /*if (hp == 0){
            console.log("you ran out of lives");
            var tempScore = score;

            //reset values to prepare for new game
            score = 0;
            hp = 10;
            count = 0;
            index = 0;
            jump = 0;

            this.game.state.start('showGameOver', true, false, tempScore, stageLevel, playerName);
        } */

           /*If player meets comboRequirement, active Grow buff.*/
        if (combos == comboRequirement){
            switch(heatCheck) {
                case(0):
                    console.log("comboed, but heatcheck = 0")
                    hp++;
                    heatCheck++;
                    enlarge(player);
                    game.time.events.add(Phaser.Timer.SECOND * 3, delarge, this);
                    combos = 0;
                    break;
                case (1):
                console.log("comboed, but heatcheck = 1")
                    heatCheck++;
                    combos = 0;
                    break;
                default:
                    console.log("default case...");

            }

        }
    }
}

function collectFood(player, food) {

    food.kill();
    score += 1;
    combos++;
    scoreText.text = 'Score: ' + score;
}

/*Spawns a tutorial level food Object. */
function spawnFood(){
    
    console.log("inside tutorial spawn food");
    var min = 0;
    var max = 900;
    var randomX;
    var randomIndex;

    //var food = foods.create(i * 70, 0, 'foods');
    randomX = Math.random() * max + min;
    randomIndex = Math.round(Math.random() * 48);
    food[index] = game.add.sprite(randomX, 0, 'foods', randomIndex);

    game.physics.arcade.enable(food);
    
    console.log("inside loop");
    //game.physics.arcade.gravity.y = 200;

    //  Let gravity do its thing
    food[index].body.gravity.y = foodGravity;
    
    //  Lets the food bounce, for easy mode LOL
    food[index].body.bounce.y = 0.7 + Math.random() * 0.2;

    index++;
    if (index == 20){
        index = 0;
    }
    

}

/*When the user performs a tap action, make the player jump or double jump.*/
function onTap(pointer, doubleTap) {  
    if (!doubleTap){
        console.log("single tap");
            if (player.body.touching.down && hitPlatform){
                if (player.body.velocity.y < 0 ){
                    player.body.velocity.y = jumpVelocity;
                    var music = game.sound.play("jump");
                    jump = 1;
                }
            }
            else if (!player.body.touching.down && !hitPlatform){
                if (player.body.velocity.y > 0 && jump == 1){
                    player.body.velocity.y = doubleJumpVelocity;
                    var music = game.sound.play("doubleJump");
                    jump = 0;
                }
            }
            
        }
}

function enlarge(player){
    console.log("enlarging player...");
    player.body.y = game.world.height - 200;
    player.scale.setTo(3,3);
    player.body.gravity.y = player.body.gravity.y * 1.5;
    if (!player.body.touching.down){
        console.log("not in air");
        player.body.y = game.world.height - 200;
    }
    buff = "Grow!";
}

function delarge(){
    console.log("enlarging player...");
    player.scale.setTo(1,1);
    player.body.gravity.y = player.body.gravity.y / 2;
    if (!player.body.touching.down){
        console.log("not in air");
        player.body.y = game.world.height - 200;
    }
    buff = "";
}

/*Switches to the tutorial end screen state, passing in the current score and player name as parameters.*/
function goToTutorialEndScreen(){
    console.log("passing score to tutorial end screen: " + tempScore)
    this.game.state.start('showTutorialEndScreen', true, false, tempScore, stageLevel, playerName);
}

/*Checks if the user is playing on a device with a touchscreen: This will usually be a mobile device.*/
function isMobile() { 
    return ('ontouchstart' in document.documentElement);
}
