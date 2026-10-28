// A standalone vertical-climbing experiment. No ranked API submissions yet.
class SkySteps extends Phaser.Scene {
    constructor() {
        super('SkySteps')
    }

    create() {
        this.isLeaving = false
        this.finished = false
        this.coinsCollected = 0
        this.highestClimb = 0
        this.worldHeight = 3000
        playerPositionX = 400
        playerPositionY = this.worldHeight - 110
        init.setupScene(this, 'dude')
        init.changeBackground('sky.png', 'cover', 'no-repeat')

        this.physics.world.resume()
        this.physics.world.setBounds(0, 0, 800, this.worldHeight)
        this.cameras.main.setBounds(0, 0, 800, this.worldHeight)
        this.cameras.main.setScroll(0, this.worldHeight - 600)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, this.worldHeight - 40, 'ground').setScale(2).refreshBody()

        // Keep every vertical step below the ~181px maximum jump height.
        // Alternating short horizontal hops give the player room to land.
        const ledges = []
        const positions = [400, 530, 400, 270, 400, 530, 400, 270]
        for (let i = 0; i < 22; i++) {
            ledges.push([positions[i % positions.length], 2815 - i * 125])
        }
        this.coins = this.physics.add.staticGroup()
        ledges.forEach(([x, y], index) => {
            this.platforms.create(x, y, 'ground').setScale(0.65, 1).refreshBody()
            if (index % 2 === 0) {
                this.coins.create(x, y - 40, 'coin')
            }
        })

        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            coin.disableBody(true, true)
            this.coinsCollected++
            this.scoreLabel.setText('Coins: ' + this.coinsCollected)
            this.sound.playAudioSprite('sfx', 'ping')
        })

        // HUD is camera-fixed, unlike the platforms.
        this.add.text(18, 18, 'SKY STEPS', {fontSize: '24px', fill: '#fff'})
            .setScrollFactor(0).setDepth(20)
        this.scoreLabel = this.add.text(18, 52, 'Coins: 0', {fontSize: '20px', fill: '#fff'})
            .setScrollFactor(0).setDepth(20)
        this.heightLabel = this.add.text(18, 80, 'Height: 0', {fontSize: '20px', fill: '#fff'})
            .setScrollFactor(0).setDepth(20)
        this.add.text(18, 115, 'ESC: Back to stages', {fontSize: '14px', fill: '#fff'})
            .setScrollFactor(0).setDepth(20)
        this.input.keyboard.on('keydown-ESC', () => this.leave())

        // Finish line at the top of the tower.
        this.finishMarker = this.add.text(400, 105, 'SUMMIT!', {
            fontSize: '32px', fill: '#ffe76a'
        }).setOrigin(0.5)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.physics.world.setBounds(0, 0, 800, 600)
        })
    }

    update() {
        init.monitorMuteStatus(game)
        if (this.isLeaving) return
        if (this.finished) return
        init.setPlayerMovements(this)

        const climbed = Math.max(0, Math.floor((this.worldHeight - 110 - this.player.y) / 10))
        this.highestClimb = Math.max(this.highestClimb, climbed)
        this.heightLabel.setText('Height: ' + this.highestClimb)

        // Scroll only upward, once the player reaches the upper third.
        const camera = this.cameras.main
        const targetScroll = Math.max(0, this.player.y - 200)
        if (targetScroll < camera.scrollY) {
            camera.scrollY = Math.max(targetScroll, camera.scrollY - 5)
        }

        if (this.player.y < 165) {
            this.endRun('Summit reached!')
        } else if (this.player.y > camera.scrollY + 640) {
            this.endRun('You fell!')
        }
    }

    endRun(message) {
        if (this.finished) return
        this.finished = true
        this.player.setVelocity(0, 0)
        this.player.body.enable = false
        this.add.rectangle(400, 300, 480, 190, 0x09284c, 0.92)
            .setScrollFactor(0).setDepth(30)
        this.add.text(400, 270, message, {fontSize: '30px', fill: '#fff'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
        this.add.text(400, 325, 'R: Retry     ESC: Stages', {fontSize: '18px', fill: '#fff'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
        this.input.keyboard.once('keydown-R', () => this.scene.restart())
    }

    leave() {
        if (this.isLeaving) return
        this.isLeaving = true
        playerPositionX = 700
        playerPositionY = 480
        this.scene.start('StageSelection')
    }
}
