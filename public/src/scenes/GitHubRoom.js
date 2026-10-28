class GitHubRoom extends Phaser.Scene {
    constructor() {
        super('GitHubRoom')
    }

    create() {
        playerPositionX = 90
        playerPositionY = 205
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        // Top-left arrival ledge, like the reference scene.
        platforms.create(90, 240, 'ground').setScale(0.46).refreshBody()
        this.physics.add.collider(this.player, platforms)

        this.add.text(400, 65, 'HOPPY COIN ON GITHUB', {
            fontSize: '27px', fill: '#FFF'
        }).setOrigin(0.5)
        // The GitHub icon is a portal: touch it or click it to visit the repo.
        this.githubPortal = this.physics.add.sprite(400, 145, 'github-white')
            .setScale(0.25).setImmovable(true)
        this.githubPortal.body.allowGravity = false
        this.githubPortal.setInteractive({useHandCursor: true})
        this.githubPortal.on('pointerdown', () => this.openRepository())
        this.physics.add.overlap(this.player, this.githubPortal,
            () => this.openRepository())
        this.add.text(400, 230, 'A free experimental game, built in public.', {
            fontSize: '17px', fill: '#FFF'
        }).setOrigin(0.5)
        this.add.text(400, 270, 'Source code and development history:', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5)

        const link = this.add.text(400, 320, 'github.com/sudoist/hoppy-coin', {
            fontSize: '19px', fill: '#a6f3ff'
        }).setOrigin(0.5).setInteractive({useHandCursor: true})
        link.on('pointerdown', () => this.openRepository())
        this.add.text(400, 365, 'Click the link above to open the repository', {
            fontSize: '14px', fill: '#FFF'
        }).setOrigin(0.5)

        this.add.text(65, 480, 'Back to Menu', {
            fontSize: '18px', fill: '#FFF'
        }).setOrigin(0.5)

        this.returnPortal = this.physics.add.sprite(65, 515, 'portal')
            .setImmovable(true)
        this.returnPortal.body.allowGravity = false
        this.returnPortal.play('portalAnimation')
        this.physics.add.overlap(this.player, this.returnPortal, () => this.returnToMenu())
        this.input.keyboard.on('keydown-ESC', () => this.returnToMenu())
    }

    openRepository() {
        if (this.openingRepository) return
        this.openingRepository = true
        window.open('https://github.com/sudoist/hoppy-coin',
            '_blank', 'noopener,noreferrer')
        // Prevent continuous physics overlaps from opening multiple tabs.
        this.time.delayedCall(1200, () => { this.openingRepository = false })
    }

    returnToMenu() {
        if (this.isLeaving) return
        this.isLeaving = true
        this.physics.pause()
        playerPositionX = 690
        playerPositionY = 175
        init.fadeInScene('MainMenu', this)
    }

    update() {
        init.monitorMuteStatus(game)
        init.setPlayerMovements(this)
    }
}
