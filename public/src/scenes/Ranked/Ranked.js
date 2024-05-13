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

        bombs = this.physics.add.group()

        // Set platforms depending on level
        if (level === 'phaserInitial') {
            // Here we create the ground.
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(600, 400, 'ground')
            platforms.create(50, 250, 'ground')
            platforms.create(750, 220, 'ground')

            // Change background
            init.changeBackground('sky.png', 'cover', 'no-repeat')
        } else if (level === 'quickPlay') {
            // Here we create the ground.
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(200, 400, 'ground')
            platforms.create(745, 250, 'ground')
            platforms.create(60, 220, 'ground')

            // Change background
            init.changeBackground('sky.png', 'cover', 'no-repeat')
        } else if (level === 'arcticClassic') {
            // Here we create the ground.
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(18, 170, 'ground-s')
            platforms.create(325, 220, 'ground-s')
            platforms.create(609, 199, 'ground-s')
            platforms.create(800, 399, 'ground-s')
            platforms.create(260, 370, 'ground')

            // Change background
            init.changeBackground('aleksandra-khaprenko-0PPw9irzLIw-unsplash.jpg', 'cover', 'no-repeat')
        } else if (level === 'landMineBeach') {
            // Here we create the ground.
            platforms.create(150, 568, 'ground-s').setScale(2).refreshBody()
            platforms.create(450, 568, 'ground-s').setScale(2).refreshBody()
            platforms.create(550, 568, 'ground-s').setScale(2).refreshBody()

            // Now let's create some ledges
            platforms.create(18, 170, 'ground-s')
            platforms.create(325, 220, 'ground-s')
            platforms.create(609, 190, 'ground-s')
            platforms.create(710, 410, 'ground-s')
            platforms.create(750, 410, 'ground-s')
            platforms.create(260, 370, 'ground')

            const levelBombs = [
                // Left
                {
                    x: 3,
                    y: 595,
                },
                {
                    x: 10,
                    y: 595,
                },
                {
                    x: 20,
                    y: 594,
                },
                {
                    x: 30,
                    y: 598,
                },
                {
                    x: 37,
                    y: 597,
                },
                {
                    x: 50,
                    y: 596,
                },
                // Mid
                {
                    x: 249,
                    y: 597,
                },
                {
                    x: 260,
                    y: 595,
                },
                {
                    x: 267,
                    y: 599,
                },
                {
                    x: 289,
                    y: 598,
                },
                {
                    x: 280,
                    y: 595,
                },
                {
                    x: 309,
                    y: 599,
                },
                {
                    x: 330,
                    y: 599,
                },
                {
                    x: 330,
                    y: 594,
                },
                {
                    x: 353,
                    y: 595,
                },
                {
                    x: 300,
                    y: 596,
                },
                {
                    x: 320,
                    y: 594,
                },
                {
                    x: 340,
                    y: 598,
                },
                // Right
                {
                    x: 550,
                    y: 595,
                },
                {
                    x: 560,
                    y: 596,
                },
                {
                    x: 571,
                    y: 599,
                },
                {
                    x: 580,
                    y: 598,
                },
                {
                    x: 589,
                    y: 598,
                },
                {
                    x: 600,
                    y: 595,
                },
                {
                    x: 609,
                    y: 594,
                },
                {
                    x: 620,
                    y: 597,
                },
                {
                    x: 627,
                    y: 594,
                },
                {
                    x: 640,
                    y: 598,
                },
                {
                    x: 651,
                    y: 594,
                },
                {
                    x: 660,
                    y: 597,
                },
                {
                    x: 671,
                    y: 599,
                },
                {
                    x: 680,
                    y: 597,
                },
                {
                    x: 690,
                    y: 593,
                },
                {
                    x: 700,
                    y: 595,
                },
                {
                    x: 710,
                    y: 599,
                },
                {
                    x: 720,
                    y: 596,
                },
                {
                    x: 730,
                    y: 593,
                },
                {
                    x: 740,
                    y: 600,
                },
                {
                    x: 748,
                    y: 598,
                },
                {
                    x: 760,
                    y: 594,
                },
                {
                    x: 772,
                    y: 596,
                },
                {
                    x: 780,
                    y: 599,
                },
                {
                    x: 788,
                    y: 597,
                },
                {
                    x: 792,
                    y: 597,
                },
            ]

            // Add the bombs
            for (const levelBomb of levelBombs) {
                init.createLevelBomb(this, bombs, levelBomb.x, levelBomb.y, 'bomb-r')
            }

            // Change background
            init.changeBackground('john-cosio-8SWaKcmZC5w-unsplash.jpg', 'cover', 'no-repeat')
        }

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        init.createStars(this)

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
                init.apiFetch(env.API_URL + '/scores?level=' + levelLabel).then((data) => {
                    init.printScores(this, data)

                    // Score message text below... The effort to just say git gud!
                    let rank = 0
                    let lastPlaceScore = 0

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
                    let playAgain = this.add.text(645, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF'})
                    directions.push(playAgain)
                    portals.create(770, 500, 'portal').setImmovable(false).setName('ranked')

                    let backToRanked = this.add.text(600, 130, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF'})
                    directions.push(backToRanked)
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

                instructions = this.add.text(230, 565, `Congratulations ` + playerName + `!`, {
                    fontSize: '24px',
                    fill: '#FFF',
                    align: 'center'
                })

                // Center
                instructions.setOrigin(0.5);
                instructions.x = this.cameras.main.width / 2

                scoreText.destroy()
                stageText.destroy()

                // Send score to API
                const req = {
                    "path": env.API_URL + '/scores',
                    "name": playerName,
                    "score": score,
                    "level": levelLabel,
                }

                init.apiPost(req).then((data) => {
                    // Clear old scores
                    leaderboard.destroy()

                    // Print updated score
                    init.printScores(this, data)

                    // After saving score, show menu

                    // Removed the existing portals
                    portals.children.iterate(function (child) {
                        child.disableBody(true, true)
                    })

                    directions.forEach(text => text.destroy());

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

    collectStar(player, star) {
        init.collectStar(this, player, star)
    }

    hitBomb(player, bomb) {
        bomb.destroy()

        gameOver = true
    }
}
