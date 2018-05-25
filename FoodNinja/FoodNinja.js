//The main game code that deals with the actual gameplay. THIS IS LEVEL 1. Added a lot of comments for easy tracking,
//also because otherwise it gets too confusing lol

//Constants cuz magic numbers are awful to debug with, thanks Bruce
//////////////DIFFICULTY ADJUSTMENT: Changing some of these constants is the easiest way to adjust difficulty to meet your needs///////////////////////
//Positive number: going right/down.  Negative number: going left/up.
var playerGravity = 1000; //player's acceleration towards ground
var foodGravity = 200;
var playerVelocity = 500; //player's horizontal movement velocity (constant, no acceleration);
var playerNegativeVelocity = -500;
var jumpVelocity = -600; //player's jump velocity
var doubleJumpVelocity = -500;
var fastFall = 2000; //have to hard code for some reason...
var foodGravityX = 0; //default: food doesnt move horizontally
var foodGravityXSuction = 50; //for special ability use only
var numberOfBuffs = 3; //this is the number of buffs in the game: add one to this when you add a new buff
var comboRequirement = 2; //this sets the # of conseuctive food collects you need to get a combo
var foodSpawnDelay = 1; //in seconds: 1 food spawn per second
var maxFoods = 50; //max number of food spawn in this level

//Other global variables that are used in more than one function are initiaized here
var timer;
var player; //defines the player object
var playerName;
var platforms;  //defines the platform groups (made into a group so can add more later)
var cursors; //defines the keyboard cursors.
var gn = new GyroNorm();  //mobile tilt: creates object that tracks gyro movement

var food;   //array of food sprites
food = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//food = new Array(20);

var stageLevel = 1 //level 1
var hp = 10; //keep it low during testing
var combos = 0; //keeps track of conseuctive grabs
var heatCheck = 0; //keeps track of 'streaks' 
var index = 0;  //used to go through the food array
var score = 0;  //each food grabbed = 1 point
var tempScore=0; //temp used to hold the score so the score can reset.
var scoreText;  //displays the score in text
var hitPlatform; //hitPlatform = true if player hit a platform
var jump=0; //used to keep track of single/double jumps
var count = 0; //used to keep track the amount of foods that were caught or fell down on the ground -> used to determine when game ends

var buff = "";
var levelText;
var comboText;
var buffText;
var pauseButton;

var mobileDevice = false;  //Initially, we assume the user is not playing on a mobile device

//calls the isMobile function and sets mobileDevice to true if it is mobile device. 
if (isMobile()){
    console.log("in mobile!")
    mobileDevice = true;
}

