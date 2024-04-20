let init = {}

let player;
let playerName;
let stars;
let bombs;
let sky;
let skyIndex = 1;
let platforms;
let cursors;
let score = 0;
let scoreText;
let gameOver = false;
let gameOverSound = true;
let stage = 1;
let stageText;
let instructions;
let instructionsText;
let sfx;
let music;
let muteButton;
let menuButton;
let playButton;
let arcadeButton;
let rankedButton;
let isMute = false;

init.fadeOutScene = function(sceneName, context) {
    context.cameras.main.fadeOut(1700)
    context.time.addEvent({
        delay: 1700,
        callback: function() {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}

init.fadeInScene = function(sceneName, context) {
    context.cameras.main.fadeIn(250)
    context.time.addEvent({
        delay: 250,
        callback: function() {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}
