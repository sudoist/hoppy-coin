class Versions extends Phaser.Scene {
    constructor() {
        super('Versions')
    }

    create() {
        playerPositionX = 65
        playerPositionY = 500
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        this.physics.add.collider(this.player, platforms)

        // A simple boss-rematch-inspired chamber, using existing art.
        this.add.rectangle(400, 290, 720, 380, 0x101b3b, 0.72).setDepth(0)
        this.add.text(400, 55, 'VERSION CHAMBER', {
            fontSize: '28px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)
        this.add.text(400, 104, 'Jump onto a ledge and enter a portal', {
            fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)

        const archives = [
            {label: 'v0.0', x: 105, y: 435},
            {label: 'v0.1', x: 295, y: 365},
            {label: 'v0.2', x: 505, y: 365},
            {label: 'v1.0', x: 695, y: 435}
        ]

        this.archivePortals = this.physics.add.group()
        archives.forEach((archive) => {
            // Each chamber has a distinct landing ledge and portal.
            const ledgeY = archive.y + 40
            this.add.rectangle(archive.x, (150 + ledgeY) / 2, 150, ledgeY - 150,
                0x243b65, 0.9).setStrokeStyle(3, 0x83c6c4).setDepth(1)
            this.add.text(archive.x, 195, archive.label, {
                fontSize: '24px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(3)
            this.add.text(archive.x, 238, 'ARCHIVE', {
                fontSize: '13px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(3)

            // Use the same physics platform asset as the other stages.
            platforms.create(archive.x, ledgeY, 'ground')
                .setScale(0.37).refreshBody()

            const portal = this.archivePortals.create(archive.x, ledgeY - 42, 'portal')
                .setName(archive.label).setImmovable(true)
            portal.body.allowGravity = false
            portal.play('portalAnimation')
            portal.setDepth(4)
        })

        // Center path provides stepping stones to the raised archive ledges.
        platforms.create(400, 480, 'ground').setScale(0.35).refreshBody()
        platforms.create(200, 500, 'ground').setScale(0.3).refreshBody()
        platforms.create(600, 500, 'ground').setScale(0.3).refreshBody()
        this.add.text(400, 410, 'Choose a version', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(3)

        // Match the rest of the game: walk into a portal to return.
        this.add.text(75, 520, 'Back', {
            fontSize: '18px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(6)
        const backPortal = this.archivePortals.create(65, 545, 'portal')
            .setName('back').setImmovable(true)
        backPortal.body.allowGravity = false
        backPortal.play('portalAnimation')
        backPortal.setDepth(5)

        this.physics.add.overlap(this.player, this.archivePortals, (player, portal) => {
            if (!portal.active || this.isLeaving) return
            this.isLeaving = true
            if (portal.name === 'back') {
                this.returnToMenu(true)
                return
            }
            const version = portal.name
            const destination = '/versions/' + version + '/'
            // Same-tab navigation avoids popup blockers and leaves the archive
            // responsible for providing a Return to Latest link.
            window.location.assign(destination)
        })

        this.input.keyboard.on('keydown-ESC', () => this.returnToMenu())
    }

    returnToMenu(alreadyLeaving = false) {
        if (this.isLeaving && !alreadyLeaving) return
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