//this is wat is called through menuState
var playState  = {

    init: function(name){
        playerName = name;
        console.log("in game name:" + playerName);
    },

    preload: function() {
        //Nothing to preload in this state.
    },

    create: function() {

        console.log("maxFoods is: " + maxFoods);
        //  Enables physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Creates the background for the game.
        var sky = game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        //  Enables physics for any object that is created in this group
        platforms.enableBody = true;

        //Create the ground.
        var ground = platforms.create(0, game.world.height-30, 'ground');

        //  Scale ground and sky to fit the screen of the game.
        ground.scale.setTo(3, 1);
        sky.scale.setTo(2,1);

        //  This stops the ground from moving when it collides 
        ground.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'blob');

        //  enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.001;
        player.body.gravity.y = playerGravity;
        player.body.collideWorldBounds = true;

        //  The two animations, walking left and right.
       // player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        game.input.onTap.add(onTap, this);

        //this repeatedly spawns 50 food sprites in 1 second intervals
        timer = game.time.events;
        timer.repeat(Phaser.Timer.SECOND * 1, 50, spawnFood, this);
        
        //Creates score text
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });

        //Creates hp text
        hpText = game.add.text(16, 50, 'HP: ' + hp, { fontSize: '20px', fill: '#000' });

        //Creates level text for tutorial
        levelText= game.add.text(400, 16, 'Stage 1: 50 foods', { fontSize: '32px', fill: '#000' });

        //Combo text
        comboText = game.add.text(850, 16, 'Combos: ' + combos, { fontSize: '20px', fill: '#000' });

        //Buff text
        buffText = game.add.text(850, 50, 'Buffs: ', { fontSize: '20px', fill: '#000' });

        //Pause button
       /* pauseButton = game.add.text(1000,16, 'Pause', { fontSize: '17px', fill: '#FF0000'});
        pauseButton.inputEnabled = true;
        pauseButton.events.onInputDown.add(showPauseMenu); */

        //Initiazes controls.
        cursors = game.input.keyboard.createCursorKeys();
        

    },

    update: function() {
        console.log("count is: " + count);
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
                   // player.animations.play('left');
                }
                else if (data.dm.gx > 0.5){
                    player.body.velocity.x = playerVelocity;
                   // player.animations.play('right');
                }
                else if (isMobile) {
                    player.animations.stop();
                    //player.frame = 4;
                }

                //Testing gyro rotation...
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
        
        //mobile tap jump AND keyboard jump
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

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -playerVelocity;
            player.animations.play('left');
        }

        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = playerVelocity;
            player.animations.play('right');
        }

        else if (!isMobile) {
            //Makes player come to a standstill.
            player.animations.stop();
            player.frame = 4;
        }

        //fast fall loop for non-mobile devices
        if (cursors.down.isDown && !player.body.touching.down && !hitPlatform){
            console.log("fast fall: " + fastFall);
            player.body.velocity.y = 2000;
            console.log("fast falling...");
        }

        //updates combo/buff/hp texts
        comboText.text = 'Combos: ' + combos;
        buffText.text = 'Buffs: ' + buff;
        hpText.text = 'HP: ' + hp;
        
        //game over check, remove this later
        if (count == maxFoods){
            console.log("count = 50");
            hp = 10; //remember i set hp above to 3, so first load, hp = 3, after that, hp = 10, for testing...
            count = 0;
            index = 0;
            jump = 0;
            finalScore = game.add.text(300, 300, 'Your current score is: ' + score, { fontSize: '32px', fill: '#000' });
            game.time.events.repeat(Phaser.Timer.SECOND * 3, 1, goToLevel1EndScreen, this); //after 5 second, transition screens!

        }

        //game over if hp = 0
        if (hp == 0){
            console.log("you ran out of lives");
            tempScore = score;

            //reset values to prepare for new game
            score = 0;
            hp = 10; //remember i set hp above to 3, so first load, hp = 3, after that, hp = 10, for testing...
            count = 0;
            index = 0;
            jump = 0;

            this.game.state.start('showGameOver', true, false, playerName, tempScore); //test!
        }

        /*If player meets comboRequirement, choose a random buff to activate.*/
        if (combos >= comboRequirement){
            var rand = Math.round(Math.random() * numberOfBuffs) + 1; //randoms an integer to pick which buff should be applied
            console.log("random number is:" + rand);
            switch(heatCheck) {
                case(0):
                    console.log("comboed, but heatcheck = 0")
                    hp++;
                    heatCheck++;
                    chooseBuff(rand);
                    combos = 0;
                    break;
                case (1):
                console.log("comboed, but heatcheck = 1")
                    //heatCheck++;
                    hp++;
                    chooseBuff(rand);
                    combos = 0;
                    heatCheck = 0;
                    break;
                default:
                    combos =0;
                    heatCheck = 0;
                    console.log("default case...");

            }
        }
    }
}

/*Updates various stats once the player has collected a food.*/
function collectFood(player, food) {

    food.kill();
    score += 1;
    count++;
    combos++;
    scoreText.text = 'Score: ' + score;
}

/*Spawns a level 1 food Object. */
function spawnFood(){
    
    var min = 0;
    var max = 900;
    var randomX;
    var randomIndex;

    randomX = Math.random() * max + min;
    randomIndex = Math.round(Math.random() * 48);
    
    /*10% chance to spawn an easter egg as food.*/
    if (Math.random() < 0.1){
        if (Math.random < 0.5){
            food[index] = game.add.sprite(randomX, 0, 'egg2',0);
        }
        else{
            food[index] = game.add.sprite(randomX, 0, 'egg1',0);
        }
    }
    else {
        food[index] = game.add.sprite(randomX, 0, 'foods', randomIndex);
    }

    game.physics.arcade.enable(food);

    food[index].body.gravity.y = foodGravity;
    
    //  Lets the food bounce, for easy mode.
    food[index].body.bounce.y = 0.7 + Math.random() * 0.2;

    if (food[index].x < player.body.x){
        food[index].body.gravity.x = foodGravityX;
    }
    else if(food[index].x > player.body.x) {
        food[index].body.gravity.x = -foodGravityX;
    }

    //this is so that we dont have to make the food array super long, just replace old food (Store up to 20 and replace);
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
                    player.body.velocity.y = -600;
                    jump = 1;
                }
            }
            else if (!player.body.touching.down && !hitPlatform){
                if (player.body.velocity.y > 0 && jump == 1){
                    player.body.velocity.y = -350;
                    jump = 0;
                }
            }
            
        }
}

