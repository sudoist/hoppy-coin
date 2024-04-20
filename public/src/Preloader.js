class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // this.load.image('sky', '/assets/bg/phaser-planet-small.png');
        // this.load.image('sky2', '/assets/bg/sky.png');
        // this.load.image('ground', '/assets/objects/platforms/platform.png');
        // this.load.image('star', '/assets/objects/star.png');
        // this.load.image('bomb', '/assets/objects/bomb.png');
        // this.load.spritesheet('dude', '/assets/players/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {



        this.add.image(400, 300, 'sky');

        // Logos
        let phaser = this.add.image(450, 300, 'phaser')
        phaser.setScale(.5)

        let sudoist = this.add.image(350, 300, 'sudoist')
        sudoist.setScale(.5)

        // The platforms group contains the ground and the 2 ledges we can jump on
        // let platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');

        // let player = this.physics.add.sprite(100, 450, 'dude');
        //
        // player.setBounce(0.2);
        // player.setCollideWorldBounds(true);

        // init.fadeOutScene('MainMenu', this)
        // init.fadeInScene('MainMenu', this)
    }
}