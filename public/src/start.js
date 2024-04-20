// let boot = new Boot()

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
            gravity: { y: 300 },
            debug: true
        }
    },
    // scene: [Boot]
    // scene: [Boot, Preloader, MainMenu, Settings, Story, Game]
    // scene: [Boot]
    scene: [Boot, Preloader, MainMenu]
}
game = new Phaser.Game(gameConfig);
// game.scene.add('Boot', boot)
// game.scene.start('Boot')
window.focus();
