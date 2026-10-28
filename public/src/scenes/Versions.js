class Versions extends Phaser.Scene {
    constructor() {
        super('Versions')
    }

    create() {
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        // A visible floor and raised entry platforms give the chamber a route.
        platforms.create(185, 455, 'ground').setScale(0.7).refreshBody()
        platforms.create(615, 455, 'ground').setScale(0.7).refreshBody()
        this.physics.add.collider(this.player, platforms)

        // A simple boss-rematch-inspired chamber, using existing art.
        this.add.rectangle(400, 285, 650, 395, 0x101b3b, 0.72).setDepth(0)
        this.add.text(400, 55, 'VERSION CHAMBER', {
            fontSize: '28px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)
        this.add.text(400, 100, 'Walk into a portal to visit an older build', {
            fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)

        const archives = [
            {label: 'v0.0', x: 125},
            {label: 'v0.1', x: 300},
            {label: 'v0.2', x: 500},
            {label: 'v1.0', x: 675}
        ]

        this.archivePortals = this.physics.add.group()
        archives.forEach((archive) => {
            this.add.rectangle(archive.x, 310, 125, 310, 0x243b65, 0.9)
                .setStrokeStyle(3, 0x83c6c4)
            this.add.text(archive.x, 205, archive.label, {
                fontSize: '24px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)
            this.add.text(archive.x, 255, 'ARCHIVE', {
                fontSize: '13px', fill: '#FFF'
            }).setOrigin(0.5).setDepth(5)

            const portal = this.archivePortals.create(archive.x, 505, 'portal')
                .setName(archive.label).setImmovable(true)
            portal.body.allowGravity = false
            portal.play('portalAnimation')
            portal.setDepth(5)
        })

        this.add.text(400, 380, 'Choose an archive below', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(5)

        // Match the rest of the game: walk into a portal to return.
        this.add.text(400, 465, 'Back to Menu', {
            fontSize: '18px', fill: '#FFF'
        }).setOrigin(0.5).setDepth(6)
        const backPortal = this.archivePortals.create(400, 510, 'portal')
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
        playerPositionX = 400
        playerPositionY = 500
        init.fadeInScene('MainMenu', this)
    }

    update() {
        init.monitorMuteStatus(game)
        init.setPlayerMovements(this)
    }
}
