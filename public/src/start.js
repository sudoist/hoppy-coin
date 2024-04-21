let gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        }
    },
    transparent: true, // Set transparent to true
    scene: [Boot, Preloader, MainMenu, Game]
}
game = new Phaser.Game(gameConfig);
window.focus();
