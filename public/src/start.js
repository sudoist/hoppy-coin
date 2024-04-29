let mode = Phaser.Scale.FIT

if (init.isMobile()) {
    mode = Phaser.Scale.LANDSCAPE
}

let gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: mode,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    transparent: true, // Set transparent to true
    scene: [Boot, Preloader, Title, MainMenu, Arcade, RankedName, StageSelection, Ranked, LeaderBoard, Tutorial]
}
game = new Phaser.Game(gameConfig);
window.focus();
