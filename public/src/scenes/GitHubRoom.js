class GitHubRoom extends Phaser.Scene {
    constructor() {
        super('GitHubRoom')
    }

    create() {
        playerPositionX = 145
        playerPositionY = 500
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.physics.add.collider(this.player, platforms)

        this.add.rectangle(400, 280, 630, 345, 0x101b3b, 0.85)
            .setStrokeStyle(3, 0x83c6c4)
        this.add.text(400, 105, 'HOPPY COIN ON GITHUB', {
            fontSize: '27px', fill: '#FFF'
        }).setOrigin(0.5)
        this.add.image(400, 200, 'github-white').setScale(0.25)
        this.add.text(400, 275, 'A free experimental game, built in public.', {
            fontSize: '17px', fill: '#FFF'
        }).setOrigin(0.5)
        this.add.text(400, 315, 'Source code and development history:', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5)

        const link = this.add.text(400, 360, 'github.com/sudoist/hoppy-coin', {
            fontSize: '19px', fill: '#a6f3ff'
        }).setOrigin(0.5).setInteractive({useHandCursor: true})
        link.on('pointerdown', () => {
            window.open('https://github.com/sudoist/hoppy-coin',
                '_blank', 'noopener,noreferrer')
        })
        this.add.text(400, 405, 'Click the link above to open the repository', {
            fontSize: '14px', fill: '#FFF'
        }).setOrigin(0.5)

        this.add.text(75, 485, 'Back', {
            fontSize: '18px', fill: '#FFF'
        }).setOrigin(0.5)

        this.returnPortal = this.physics.add.sprite(65, 535, 'portal')
            .setImmovable(true)
        this.returnPortal.body.allowGravity = false
        this.returnPortal.play('portalAnimation')
        this.physics.add.overlap(this.player, this.returnPortal, () => this.returnToMenu())
        this.input.keyboard.on('keydown-ESC', () => this.returnToMenu())
    }

    returnToMenu() {
        if (this.isLeaving) return
        this.isLeaving = true
        this.physics.pause()
        playerPositionX = 680
        playerPositionY = 500
        init.fadeInScene('MainMenu', this)
    }

    update() {
        init.monitorMuteStatus(game)
        init.setPlayerMovements(this)
    }
}
