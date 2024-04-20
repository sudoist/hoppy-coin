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

        // Add buttons
        // Initialize - Check how to remove this later
        // this.buttons = this.add.image(900, 900, 'ranked') // Fix or remove later
        this.buttons = this.physics.add.group()

        this.buttons.create(100, 200, 'ranked').setScale(.5).setName('ranked').setImmovable(false)
            .setCollideWorldBounds(true).body.allowGravity = false;
        this.buttons.create(700, 165, 'github').setScale(.2).setName('github').setImmovable(false).setCollideWorldBounds(true).body.allowGravity = false;
        this.buttons.create(700, 350, 'arcade').setScale(.5).setName('arcade').setImmovable(false).setCollideWorldBounds(true).body.allowGravity = false;

        console.log(this)


        // The platforms group contains the ground and the 2 ledges we can jump on
        let platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();


        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.selectMenu, null, this);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys()

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })


        // this.scene.start('Preloader')

        // init.fadeOutScene('Preloader', this)

        // this.sound.add('intro')
        // this.sound.play()

        this.add.text(200, 550, 'Move with W, A, S, D', {fontSize: '32px', fill: '#FFF'});



        this.add.text(50, 150, 'Coming soon..', {fontSize: '24px', fill: '#FFF'});

        this.titleMusic = this.sound.add('intro', {volume: 1, loop: true});
        this.titleMusic.play()
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    selectMenu(player, menu) {



        // this.physics.pause()
        // console.log(menu)
        console.log(menu.name)
        // this.physics.pause();
        //
        // player.setTint(0xff0000);
        //
        // player.anims.play('turn');
        //
        // gameOver = true;

        if (menu.name === 'github') {
            let URL = 'https://github.com/sudoist/hoppy-coin'
            window.open(URL, '_blank');
            menu.disableBody(true, true)
        }

        if (menu.name === 'ranked') {
            this.physics.pause()
            // window.location = '/play/index.html?name=SDO&mode=ranked'
            // this.scene.start('Game')
            this.titleMusic.stop()
            init.fadeInScene('Game', this)
        }

        if (menu.name === 'arcade') {
            this.physics.pause()
            // window.location = '/play'

            this.titleMusic.stop()

            // this.scene.start('Game')
            init.fadeInScene('Game', this)
        }
    }
}