/*Increases player size by 3 times, and gravity by 1.5x.*/
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

/*Returns player size and gravity to normal.*/
function delarge(){
    console.log("delarging player...");
    player.scale.setTo(1,1);
    player.body.gravity.y = player.body.gravity.y / 1.5;
    if (!player.body.touching.down){
        console.log("not in air");
        player.body.y = game.world.height - 200;
    }
    buff = "";
}

/*Boosts player speed by 1.5x. */
function speedBoost(){
    console.log("boosting speed");
    playerVelocity = playerVelocity * 1.5;
    playerNegativeVelocity = playerNegativeVelocity * 1.5;
    buff = "1.5x Speed!";
}

/*Returns player speed to normal.*/
function normalSpeed(){
    console.log("returning player to normal speed");
    playerVelocity = playerVelocity / 1.5;
    playerNegativeVelocity = playerNegativeVelocity / 1.5;
    buff = "";
}

/*Slows the gravity of the food objects by half.*/
function slowFood(){
    console.log("slowing food speed");
    foodGravity = foodGravity / 2;
    buff = "Slow Time!";
}

/*Returns food gravity to normal.*/
function normalFoodSpeed(){
    console.log("returning food to normal speed");
    foodGravity = foodGravity * 2;
    buff = "";
}

/*Unused function, to be implemented later: Buff that reverses food gravity.*/
function foodReverseGravity(){
    foodGravity = foodGravity * -1;
}

/*Enables Food Suction buff.*/
function foodSuctionOn(){
    foodGravityX = foodGravityXSuction;
    buff = "Suction!";
}

/*Removes Food Suction buff. */
function foodSuctionOff(){
    foodGravityX = 0;
    buff = "";
}

/*Takes a random number, and uses that number to decide which buff to active. */
function chooseBuff(number){
    var music = game.sound.play('buffed');
    switch(number) {
        case(1):
            console.log("randomed enlarge buff...");
            enlarge(player);
            game.time.events.add(Phaser.Timer.SECOND * 5, delarge, this);
            combos = 0;
            break;
        case(2):
            console.log("randomed player speed buff...");
            speedBoost();
            game.time.events.add(Phaser.Timer.SECOND * 5, normalSpeed, this);
            combos = 0;
            break;
        case(3):
            console.log("randomed slow food buff...");
            slowFood();
            game.time.events.add(Phaser.Timer.SECOND * 6, normalFoodSpeed, this);
            combos = 0;
            break;
        case(4):
            console.log("randomed food suction buff...");
            foodSuctionOn();
            game.time.events.add(Phaser.Timer.SECOND * 5, foodSuctionOff, this);
            combos = 0;
            break;
    }
}

/*Displays the pause menu and pauses the game. Contains an innue function to unpause. Currently unused. */
function showPauseMenu(){
    for (var i = 0 ; i < food.length; i++){
        console.log (food[i] + ", ")

        console.log("is it alive: " + food[i].alive);
    }
    game.pause = true;
    var locationy = player.y;
    var locationx = player.x;
    var foodVelocities; 
    var foodGravities;
    for (var i = 0; i < food.length; i++){
        console.log ("in if loop? " + ((!(food[i].alive == false)) && typeof food[i] !== "number"));
        if ((food[i].alive === true)) {
            foodVelocities[i] = food[i].body.velocity;
            foodGravities[i] = food[i].body.gravity;
            food[i].body.velocity = 0;
            food[i].body.gravity = 0;
        }
    }

    timer.pause();
    var pauseMenu = game.add.text(450, 250, "Game Paused, Click to resume", { fontSize: '17px', fill: '#FF0000'});
    pauseMenu.inputEnabled = true;
    pauseMenu.events.onInputDown.add(function(){
        console.log("destroying menu");
        game.pause = false;
        player.y = locationy;
        player.x = locationx;

        for (var i = 0; i < food.length; i++){
            if (!(food[i].alive == false) && typeof food[i] !== "number") {
                food[i].body.velocity = foodVelocities[i];
                food[i].body.gravity = foodGravities[i];
            }
        }
        timer.resume();
        pauseMenu.text ="";
    });
    
}

/*Switches to the level 1 end screen state, passing in the current score and player name as parameters.*/
function goToLevel1EndScreen(){
    console.log("score being passed is: " + score);
    this.game.state.start('showLevel1EndScreen', true, false, playerName, score);
}

/*Checks if the user is playing on a device with a touchscreen: This will usually be a mobile device.*/
function isMobile() { 
    return ('ontouchstart' in document.documentElement); 
}