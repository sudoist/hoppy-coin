class Versions extends Phaser.Scene {
    constructor() {
        super('Versions')
    }

    create() {
        init.setupScene(this, 'dude')

        platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.physics.add.collider(this.player, platforms)

        this.add.text(400, 85, 'HOPPY COIN - VERSIONS', {
            fontSize: '28px', fill: '#FFF'
        }).setOrigin(0.5)

        this.add.text(400, 140, 'Walk into a portal to explore an older build', {
            fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5)

        // Until historical builds are hosted, links are explicitly source archives.
        const archives = [
            {label: 'v0.0', x: 115},
            {label: 'v0.1', x: 255},
            {label: 'v0.2', x: 395},
            {label: 'v1.0', x: 535}
        ]

        this.archivePortals = this.physics.add.group()
        archives.forEach((archive) => {
            this.add.text(archive.x, 420, archive.label, {
                fontSize: '20px', fill: '#FFF'
            }).setOrigin(0.5)

            const portal = this.archivePortals.create(archive.x, 510, 'portal')
                .setName(archive.label).setImmovable(true)
            portal.body.allowGravity = false
            portal.play('portalAnimation')
        })

        this.add.text(400, 345, 'Historical source archives (playable builds coming later)', {
            fontSize: '15px', fill: '#FFF'
        }).setOrigin(0.5)

        this.add.text(690, 420, 'Back', {
            fontSize: '20px', fill: '#FFF'
        }).setOrigin(0.5)
        const back = this.archivePortals.create(690, 510, 'portal')
            .setName('back').setImmovable(true)
        back.body.allowGravity = false
        back.play('portalAnimation')

        this.physics.add.overlap(this.player, this.archivePortals, (player, portal) => {
            if (portal.name === 'back') {
                this.physics.pause()
                playerPositionX = 400
                playerPositionY = 500
                init.fadeInScene('MainMenu', this)
                return
            }

            // Prevent repeat tabs while the player overlaps the same portal.
            portal.disableBody(true, true)
            window.open('https://github.com/sudoist/hoppy-coin/tree/' + portal.name,
                '_blank', 'noopener,noreferrer')
        })

        this.physics.add.collider(this.player, this.archivePortals)
    }

    update() {
        init.monitorMuteStatus(game)
        init.setPlayerMovements(this)
    }
}
