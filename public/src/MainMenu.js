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

        this.add.text(20, 170, '<- Ranked Game', {fontSize: '18px', fill: '#FFF'})
        this.buttons.create(10, 200, 'bomb').setScale(.5).setName('ranked').setImmovable(false).setVisible(false)
            .setCollideWorldBounds(true).body.allowGravity = false

        this.add.text(710, 140, 'Fork ->', {fontSize: '18px', fill: '#FFF'}).setName('github')
        this.buttons.create(750, 180, 'github').setScale(.2).setName('github').setImmovable(false)
            .setCollideWorldBounds(true).body.allowGravity = false

        this.add.text(690, 320, 'Arcade ->', {fontSize: '18px', fill: '#FFF'})
        this.buttons.create(790, 350, 'bomb').setScale(.5).setName('arcade').setImmovable(false).setVisible(false)
            .setCollideWorldBounds(true).body.allowGravity = false

        // Coming soon
        this.add.text(20, 470, '<- How to play (Coming Soon...)', {fontSize: '18px', fill: '#FFF'})
        this.add.text(515, 470, 'Ruins (Coming Soon...) ->', {fontSize: '18px', fill: '#FFF'})

        // The platforms group contains the ground and the 2 ledges we can jump on
        let platforms = this.physics.add.staticGroup()

        // Here we create the ground.
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        // Now let's create some ledges
        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')

        // The player and its settings (Moved to setupScene)

        // Add colliders
        this.physics.add.collider(this.player, platforms)

        // Add menu collider to press buttons
        this.physics.add.overlap(this.player, this.buttons, this.selectMenu, null, this)

        // Our player animations, turning, walking left and walking right. (Moved to setupScene)

        // Input Events (Moved to setupScene)

        // Instructions (Moved to setupScene)
        this.add.text(200, 550, 'Move with W, A, S, D', {fontSize: '32px', fill: '#FFF'})

        // Music
        this.titleMusic = this.sound.add('intro', {volume: 1, loop: true})
        this.titleMusic.play()
    }

    update() {
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
            // previousSceneKey = scene.scene.key
            window.location = '/ranked'
        }

        if (menu.name === 'arcade') {
            this.physics.pause()
            this.titleMusic.stop()
            previousSceneKey = this.scene.key
            init.fadeInScene('Arcade', this)
        }
    }
}