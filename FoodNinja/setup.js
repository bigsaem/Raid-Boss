console.log("hi");

var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'Setup');

game.state.add('Boot', bootState);
game.state.add('Preloader', loadState);
game.state.add('MainMenu', menuState);
game.state.add("showLevelSelect", levelSelectState);
game.state.add('showLeaderBoard', leaderboard);
game.state.add('playTutorial', tutorialState);
game.state.add('showTutorialEndScreen', tutorialEndState);
game.state.add('playGame', playState);
game.state.add('showLevel1EndScreen', level1EndState);
game.state.add('level2',level2State);
game.state.add('showLevel2EndScreen', level2EndState);
game.state.add('level3',level3State);
game.state.add('showGameOver', gameOverState);
game.state.add("winGame", winGameState);
//game.state.add('Leaderboard', Game.Leaderboard);

console.log("starting mainmenu")
game.state.start('Boot');

