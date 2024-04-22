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

        music = this.sound.add('start', {volume: 1, loop: true})
        music.play()

        // Add buttons after game over
        this.buttons = this.physics.add.group()

        this.add.text(500, 470, 'Back to stage selection ->', {fontSize: '18px', fill: '#FFF'})

        this.buttons.create(830, 500, 'ranked').setScale(.5).setName('rankedMenu').setImmovable(false)
            .body.allowGravity = false

        this.buttons.setVisible(false)

        // Create tennis balls as bombs
        bombs = this.physics.add.group()

        for (let i = 0; i < 7; i++) {
            console.log('create')
            init.createBomb(this, bombs, player, 0, 'bomb-ball')
        }

        this.physics.add.collider(bombs, platforms)

        this.physics.add.collider(player, this.buttons, this.selectMenu, null, this)
    }

    update() {
        init.monitorMuteStatus(game)

        // Movements
        init.setPlayerMovements(this)
    }

    selectMenu(player, menu) {
        if (menu.name === 'rankedMenu') {
            this.physics.pause()
            music.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 40
            playerPositionY = 350

            init.fadeInScene('RankedMenu', this)
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
}
