class LeaderBoard extends Phaser.Scene {
    constructor() {
        super('LeaderBoard')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        init.setupScene(this, init.randomizePlayerSprite())

        // Get scores
        init.apiFetch(env.API_URL + '/scores').then((data) => {
            init.printScores(this, data)
        })

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        // Set platforms depending on leve
        if (level === 'phaserInitialRanking') {
            // Here we create the ground.
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(600, 400, 'ground')
            platforms.create(50, 250, 'ground')
            platforms.create(750, 220, 'ground')

            // Change background
            init.changeBackground('sky.png', 'cover', 'no-repeat')

            // Text at bottom
            levelLabel = 'Phaser Initial'
        }

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms)

        // Label
        let label = this.add.text(200, 565, levelLabel + ' Leaderboard', {fontSize: '24px', fill: '#fff'})

        // Set the origin of the text to its center
        label.setOrigin(0.5);

        // Set the x-coordinate to half the width of the game canvas
        label.x = this.cameras.main.width / 2;

        // Audio
        sfx = this.cache.json.get('sfx')

        music = this.sound.add('start')
        music.play()

        // Add buttons after game over
        this.buttons = this.physics.add.group()

        this.buttons.create(830, 180, 'menu').setScale(.5).setName('menu').setImmovable(false)
            .body.allowGravity = false

        this.buttons.create(830, 500, 'ranked').setScale(.5).setName('ranked').setImmovable(false)
            .body.allowGravity = false

        this.buttons.setVisible(false)

        // Create tennis balls as bombs
        bombs = this.physics.add.group()

        for (let i = 0; i < 7; i++) {
            console.log('create')
            init.createBomb(this, bombs, player, 0, 'bomb-ball')
        }

        this.physics.add.collider(bombs, platforms)
    }

    update() {
        if (gameOver) {

            // Run one time on game over
            if (gameOverSound) {
                console.log('game over ranked')
                instructions.destroy()
                this.add.text(200, 550, 'Would you like to play again?', {fontSize: '24px', fill: '#FFF'})

                // Add overlap with menu
                this.physics.add.overlap(player, this.buttons, this.selectMenu, null, this)

                stars.children.iterate(function (child) {
                    child.disableBody(true, true)
                })

                // Sounds
                this.sound.playAudioSprite('sfx', 'death')
                music.stop()
                gameOverSound = false

                // Game over texts
                this.add.text(600, 140, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF'})

                this.add.text(647, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF'})
            }

            init.setPlayerMovements(this)
        } else {
            // Movements
            init.setPlayerMovements(this)
        }
    }

    selectMenu(player, menu) {
        // Reset data
        score = 0

        if (menu.name === 'menu') {
            init.gameOverReset(this, 'RankedMenu', 60, 170)
        }

        if (menu.name === 'ranked') {
            init.gameOverReset(this, 'Ranked', 40, 480)
        }
    }

    // TODO: Re add
    joyStickState() {
        const cursorKeys = this.joyStick.createCursorKeys()
        for (const name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                this.mobileCursorKeys = `${name}`
            }
        }
    }

    collectStar(player, star) {
        init.collectStar(this, player, star)
    }

    hitBomb(player, bomb) {
        bomb.destroy()

        gameOver = true
    }
}
