class Title extends Phaser.Scene {
    constructor() {
        super('Title')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        init.setupScene(this, 'dude')

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
        this.buttons = this.physics.add.group()

        // The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        // Here we create the ground.
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        // Add colliders
        this.physics.add.collider(this.player, platforms)

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.selectMenu, null, this)

        // Add portals for navigation
        this.add.text(45, 470, '<- How to play', {fontSize: '18px', fill: '#FFF'})
        portals.create(60, 500, 'portal').setImmovable(false).setName('tutorial')

        this.add.text(650, 470, 'Explore ->', {fontSize: '18px', fill: '#FFF'})
        portals.create(740, 500, 'portal').setImmovable(false).setName('menu')

        // Play animation for portals
        portals.children.iterate(function (child) {
            child.play('portalAnimation')
        })

        this.physics.add.collider(portals, platforms)

        this.physics.add.collider(player, portals, this.selectMenu, null, this)

        player.setDepth(4)

        // Music
        music.stop()

        this.titleMusic = this.sound.add('intro', {volume: 1, loop: true})
        this.titleMusic.play()

        // Add invisible barriers at the edges of the game world
        barriers = this.physics.add.staticGroup()

        leftBarrier = barriers.create(-50, 300, 'left-barrier').setImmovable(true).setDepth(5)
        rightBarrier = barriers.create(850, 300, 'right-barrier').setImmovable(true).setDepth(5)

        this.physics.add.collider(player, barriers)

        // Buttons
        this.add.text(250, 250, 'Click on a game mode to play.', {fontSize: '18px', fill: '#FFF'})

        this.add.image(250, 300, 'quick-play')
            .setInteractive()
            .on('pointerdown', () => {
                this.titleMusic.stop()
                playerPositionX = 60
                playerPositionY = 500
                previousSceneKey = this.scene.key

                level = 'quickPlay'
                levelLabel = 'Quick Play'

                init.fadeInScene('Ranked', this)
            })

        this.add.image(550, 300, 'ranked')
            .setInteractive()
            .on('pointerdown', () => {
                this.titleMusic.stop()
                previousSceneKey = this.scene.key
                playerPositionX = 720
                playerPositionY = 200
                init.fadeInScene('StageSelection', this)
            })
    }

    update() {
        init.monitorMuteStatus(game)

        // Movements
        init.setPlayerMovements(this)
    }

    selectMenu(player, menu) {
        if (menu.name === 'github') {
            let URL = 'https://github.com/sudoist/hoppy-coin'
            window.open(URL, '_blank')
            menu.disableBody(true, true)
            setTimeout(() => {
                this.buttons.create(750, 180, 'github').setScale(.2).setName('github').setImmovable(false)
                    .setCollideWorldBounds(true).body.allowGravity = false
            }, 10000 * 60)
        }

        if (menu.name === 'ranked') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            playerPositionX = 750
            playerPositionY = 200
            init.fadeInScene('StageSelection', this)
        }

        if (menu.name === 'arcade') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key

            level = 'quickPlay'
            levelLabel = 'Quick Play'

            init.fadeInScene('Ranked', this)
        }

        if (menu.name === 'menu') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            playerPositionX = 120
            playerPositionY = 500
            init.fadeInScene('MainMenu', this)
        }

        if (menu.name === 'tutorial') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            playerPositionX = 2300
            playerPositionY = 500
            init.fadeInScene('Tutorial', this)
        }
    }
}