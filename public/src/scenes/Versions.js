class Versions extends Phaser.Scene {
    constructor() {
        super('Versions')
    }

    create() {
        // Arrive from the right-side Versions entrance, as in Stage Selection.
        playerPositionX = 700
        playerPositionY = 490
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.physics.add.collider(this.player, platforms)

        // Two vertical banks of archive chambers, with a clear central shaft.
        this.add.rectangle(400, 290, 730, 400, 0x101b3b, 0.72).setDepth(0)
        this.add.text(400, 52, 'VERSION CHAMBER', {
            fontSize: '26px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)
        this.add.text(400, 92, 'Jump into a version portal', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)

        const archives = [
            {label: 'v0.0', x: 120, ledgeY: 235},
            {label: 'v0.1', x: 680, ledgeY: 235},
            {label: 'v0.2', x: 120, ledgeY: 425},
            {label: 'v1.0', x: 680, ledgeY: 425}
        ]

        this.archivePortals = this.physics.add.group()
        archives.forEach((archive) => {
            // Decoration stays behind the gameplay. Never cover the walkway.
            this.add.rectangle(archive.x, archive.ledgeY - 65, 195, 145,
                0x243b65, 0.94).setStrokeStyle(3, 0x83c6c4).setDepth(1)
            this.add.text(archive.x, archive.ledgeY - 100, archive.label, {
                fontSize: '23px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)
            this.add.text(archive.x, archive.ledgeY - 72, 'ARCHIVE', {
                fontSize: '12px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)

            platforms.create(archive.x, archive.ledgeY, 'ground')
                .setScale(0.5).refreshBody()

            const portal = this.archivePortals.create(
                archive.x, archive.ledgeY - 26, 'portal'
            ).setName(archive.label).setImmovable(true)
            portal.body.allowGravity = false
            portal.play('portalAnimation')
            portal.setDepth(5)
        })

        // Short steps make the upper ledges reachable without a new movement system.
        platforms.create(310, 465, 'ground').setScale(0.27).refreshBody()
        platforms.create(490, 465, 'ground').setScale(0.27).refreshBody()
        platforms.create(310, 330, 'ground').setScale(0.27).refreshBody()
        platforms.create(490, 330, 'ground').setScale(0.27).refreshBody()

        // Return portal is on the right: the same side as the Main Menu entrance.
        this.add.text(725, 475, 'Back', {
            fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(6)
        const backPortal = this.archivePortals.create(725, 535, 'portal')
            .setName('back').setImmovable(true)
        backPortal.body.allowGravity = false
        backPortal.play('portalAnimation')
        backPortal.setDepth(5)

        this.physics.add.overlap(this.player, this.archivePortals, (player, portal) => {
            if (!portal.active || this.isLeaving) return
            if (portal.name === 'back') {
                this.returnToMenu()
                return
            }
            this.isLeaving = true
            window.location.assign('/versions/' + portal.name + '/')
        })
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
