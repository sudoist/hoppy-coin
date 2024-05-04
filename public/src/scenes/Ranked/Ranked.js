class Ranked extends Phaser.Scene {
    constructor() {
        super('Ranked')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        init.setupScene(this, init.randomizePlayerSprite())

        // Stat game
        isGameStarted = true

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        // Set platforms depending on leve
        if (level === 'phaserInitial') {
            // Here we create the ground.
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(600, 400, 'ground')
            platforms.create(50, 250, 'ground')
            platforms.create(750, 220, 'ground')

            // Change background
            init.changeBackground('sky.png', 'cover', 'no-repeat')
        }

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        init.createStars(this)

        bombs = this.physics.add.group()

        //  The score
        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'})

        //  The stage
        stageText = this.add.text(16, 46, 'Stage: 1', {fontSize: '32px', fill: '#FFF'})

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(bombs, platforms)

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this)

        this.physics.add.collider(player, bombs, this.hitBomb, null, this)

        // Start game with bomb after 3 seconds
        init.createBomb(this, bombs, player, 3000, 'bomb-r')

        // Audio
        sfx = this.cache.json.get('sfx')

        music = this.sound.add('start', {volume: 1, loop: true})
        music.play()

        // Add buttons after game over
        this.buttons = this.physics.add.group()
    }

    update() {
        if (gameOver) {

            // Run one time on game over
            if (gameOverSound) {
                console.log('game over ranked')

                stars.children.iterate(function (child) {
                    child.disableBody(true, true)
                })

                // Sounds
                this.sound.playAudioSprite('sfx', 'death')
                music.stop()
                gameOverSound = false

                // Get scores
                init.apiFetch(env.API_URL + '/scores').then((data) => {
                    init.printScores(this, data)

                    // Score message text below... The effort to just say git gud!
                    let rank = 0
                    let lastPlaceScore

                    for (const [key, value] of Object.entries(data.data)) {
                        ++rank

                        // Get last score of top 10
                        if (rank < 11) {
                            lastPlaceScore = value.score
                        }
                    }

                    // Print message
                    instructions.destroy()

                    if (score >= lastPlaceScore) {
                        // Clear old scores
                        leaderboard.destroy()

                        // Clear ledges then re add ground
                        platforms.children.iterate(function (child) {
                            child.disableBody(true, true)
                        })

                        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

                        // Now let's create some ledges
                        platforms.create(100, 280, 'ground')
                        platforms.create(350, 280, 'ground')
                        platforms.create(900, 380, 'ground')

                        instructionsText = `Congratulations! \n Don't forget to submit your score.`
                        instructions = this.add.text(230, 565, instructionsText, {
                            fontSize: '24px',
                            fill: '#FFF',
                            align: 'center'
                        })

                        // Center
                        instructions.setOrigin(0.5);
                        instructions.x = this.cameras.main.width / 2

                        // Get player name
                        setTimeout(() => {

                            // Add input
                            init.displayInputButtons(this)
                        }, 2000)

                        // Setup scene
                        scene = this

                        // Add menu collider to press buttons
                        this.physics.add.overlap(this.player, this.buttons, this.buttonPress, null, this)
                        console.log(playerName)

                        // Enter name text then save score
                        inputPlayerNameLabel = this.add.text(200, 40, 'Enter your name:', {
                            fontSize: '24px',
                            fill: '#FFF'
                        })
                        inputPlayerNameText = this.add.text(470, 40, '_ _ _', {fontSize: '24px', fill: '#FFF'})
                    } else if (score > 300) {
                        if (score >= (lastPlaceScore - 200)) {
                            let text = this.add.text(200, 570, 'Almost there!', {fontSize: '24px', fill: '#FFF'})

                            // Center
                            text.setOrigin(0.5);
                            text.x = this.cameras.main.width / 2
                        } else {
                            let text = this.add.text(200, 570, 'Git gud...', {fontSize: '24px', fill: '#FFF'})

                            // Center
                            text.setOrigin(0.5)
                            text.x = this.cameras.main.width / 2
                        }
                    } else if (score < lastPlaceScore) {
                        let text = this.add.text(200, 570, 'Git gud...', {fontSize: '24px', fill: '#FFF'})

                        // Center
                        text.setOrigin(0.5)
                        text.x = this.cameras.main.width / 2
                    }

                    // Add portals for navigation
                    this.add.text(645, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF'})
                    portals.create(770, 500, 'portal').setImmovable(false).setName('ranked')

                    this.add.text(600, 130, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF'})
                    portals.create(770, 130, 'portal').setImmovable(false).setName('menu')

                    // Play animation for portals
                    portals.children.iterate(function (child) {
                        child.play('portalAnimation')
                    })

                    this.physics.add.collider(portals, platforms)

                    this.physics.add.collider(player, portals, this.selectMenu, null, this)

                    player.setDepth(4)
                })
            }

            if (inputPlayerNameSubmitted && isGameStarted) {

                inputPlayerNameSubmitted = false

                // Reset game check
                isGameStarted = false

                // Clear ledges then re add ground
                platforms.children.iterate(function (child) {
                    child.disableBody(true, true)
                })

                platforms.create(400, 568, 'ground').setScale(2).refreshBody()

                // Clear and update texts
                inputPlayerNameLabel.destroy()
                inputPlayerNameText.destroy()
                instructions.destroy()

                instructions = this.add.text(230, 565, `Congratulations ` + playerName + `! \n Don't forget to submit your score.`, {
                    fontSize: '24px',
                    fill: '#FFF',
                    align: 'center'
                })

                // Center
                instructions.setOrigin(0.5);
                instructions.x = this.cameras.main.width / 2

                // Send score to API
                const req = {
                    "path": env.API_URL + '/scores',
                    "name": playerName,
                    "score": score,
                }

                init.apiPost(req).then((data) => {
                    // Clear old scores
                    leaderboard.destroy()

                    // Print updated score
                    init.printScores(this, data)

                    // After saving score, show menu

                    // Add portals for navigation
                    this.add.text(20, 470, '<- Play again', {fontSize: '18px', fill: '#FFF'})
                    portals.create(35, 500, 'portal').setImmovable(false).setName('ranked')

                    this.add.text(600, 470, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF'})
                    portals.create(765, 500, 'portal').setImmovable(false).setName('menu')

                    // Play animation for portals
                    portals.children.iterate(function (child) {
                        child.play('portalAnimation')
                    })

                    this.physics.add.collider(portals, platforms)

                    this.physics.add.collider(player, portals, this.selectMenu, null, this)

                    player.setDepth(4)
                })
            }

            init.setPlayerMovements(this)
        } else {
            init.monitorMuteStatus(game)

            // Movements
            init.setPlayerMovements(this)
        }
    }

    selectMenu(player, menu) {
        // Reset data
        score = 0
        stage = 1

        if (menu.name === 'menu') {
            init.gameOverReset(this, 'StageSelection', 120, 170)
        }

        if (menu.name === 'ranked') {
            init.gameOverReset(this, 'Ranked', 40, 480)
        }
    }

    // TODO: Re add
    joyStickState() {
        const cursorKeys = this.joyStick.createCursorKeys()
        for (const name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                this.mobileCursorKeys = `${name}`
            }
        }
    }

    collectStar(player, star) {
        init.collectStar(this, player, star)
    }

    hitBomb(player, bomb) {
        bomb.destroy()

        gameOver = true
    }
}
