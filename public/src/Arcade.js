class Arcade extends Phaser.Scene {
    constructor() {
        super('Arcade')
    }

    preload() {
        // this.load.spritesheet('dude', '/assets/players/dude.png', {frameWidth: 32, frameHeight: 48})
        // this.load.spritesheet('piccolo', '/assets/players/piccolo.png', {frameWidth: 32, frameHeight: 48})
        // this.load.spritesheet('explode', '/assets/players/explode.png', {frameWidth: 32, frameHeight: 48})
        //

        this.load.image('sky1', '/assets/bg/sky.png');
        this.load.image('sky2', '/assets/bg/john-cosio-xCZ8ynsCfrw-unsplash.jpg');
        this.load.image('sky3', '/assets/bg/john-cosio-RxjSW-seIp0-unsplash.jpg');
        this.load.image('sky4', '/assets/bg/aleksandra-khaprenko-0PPw9irzLIw-unsplash.jpg');
        this.load.image('sky5', '/assets/bg/nathan-dumlao-kME9jbKd--s-unsplash.jpg');
        this.load.image('sky6', '/assets/bg/dan-asaki-K0mJQlbu9Yo-unsplash.jpg');
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select
        playerPositionX = 30
        playerPositionY = 360

        init.setupScene(this, init.randomizePlayerSprite())

        // document.getElementById('container').style.backgroundImage="url(/assets/bg/john-cosio-RxjSW-seIp0-unsplash.jpg)"
        // document.getElementById('container').style.backgroundImage="url(/assets/bg/sky.png)"
        // document.getElementById('container').style.backgroundSize="cover"
        // document.getElementById('container').style.backgroundRepeat="no-repeat"

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(200, 400, 'ground'); //good
        platforms.create(745, 250, 'ground'); // good
        platforms.create(60, 220, 'ground');

        // Add buttons
        let soundToggle = 'sound'
        if (isMute) {
            soundToggle = 'mute'
        }
        muteButton = this.add.image(770, 30, soundToggle)
            .setInteractive()
            .on('pointerdown', () => this.toggleSound())

        // The player and its settings (Moved to setupScene)

        //  Our player animations, turning, walking left and walking right. (Moved to setupScene)

        //  Our player animations, GAME OVER
        this.anims.create({
            key: 'eleft',
            frames: this.anims.generateFrameNumbers('explode', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'eturn',
            frames: [{key: 'explode', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'eturn',
            frames: [{key: 'explode', frame: 9}],
            frameRate: 20
        });

        this.anims.create({
            key: 'eright',
            frames: this.anims.generateFrameNumbers('explode', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events (Moved to setupScene)

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'coin',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'});

        //  The stage
        stageText = this.add.text(16, 46, 'Stage: 1', {fontSize: '32px', fill: '#FFF'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Instructions
        instructions = this.add.text(200, 550, 'Move with W, A, S, D', {fontSize: '32px', fill: '#fff'});

        // this.add.text(200, 550, 'Move with W, A, S, D', {fontSize: '32px', fill: '#FFF'});

        // Start game with bomb
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb-r');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

        // Audio
        sfx = this.cache.json.get('sfx');

        music = this.sound.add('start');
        music.play()

        // Add buttons after game over
        this.buttons = this.physics.add.group()

        menuButton = this.buttons.create(-20, 350, 'menu').setScale(.5).setName('menu').setImmovable(false)
            .body.allowGravity = false;

        // rankedButton = this.buttons.create(-30, 170, 'ranked').setScale(.5).setName('ranked').setImmovable(false)
        //     .body.allowGravity = false;

        arcadeButton = this.buttons.create(830, 500, 'arcade').setScale(.5).setName('arcade').setImmovable(false)
            .body.allowGravity = false;

        this.buttons.setVisible(false)

        // Game over texts
        // this.add.text(20, 130, '<- Ranked Game', {fontSize: '18px', fill: '#FFF'}) // Disable ranked from here
        this.add.text(20, 320, '<- Back to title', {fontSize: '18px', fill: '#FFF'})

        this.add.text(647, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF'})





        // platforms.create(200, 400, 'ground'); //good
        // platforms.create(745, 250, 'ground'); // good
        // platforms.create(60, 220, 'ground');
    }

    update() {
        // Sounds
        if (isMute) {
            game.sound.mute = true;
        } else {
            game.sound.mute = false;
        }

        if (gameOver) {

            // player.anims.play('turnZ')
            // player.anims.play('explode', true)

            // console.log(player)
            // console.log(player.anims)
            // console.log(player.anims.play('explode', true))
            // game.destroy()

            // menuButton.visible = true
            // rankedButton.visible = true
            // arcadeButton.visible = true

            // Change instructions
            // instructions.destroy()

            this.add.text(200, 120, 'Would you like to play again?', {fontSize: '24px', fill: '#FFF'});


            // game.destroy()

            console.log("game over")
            console.log(playerName)

            // Display buttons

            // menuButton.visible = truety = false

            console.log(menuButton)

            // playButton.visible = true

            // this.buttons.visible = true


            // game.pause()

            // Run one time on game ove
            if (gameOverSound) {


                // if (this.buttons instanceof Phaser.GameObjects.Group) {
                //     // Show the button group after delay to avoid hitting menu
                //     setTimeout(() => {
                //         this.buttons.setVisible(true);
                //     }, 1500);
                //
                //
                //
                    // Add menu collider to press buttons
                    this.physics.add.overlap(player, this.buttons, this.selectMenu, null, this);
                // } else {
                //     console.error("this.buttons is not a Phaser Group.");
                // }

                stars.children.iterate(function (child) {


                    child.disableBody(true, true);

                });


                this.sound.playAudioSprite('sfx', 'death');
                gameOverSound = false
            }


            // Keyboard and mobile joystick
            // if (cursors.left.isDown || this.mobileCursorKeys === 'left') {
            // if (cursors.left.isDown) {
            //     player.setVelocityX(-160);
            //
            //     player.anims.play('eleft', true);
            //     // } else if (cursors.right.isDown || this.mobileCursorKeys === 'right') {
            // } else if (cursors.right.isDown) {
            //     player.setVelocityX(160);
            //
            //     player.anims.play('eright', true);
            // } else {
            //     player.setVelocityX(0);
            //
            //     player.anims.play('eturn');
            // }
            //
            // if ((cursors.up.isDown || this.mobileCursorKeys === 'up') && player.body.touching.down) {
            //     player.setVelocityY(-330);
            // }


            init.setPlayerMovements(this)
        } else {
            // Movements
            init.setPlayerMovements(this)

            // // Keyboard and mobile joystick
            // // if (cursors.left.isDown || this.mobileCursorKeys === 'left') {
            // if (cursors.left.isDown) {
            //     player.setVelocityX(-160);
            //
            //     player.anims.play('left', true);
            //     // } else if (cursors.right.isDown || this.mobileCursorKeys === 'right') {
            // } else if (cursors.right.isDown) {
            //     player.setVelocityX(160);
            //
            //     player.anims.play('right', true);
            // } else {
            //     player.setVelocityX(0);
            //
            //     player.anims.play('turn');
            // }
            //
            // if ((cursors.up.isDown || this.mobileCursorKeys === 'up') && player.body.touching.down) {
            //     player.setVelocityY(-330);
            //     this.sound.playAudioSprite('sfx', 'squit');
            // }

        }
    }

    selectMenu(player, menu) {
        score = 0;
        // music.stop()
        if (menu.name === 'menu') {
            console.log('menu')
            this.physics.pause()

            // reset
            // playButton.visible = false
            gameOverSound = true
            gameOver = false
            skyIndex = 1

            // set player position
            playerPositionX = 670
            playerPositionY = 360


            music.stop()
            this.scene.start('MainMenu')
            // init.fadeInScene('MainMenu', this)
        }

        // if (menu.name === 'ranked') {
        //     this.physics.pause()
        //     // reset
        //     playButton.visible = false
        //     gameOverSound = true
        //     gameOver = false
        //     skyIndex = 1
        //
        //     music.stop()
        //     // this.scene.start('Game')
        //     init.fadeInScene('Game', this)
        // }

        if (menu.name === 'arcade') {
            this.physics.pause()
            // window.location = '/play'

            // reset
            // playButton.visible = false
            gameOverSound = true
            gameOver = false
            skyIndex = 1
            music.stop()

            // this.scene.start('Game')
            init.fadeInScene('Arcade', this)
        }
    }

    toggleSound() {

        if (isMute) {
            muteButton.setTexture('sound', 0);
            isMute = false

            return
        }

        isMute = true
        muteButton.setTexture('mute', 0);
    }

    joyStickState() {
        const cursorKeys = this.joyStick.createCursorKeys();
        for (const name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                this.mobileCursorKeys = `${name}`
            }
        }
    }

    collectStar(player, star) {
        this.sound.playAudioSprite('sfx', 'ping');

        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        // Switch music when reaching stage 5
        if (score === 600) {
            music.stop()

            music = this.sound.add('hard');
            music.play()
        }

        // Change background on score
        if ((score % 360) === 0) {
            this.sound.playAudioSprite('sfx', 'numkey');

            skyIndex++

            // Reset background
            if (skyIndex === 7) {
                skyIndex = 1
            }

            this.changeBackground('sky' + skyIndex)
        }

        if (stars.countActive(true) === 0) {
            //  Update stage
            stageText.setText('Stage: ' + ++stage);

            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb-r');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            this.sound.playAudioSprite('sfx', 'shot');

        }
    }

    hitBomb(player, bomb) {
        // this.physics.pause();

        // Add ledge to easily reach menu
        // platforms.create(405, 230, 'ground-s');

        bomb.destroy();

        gameOver = true;
    }

    changeBackground(key) {

        sky.setTexture(key, 0);
    }
}
