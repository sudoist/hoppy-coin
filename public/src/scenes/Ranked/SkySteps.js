// A standalone vertical-climbing experiment. No ranked API submissions yet.
class SkySteps extends Phaser.Scene {
    constructor() {
        super('SkySteps')
    }

    create() {
        this.isLeaving = false
        this.finished = false
        this.isRestarting = false
        this.coinsCollected = 0
        this.highestClimb = 0
        this.worldHeight = 3000
        this.nextLedgeY = 2815
        this.lastLedgeX = 400
        this.ledgeCount = 0
        this.generated = []
        playerPositionX = 400
        playerPositionY = this.worldHeight - 110
        init.setupScene(this, 'dude')
        init.changeBackground('sky.png', 'cover', 'no-repeat')

        this.physics.world.resume()
        this.physics.world.setBounds(0, -1000000, 800, this.worldHeight + 1000000)
        this.cameras.main.setBounds(0, -1000000, 800, this.worldHeight + 1000000)
        this.cameras.main.setScroll(0, this.worldHeight - 600)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, this.worldHeight - 40, 'ground').setScale(2).refreshBody()

        this.coins = this.physics.add.staticGroup()
        this.bombs = this.physics.add.group()
        this.generateLedges(this.worldHeight - 1600)

        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            coin.disableBody(true, true)
            this.coinsCollected++
            if (this.coinsCollected % 12 === 0) this.spawnBomb()
            this.scoreLabel.setText('Coins: ' + this.coinsCollected)
            this.sound.playAudioSprite('sfx', 'ping')
        })

        // Match the original Ranked rule: one initial bomb after 3 seconds.
        this.time.delayedCall(3000, () => this.spawnBomb())

        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.bombs, (player, bomb) => {
            if (this.finished || this.isLeaving) return
            bomb.destroy()
            this.endRun('Hit by a bomb!')
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
        // Use scene-scoped events rather than JustDown; input may be consumed by
        // the shared movement controls before the game-over branch runs.
        GameNavigation.bind(this, {retry: () => this.retry(), stages: () => this.leave()})

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.physics.world.setBounds(0, 0, 800, 600)
        })
    }

    spawnBomb() {
        if (this.finished || this.isLeaving) return
        const camera = this.cameras.main
        const x = Phaser.Math.Between(80, 720)
        const bomb = this.bombs.create(x, camera.scrollY - 35, 'bomb-r')
        bomb.setBounce(0.4)
        bomb.setCollideWorldBounds(false)
        bomb.setVelocity(Phaser.Math.Between(-35, 35), 0)
        this.sound.playAudioSprite('sfx', 'shot')
    }

    generateLedges(upToY) {
        // Stay under the ~181px maximum jump; increase spacing gradually.
        while (this.nextLedgeY > upToY) {
            const difficulty = Math.min(1, this.ledgeCount / 45)
            const gap = Math.round(138 + difficulty * 22)
            const direction = this.ledgeCount % 2 === 0 ? 1 : -1
            const offset = Math.round(95 + difficulty * 35)
            const x = Phaser.Math.Clamp(this.lastLedgeX + direction * offset, 145, 655)
            const platform = this.platforms.create(x, this.nextLedgeY, 'ground')
                .setScale(0.65, 1).refreshBody()
            this.generated.push(platform)
            if (this.ledgeCount % 2 === 0) {
                const coin = this.coins.create(x, this.nextLedgeY - 42, 'coin')
                this.generated.push(coin)
            }
            this.lastLedgeX = x
            this.nextLedgeY -= gap
            this.ledgeCount++
        }
    }

    update() {
        init.monitorMuteStatus(game)
        if (this.isLeaving) return
        if (this.finished) return
        init.setPlayerMovements(this)

        const climbed = Math.max(0, Math.floor((this.worldHeight - 110 - this.player.y) / 10))
        this.highestClimb = Math.max(this.highestClimb, climbed)
        this.heightLabel.setText('Height: ' + this.highestClimb)
        this.generateLedges(this.player.y - 1100)

        // Scroll only upward, once the player reaches the upper third.
        const camera = this.cameras.main
        const targetScroll = Math.max(0, this.player.y - 200)
        if (targetScroll < camera.scrollY) {
            camera.scrollY = Math.max(targetScroll, camera.scrollY - 5)
        }

        // Reclaim ledges that have dropped far below the visible camera.
        this.generated = this.generated.filter(object => {
            if (object.y > camera.scrollY + 900) {
                object.destroy()
                return false
            }
            return true
        })

        this.bombs.children.iterate(bomb => {
            if (bomb && bomb.active && bomb.y > camera.scrollY + 850) bomb.destroy()
        })

        if (this.player.y > camera.scrollY + 640) {
            this.endRun('You fell!')
        }
    }

    endRun(message) {
        if (!GameRun.finish(this, () => {
            // Keep guest coins and personal best after refresh or browser restart.
            GuestProgress.recordRun('SkySteps', this.highestClimb, this.coinsCollected)
        })) return
        this.add.rectangle(400, 300, 560, 220, 0x09284c, 0.92)
            .setScrollFactor(0).setDepth(30)
        this.add.text(400, 270, message, {fontSize: '30px', fill: '#fff'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
        GameNavigation.results(this, {retry: () => this.retry(), stages: () => this.leave()})

    }

    retry() {
        if (!this.finished || this.isLeaving || this.isRestarting) return
        this.isRestarting = true
        this.scene.restart()
    }

    leave() {
        if (this.isLeaving) return
        this.isLeaving = true
        playerPositionX = 700
        playerPositionY = 480
        this.scene.start('StageSelection')
    }
}
