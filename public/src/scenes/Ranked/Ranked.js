// Recolor the existing platform sprites without changing their dimensions or physics.
// The base art is flat green; separate cached textures keep stage palettes isolated.
function ensureRankedPlatformPalette(scene, theme) {
    const palette = theme === 'arcticClassic'
        ? {top: [240, 249, 255], side: [168, 198, 217]}
        : {top: [223, 183, 117], side: [143, 96, 55]}

    for (const base of ['ground', 'ground-s']) {
        const key = theme + '-' + base
        if (scene.textures.exists(key)) continue

        const source = scene.textures.get(base).getSourceImage()
        const width = source.width
        const height = source.height
        const texture = scene.textures.createCanvas(key, width, height)
        const ctx = texture.getContext()
        ctx.drawImage(source, 0, 0)

        const pixels = ctx.getImageData(0, 0, width, height)
        const data = pixels.data
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 765
            const shade = brightness > 0.35 ? palette.top : palette.side
            const factor = 0.75 + brightness * 0.35
            data[i] = Math.min(255, Math.round(shade[0] * factor))
            data[i + 1] = Math.min(255, Math.round(shade[1] * factor))
            data[i + 2] = Math.min(255, Math.round(shade[2] * factor))
        }
        ctx.putImageData(pixels, 0, 0)
        texture.refresh()
    }
}

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

        // Obtain a server-issued token at the start of each competitive run.
        this.runTokenPromise = init.startRankedRun(levelLabel)

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

        // Stage-specific platform art; existing bodies and placement stay untouched.
        if (level === 'arcticClassic' || level === 'landMineBeach') {
            ensureRankedPlatformPalette(this, level)
            platforms.children.iterate(child => {
                if (!child) return
                const base = child.texture.key
                if (base === 'ground' || base === 'ground-s') {
                    child.setTexture(level + '-' + base)
                }
            })
        }

        // Twelve coins per batch; each completed batch adds one bomb.
        init.createStars(this)

        //  The score
        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 4})

        //  The stage
        stageText = this.add.text(16, 46, 'Stage: 1', {fontSize: '32px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 4})

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(bombs, platforms)

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this)

        this.physics.add.collider(player, bombs, this.hitBomb, null, this)

        // Initial bomb after 3 seconds, then one per 12 collected coins.
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

                // Beach gameplay stays unchanged until death. After death, clear
                // the minefield and provide a stable floor for portal navigation.
                if (level === 'landMineBeach') {
                    bombs.children.iterate(child => {
                        if (child && child.active) child.disableBody(true, true)
                    })
                    platforms.children.iterate(child => {
                        if (child && child.active) child.disableBody(true, true)
                    })
                    platforms.create(400, 568, 'landMineBeach-ground').setScale(2).refreshBody()
                    this.player.setPosition(400, 475)
                    this.player.setVelocity(0, 0)
                    this.player.setCollideWorldBounds(true)
                }

                // Get scores
                init.apiFetch(init.scoreApiUrl() + '/scores?level=' + encodeURIComponent(levelLabel)).then((data) => {
                    init.printScores(this, data)
                    if (data.unavailable) {
                        this.add.text(400, 225, 'Leaderboard offline - scores cannot be saved', {
                            fontSize: '17px', fill: '#ffe28a'
                        }).setOrigin(0.5)
                    }

                    const result = RankedResults.qualification(data, score)

                    // Print message
                    instructions.destroy()

                    if (result.qualified) {
                        // Clear old scores
                        leaderboard.destroy()

                        // Keep Land Mine Beach's hazard layout intact; only rebuild
                        // the standard results arena for other stages.
                        if (level !== 'landMineBeach') {
                        // Clear ledges then re add ground
                        platforms.children.iterate(function (child) {
                            child.disableBody(true, true)
                        })

                        platforms.create(400, 568, level === 'arcticClassic' ? 'arcticClassic-ground' : 'ground').setScale(2).refreshBody()

                        // Now let's create some ledges
                        platforms.create(100, 280, level === 'arcticClassic' ? 'arcticClassic-ground' : 'ground')
                        platforms.create(350, 280, level === 'arcticClassic' ? 'arcticClassic-ground' : 'ground')
                        platforms.create(900, 380, level === 'arcticClassic' ? 'arcticClassic-ground' : 'ground')
                        }

                        instructionsText = `Congratulations! \n Don't forget to submit your score.`
                        instructions = this.add.text(230, 565, instructionsText, {
                            fontSize: '24px',
                            fill: '#FFF',
                            stroke: '#152b3d', strokeThickness: 3,
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
                        inputPlayerNameText = this.add.text(470, 40, '_ _ _', {fontSize: '24px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
                    } else {
                        RankedResults.showFeedback(this, result.message)
                    }

                    // Add portals for navigation
                    let playAgain = this.add.text(645, 470, 'Play again ->', {fontSize: '18px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
                    directions.push(playAgain)
                    portals.create(770, 500, 'portal').setImmovable(false).setName('ranked')

                    let backToRanked = this.add.text(600, 130, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
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

                // Preserve Land Mine Beach's original platform and mine layout.
                if (level !== 'landMineBeach') {
                // Clear ledges then re add ground
                platforms.children.iterate(function (child) {
                    child.disableBody(true, true)
                })

                platforms.create(400, 568, level === 'arcticClassic' ? 'arcticClassic-ground' : 'ground').setScale(2).refreshBody()
                }

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
                    "path": init.scoreApiUrl() + '/scores',
                    "name": playerName,
                    "score": score,
                    "level": levelLabel,
                }

                this.runTokenPromise.then(token => init.apiPost({...req, token})).then((data) => {
                    if (data.unavailable) {
                        this.add.text(400, 220, 'Score not saved: leaderboard unavailable', {
                            fontSize: '18px', fill: '#ffe28a'
                        }).setOrigin(0.5)
                    }
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
                    this.add.text(20, 470, '<- Play again', {fontSize: '18px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
                    portals.create(35, 500, 'portal').setImmovable(false).setName('ranked')

                    this.add.text(600, 470, 'Back to ranked ->', {fontSize: '18px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
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
