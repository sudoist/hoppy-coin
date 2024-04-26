class RankedName extends Phaser.Scene {
    constructor() {
        super('RankedName')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        // Check if playing again from same scene
        // console.log('Previous scene key:', previousSceneKey)
        // if (previousSceneKey === 'MainMenu') {
        playerPositionX = 750
        playerPositionY = 500
        // }
        // if (previousSceneKey === 'Ranked') {
        //     playerPositionX = 750
        //     playerPositionY = 200
        // }

        init.setupScene(this, 'dude')

        scene = this

        // Add buttons
        this.buttons = this.physics.add.group()

        // Add input
        init.displayInputButtons(this)

        // Enter name text then save score
        inputPlayerNameLabel = this.add.text(200, 40, 'Enter your name:', {fontSize: '24px', fill: '#FFF'})
        inputPlayerNameText = this.add.text(470, 40, '_ _ _', {fontSize: '24px', fill: '#FFF'})


        this.add.text(600, 470, 'Back to title ->', {fontSize: '18px', fill: '#FFF'})
        this.buttons.create(790, 500, 'bomb').setScale(1).setName('title').setImmovable(false).setVisible(false)
            .setCollideWorldBounds(true).body.allowGravity = false

        // The platforms group contains the ground and the 2 ledges we can jump on
        let platforms = this.physics.add.staticGroup()

        // Here we create the ground.
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        // Now let's create some ledges
        platforms.create(100, 280, 'ground')
        platforms.create(350, 280, 'ground')
        platforms.create(900, 380, 'ground')
        // platforms.create(745, 250, 'ground')
        // platforms.create(60, 220, 'ground')

        // The player and its settings (Moved to setupScene)

        // Add colliders
        this.physics.add.collider(this.player, platforms)

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.buttonPress, null, this)

        // Remove instruction overlap
        instructions.destroy()
        this.add.text(280, 550, 'Preparing...', {fontSize: '32px', fill: '#FFF'})

        // Music
        this.titleMusic = this.sound.add('rankedMenu', {volume: 1, loop: true})
        this.titleMusic.play()
    }

    update() {
        init.monitorMuteStatus(game)

        // Movements
        init.setPlayerMovements(this)

        // Input submitted
        if (inputPlayerNameSubmitted) {
            this.add.text(20, 470, '<- Stage selection', {fontSize: '18px', fill: '#FFF'})
            this.buttons.create(10, 500, 'bomb').setScale(1).setName('rankedMenu').setImmovable(false).setVisible(false)
                .setCollideWorldBounds(true).body.allowGravity = false

            // Reset
            inputPlayerNameSubmitted = false
        }
    }

    buttonPress(player, menu) {
        if (menu.name === 'rankedMenu') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 750
            playerPositionY = 200

            init.fadeInScene('RankedMenu', this)
        }
        if (menu.name === 'title') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 100
            playerPositionY = 500

            init.fadeInScene('MainMenu', this)
        }
    }
}