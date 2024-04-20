class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Backgrounds
        this.load.image('sky', '/assets/bg/sky.png');
        this.load.image('planet', '/assets/bg/phaser-planet-small.png');
        this.load.image('ground', '/assets/objects/platforms/platform.png');
        this.load.image('star', '/assets/objects/star.png');
        this.load.image('bomb', '/assets/objects/bomb.png');
        this.load.spritesheet('dude', '/assets/players/dude.png', { frameWidth: 32, frameHeight: 48 });

        // Logos
        this.load.image('phaser', '/assets/logos/phaser.png')
        this.load.image('sudoist', '/assets/logos/sudoist.png')
        this.load.image('logo', '/assets/logos/logo.png')
        this.load.image('github', '/assets/logos/github-mark.png')
        this.load.image('github-white', '/assets/logos/github-mark-white.png')

        // Buttons
        this.load.image('arcade', '/assets/buttons/arcade.png')
        this.load.image('ranked', '/assets/buttons/ranked.png')

        // Music
        this.load.audio('intro', '/assets/music/Intro Theme.mp3')
    }

    create() {
        init.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };

        this.scene.start('Preloader')
    }
}