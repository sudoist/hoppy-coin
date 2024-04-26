class StageSelection extends Phaser.Scene {
    constructor() {
        super('StageSelection')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        init.setupScene(this, 'dude')

        // Add buttons
        this.buttons = this.physics.add.group()

        // this.add.text(50, 40, '<- Leaderboard', {fontSize: '18px', fill: '#FFF'})
        // this.buttons.create(30, 45, 'leaderboard').setScale(1).setName('phaserInitialRanking').setImmovable(false).setVisible(true)
        //     .setCollideWorldBounds(true).body.allowGravity = false

        // Coming soon
        this.add.text(20, 470, '<- Land Mine Beach (Coming Soon...)', {fontSize: '18px', fill: '#FFF'})
        // this.add.text(515, 470, 'Ruins (Coming Soon...) ->', {fontSize: '18px', fill: '#FFF'})

        this.add.text(350, 40, 'Hop on!', {fontSize: '24px', fill: '#FFF'})

        // The platforms group contains the ground and the 2 ledges we can jump on
        let platforms = this.physics.add.staticGroup()

        // Here we create the ground.
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        // Now let's create some ledges
        platforms.create(200, 400, 'ground')
        platforms.create(745, 250, 'ground')
        platforms.create(60, 220, 'ground')

        // Add colliders
        this.physics.add.collider(this.player, platforms)

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.selectMenu, null, this)

        instructions.destroy()
        this.add.text(280, 550, 'Select stage', {fontSize: '32px', fill: '#FFF'})

        // Music
        this.titleMusic = this.sound.add('rankedMenu', {volume: 1, loop: true})
        this.titleMusic.play()

        // Add portals for navigation
        this.add.text(610, 170, 'Back to title ->', {fontSize: '18px', fill: '#FFF'})
        portals.create(770, 210, 'portal').setImmovable(false).setName('title')

        this.add.text(20, 140, '<- Phaser Initial', {fontSize: '18px', fill: '#FFF'})
        portals.create(35, 180, 'portal').setImmovable(false).setName('phaserInitial')

        // Play animation for portals
        portals.children.iterate(function (child) {
            child.play('portalAnimation')
        })

        this.physics.add.collider(portals, platforms)

        this.physics.add.collider(player, portals, this.selectMenu, null, this)

        player.setDepth(4)
    }

    update() {
        init.monitorMuteStatus(game)

        // Movements
        init.setPlayerMovements(this)
    }

    selectMenu(player, menu) {
        if (menu.name === 'title') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 40
            playerPositionY = 500

            init.fadeInScene('MainMenu', this)
        }

        if (menu.name === 'phaserInitial') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 710
            playerPositionY = 140

            level = 'phaserInitial'
            levelLabel = 'Phaser Initial'

            init.fadeInScene('Ranked', this)
        }

        if (menu.name === 'phaserInitialRanking') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 710
            playerPositionY = 140

            level = 'phaserInitialRanking'

            init.fadeInScene('LeaderBoard', this)
        }
    }
}