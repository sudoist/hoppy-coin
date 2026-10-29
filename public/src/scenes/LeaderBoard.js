class LeaderBoard extends Phaser.Scene {
    constructor() {
        super('LeaderBoard')
        this.stages = ['Phaser Initial', 'Arctic Classic', 'Land Mine Beach']
    }

    create() {
        this.physics.world.resume()
        init.setupScene(this, 'dude')
        init.changeBackground('sky.png', 'cover', 'no-repeat')
        this.isNavigating = false
        this.selectedStage = 0
        this.requestId = 0

        if (instructions && instructions.active) instructions.destroy()

        const ground = this.physics.add.staticGroup()
        ground.create(400, 568, 'ground').setScale(2).refreshBody()
        this.physics.add.collider(this.player, ground)

        this.add.text(400, 40, 'LEADERBOARDS', {fontSize: '30px', fill: '#fff'}).setOrigin(0.5)
        this.add.text(400, 83, 'Select a stage (1 / 2 / 3)', {
            fontSize: '17px', fill: '#fff'
        }).setOrigin(0.5)

        this.stages.forEach((stageName, index) => {
            const x = [140, 400, 660][index]
            const tab = this.add.text(x, 125, stageName, {
                fontSize: '17px', fill: '#fff',
                backgroundColor: '#174a70', padding: {x: 9, y: 9}
            }).setOrigin(0.5).setInteractive({useHandCursor: true})
            tab.on('pointerdown', () => this.showStage(index))
        })

        this.scoreText = this.add.text(400, 310, 'Loading scores...', {
            fontSize: '19px', fill: '#fff', align: 'center',
            lineSpacing: 7
        }).setOrigin(0.5)

        this.add.text(610, 480, 'Back to stages ->', {
            fontSize: '18px', fill: '#fff'
        })
        this.backPortal = this.physics.add.staticSprite(765, 510, 'portal')
        this.backPortal.play('portalAnimation')
        this.physics.add.overlap(this.player, this.backPortal, () => this.goBack())

        this.input.keyboard.on('keydown-ONE', () => this.showStage(0))
        this.input.keyboard.on('keydown-TWO', () => this.showStage(1))
        this.input.keyboard.on('keydown-THREE', () => this.showStage(2))
        this.input.keyboard.on('keydown-ESC', () => this.goBack())

        this.showStage(0)
    }

    async showStage(index) {
        if (this.isNavigating) return
        this.selectedStage = index
        const request = ++this.requestId
        const stageName = this.stages[index]
        this.scoreText.setText('Loading ' + stageName + '...')
        const scores = await init.apiFetch(init.scoreApiUrl() +
            '/scores?level=' + encodeURIComponent(stageName))
        if (!this.scene.isActive() || request !== this.requestId) return
        if (scores.unavailable) {
            this.scoreText.setText('Leaderboard unavailable')
            return
        }
        const rows = scores.data.slice(0, 10).map((item, i) =>
            (i + 1) + '.  ' + item.name + '   ' + item.score
        )
        this.scoreText.setText(stageName + '\\n\\n' +
            (rows.length ? rows.join('\\n') : 'No scores yet'))
    }

    goBack() {
        if (this.isNavigating) return
        this.isNavigating = true
        this.physics.pause()
        playerPositionX = 650
        playerPositionY = 430
        previousSceneKey = this.scene.key
        init.fadeInScene('StageSelection', this)
    }

    update() {
        init.monitorMuteStatus(game)
        init.setPlayerMovements(this)
    }
}
