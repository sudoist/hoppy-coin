class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        init.setupScene(this, 'dude')

        // Add buttons
        this.buttons = this.physics.add.group()

        // this.add.text(710, 140, 'Fork ->', {fontSize: '18px', fill: '#FFF'}).setName('github')
        // this.buttons.create(750, 180, 'github').setScale(.2).setName('github').setImmovable(false)
        //     .setCollideWorldBounds(true).body.allowGravity = false

        // this.add.text(690, 320, 'Arcade ->', {fontSize: '18px', fill: '#FFF'})
        // this.buttons.create(705, 530, 'portal').setScale(.5).setName('arcade').setImmovable(false).setVisible(false)
        //     .setCollideWorldBounds(true).body.allowGravity = false

        // Coming soon
        // this.add.text(20, 170, '<- How to play (Coming Soon...)', {fontSize: '18px', fill: '#FFF'})
        // this.add.text(515, 470, 'Ruins (Coming Soon...) ->', {fontSize: '18px', fill: '#FFF'})
        // this.add.text(515, 470, 'Explore ->', {fontSize: '18px', fill: '#FFF'})
        // this.buttons.create(705, 530, 'portal').setScale(.5).setName('arcade').setImmovable(false).setVisible(false)
        //     .setCollideWorldBounds(true).body.allowGravity = false

        // The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        // Here we create the ground.
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        // Now let's create some ledges
        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')

        // The player and its settings (Moved to setupScene)

        // Set camera bounds
        // this.cameras.main.setBounds(0, 0, 3200, 600); // Adjust as needed

        // Set camera to follow player with vertical follow enabled
        // this.cameras.main.startFollow(player, true, 0.08, 0.08);

        // Add colliders
        this.physics.add.collider(this.player, platforms)

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.selectMenu, null, this)

        // Add portals for navigation
        this.add.text(45,  470, '<- Back to title', {fontSize: '18px', fill: '#FFF'})
        portals.create(60, 500, 'portal').setImmovable(false).setName('title')

        this.add.text(650, 320, 'Arcade ->', {fontSize: '18px', fill: '#FFF'})
        portals.create(730, 330, 'portal').setImmovable(false).setName('arcade')

        this.add.text(45, 170, '<- Ranked Game', {fontSize: '18px', fill: '#FFF'})
        portals.create(60, 180, 'portal').setImmovable(false).setName('ranked')

        // Play animation for portals
        portals.children.iterate(function (child) {
            child.play('portalAnimation')
        })

        this.physics.add.collider(portals, platforms)

        this.physics.add.collider(player, portals, this.selectMenu, null, this)

        player.setDepth(4)

        // Music
        this.titleMusic = this.sound.add('intro', {volume: 1, loop: true})
        this.titleMusic.play()

        // Add invisible barriers at the edges of the game world
        barriers = this.physics.add.staticGroup()

        leftBarrier = barriers.create(-50, 300, 'left-barrier').setImmovable(true).setDepth(5)
        rightBarrier = barriers.create(850, 300, 'right-barrier').setImmovable(true).setDepth(5)

        this.physics.add.collider(player, barriers)
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
            playerPositionX = 720
            playerPositionY = 200
            init.fadeInScene('StageSelection', this)
        }

        if (menu.name === 'arcade') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            init.fadeInScene('Arcade', this)
        }

        if (menu.name === 'title') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            playerPositionX = 650
            playerPositionY = 500
            init.fadeInScene('Title', this)
        }
    }
}