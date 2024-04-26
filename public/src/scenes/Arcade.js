class Arcade extends Phaser.Scene {
    constructor() {
        super('Arcade')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        // Check if playing again from same scene
        // console.log('Previous scene key:', previousSceneKey)
        if (previousSceneKey === 'MainMenu') {
            playerPositionX = 30
            playerPositionY = 360
        }

        init.setupScene(this, init.randomizePlayerSprite())

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        //  Now let's create some ledges
        platforms.create(200, 400, 'ground')
        platforms.create(745, 250, 'ground')
        platforms.create(60, 220, 'ground')

        // Add buttons (Moved to setupScene)

        // The player and its settings (Moved to setupScene)

        //  Our player animations, turning, walking left and walking right. (Moved to setupScene)

        //  Our player animations, GAME OVER (Moved to setupScene)

        //  Input Events (Moved to setupScene)

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        init.createStars(this)

        bombs = this.physics.add.group()

        //  The score
        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'})

        //  The stage
        stageText = this.add.text(16, 46, 'Stage: 1', {fontSize: '32px', fill: '#FFF'})

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(bombs, platforms)

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this)

        this.physics.add.collider(player, bombs, this.hitBomb, null, this)

        // Instructions
        // instructions = this.add.text(200, 550, 'Move with W, A, S, D', {fontSize: '32px', fill: '#fff'})

        // Start game with bomb after 3 seconds
        init.createBomb(this, bombs, player, 3000, 'bomb-r')

        // Audio
        sfx = this.cache.json.get('sfx')

        music = this.sound.add('start', {volume: 1, loop: true})
        music.play()
    }

    update() {
        if (gameOver) {

            // Run one time on game over
            if (gameOverSound) {
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

                // Add portals for navigation
                this.add.text(10,  320, '<- Back to menu', {fontSize: '18px', fill: '#FFF'})
                portals.create(30, 350, 'portal').setImmovable(false).setName('menu')

                this.add.text(650, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF'})
                portals.create(780, 500, 'portal').setImmovable(false).setName('arcade')

                // Play animation for portals
                portals.children.iterate(function (child) {
                    child.play('portalAnimation')
                })

                this.physics.add.collider(portals, platforms)

                this.physics.add.collider(player, portals, this.selectMenu, null, this)

                player.setDepth(4)
            }

            init.setPlayerMovements(this)
        } else {
            init.monitorMuteStatus(game)

            // Movements
            init.setPlayerMovements(this)
        }
    }

    selectMenu(player, menu) {
        // Reset data
        score = 0

        if (menu.name === 'menu') {
            init.gameOverReset(this, 'MainMenu', 670, 360)
        }

        if (menu.name === 'arcade') {
            init.gameOverReset(this, 'Arcade', 40, 500)
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
