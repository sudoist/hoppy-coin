class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // this.load.image('sky', '/assets/bg/phaser-planet-small.png');
        // this.load.image('sky2', '/assets/bg/sky.png');
        // this.load.image('ground', '/assets/objects/platforms/platform.png');
        // this.load.image('star', '/assets/objects/star.png');
        // this.load.image('bomb', '/assets/objects/bomb.png');
    }

    create() {
        this.add.image(400, 300, 'sky2');
        this.add.image(400, 300, 'sky');

        let logo = this.add.image(400, 100, 'logo')
        logo.setScale(.5)


        this.add.text(100, 50, "ⒽⓄⓅⓅⓎ",
            {
                fontSize: '40px',
                fill: '#FFF'
            })

        this.add.text(500, 50, "ⒸⓄⒾⓃ",
            {
                fontSize: '40px',
                fill: '#FFF'
            })



        // The platforms group contains the ground and the 2 ledges we can jump on
        let platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');


        let player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // Colliders
        this.physics.add.collider(player, platforms);

        // this.scene.start('Preloader')

        // init.fadeOutScene('Preloader', this)
    }
}