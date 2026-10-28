class Versions extends Phaser.Scene {
    constructor() {
        super('Versions')
    }

    create() {
        // Arrive beside the left-hand return entrance, as in the other rooms.
        playerPositionX = 145
        playerPositionY = 490
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.physics.add.collider(this.player, platforms)

        // Leave the existing stage background visible throughout the chamber.
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
            // Outline the capsule without obscuring the existing background.
            this.add.rectangle(archive.x, archive.ledgeY - 65, 195, 145,
                0x000000, 0).setStrokeStyle(2, 0x83c6c4).setDepth(1)
            this.add.text(archive.x, archive.ledgeY - 100, archive.label, {
                fontSize: '23px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)
            this.add.text(archive.x, archive.ledgeY - 72, 'ARCHIVE', {
                fontSize: '12px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)

            platforms.create(archive.x, archive.ledgeY, 'ground')
                .setScale(0.5, 1.0).refreshBody()

            const portal = this.archivePortals.create(
                archive.x, archive.ledgeY - 26, 'portal'
            ).setName(archive.label).setImmovable(true)
            portal.body.allowGravity = false
            portal.play('portalAnimation')
            portal.setDepth(5)
        })

        // One continuous center ledge replaces the four small stepping stones.
        platforms.create(400, 340, 'ground').setScale(0.8, 0.8).refreshBody()

        // Return through the left-side entry portal.
        this.add.text(85, 480, 'Back to Menu', {
            fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(6)
        const backPortal = this.archivePortals.create(65, 515, 'portal')
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
            // Require leaving and re-entering the portal before opening again.
            if (this.archiveOpened) return
            this.archiveOpened = true
            window.open('/versions/' + portal.name + '/', '_blank', 'noopener,noreferrer')
            this.time.delayedCall(1200, () => { this.archiveOpened = false })
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
