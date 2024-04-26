class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial')
    }

    preload() {
    }

    create() {
        // Init
        playerSprite = init.randomizePlayerSprite() // Random or select

        // Check if playing again from same scene
        // if (previousSceneKey === 'MainMenu') {
        playerPositionX = 2300
        playerPositionY = 500
        // }

        // Adjust boundary
        gameWidth = this.sys.game.config.width
        xAddBounds = 1600

        init.setupScene(this, init.randomizePlayerSprite(), false)

        // Get scores
        init.apiFetch(env.API_URL + '/scores').then((data) => {
            init.printScores(this, data, 400, 100)
        })

        // NPC
        npc = this.physics.add.staticGroup()

        npc.create(50 + gameWidth, 505, 'announcement').setImmovable(true).setScale(.5).setDepth(2)

        // Add invisible barriers at the edges of the game world
        barriers = this.physics.add.staticGroup()

        this.physics.add.collider(player, npc, this.showGameModes, null, this)

        leftBarrier = barriers.create(-50 + xAddBounds, 300, 'left-barrier').setImmovable(true).setDepth(5)
        rightBarrier = barriers.create(50 + gameWidth + xAddBounds, 300, 'right-barrier').setImmovable(true).setDepth(5)

        // Set up collisions between the player and the barriers
        this.physics.add.collider(player, barriers)

        // Set up the camera bounds
        this.cameras.main.setBounds(0, 0, gameWidth + xAddBounds, 600)

        // Ensure that the initial camera position is within the bounds
        // this.cameras.main.centerToBounds()
        this.cameras.main.startFollow(player, true, 0.08, 0.08);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup()

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        platforms.create(800, 568, 'ground').setScale(2).refreshBody()
        platforms.create(1200, 568, 'ground').setScale(2).refreshBody()
        platforms.create(1600 + xAddBounds, 568, 'ground').setScale(2).refreshBody()
        platforms.create(2000, 568, 'ground').setScale(2).refreshBody()
        platforms.create(2400, 568, 'ground').setScale(2).refreshBody()

        // Animations

        // Add portals for navigation
        this.add.text(45,  470, '<- Main Menu', {fontSize: '18px', fill: '#FFF'})
        portals.create(60, 500, 'portal').setImmovable(false).setName('title')

        // Play animation for portals
        portals.children.iterate(function (child) {
            child.play('portalAnimation')
        })

        this.physics.add.collider(portals, platforms)
        this.physics.add.collider(player, portals, this.selectMenu, null, this)

        // Speech bubbles
        init.setSpeechBubbleAnimations(this, 'silent', 1.5, -1)

        let silent = speechBubbles.create(75 + gameWidth, 470, 'silent').setImmovable(false).setScale(1).setDepth(3)
        silent.body.allowGravity = false
        silent.play('silent')

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.createStars()

        bombs = this.physics.add.group()

        //  The score
        scoreText = this.add.text(60 + gameWidth + gameWidth, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'})

        //  The stage
        stageText = this.add.text(60 + gameWidth + gameWidth, 46, 'Stage: 1', {fontSize: '32px', fill: '#FFF'})

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(bombs, platforms)

        // Colliders for barriers
        this.physics.add.collider(platforms, barriers)
        this.physics.add.collider(bombs, barriers)

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this)

        this.physics.add.collider(player, bombs, this.hitBomb, null, this)

        // tutorialText = this.add.text(gameWidth + 900 + xAddBounds, 140, 'Hop around to collect coins.', {
        tutorialText = this.add.text(2500, 140, 'Hop around to collect coins.', {
            fontSize: '24px',
            fill: '#FFF',
            align: 'center'
        })

        // Center
        tutorialText.setOrigin(0.5)
        tutorialText.x = (gameWidth + xAddBounds) - 400

        tutorialDialogue = this.add.text(gameWidth + 200 + xAddBounds, 570, 'Hmmm. What does it say above me?', {
            fontSize: '24px',
            fill: '#FFF'
        })

        // Center
        tutorialDialogue.setOrigin(0.5)
        tutorialDialogue.x = (gameWidth + xAddBounds) - 400

        // Instructions
        instructions.destroy()

        // Audio
        sfx = this.cache.json.get('sfx')

        music = this.sound.add('start', {volume: 1, loop: true})
        music.play()

        // Add buttons after game over
        this.buttons = this.physics.add.group()

        this.buttons.create(-20 + xAddBounds, 350, 'menu').setScale(.5).setName('menu').setImmovable(false)
            .body.allowGravity = false

        this.buttons.create(830 + xAddBounds, 500, 'arcade').setScale(.5).setName('arcade').setImmovable(false)
            .body.allowGravity = false

        this.buttons.setVisible(false)
    }

    update() {
        this.updateCamera()

        this.followPlayerSpeech()

        this.followPlayerScore()

        init.monitorMuteStatus(game)

        // Movements
        init.setPlayerMovements(this)
    }

    selectMenu(player, menu) {
        // Reset data
        score = 0

        if (menu.name === 'title') {

            this.physics.pause()
            music.stop()
            previousSceneKey = this.scene.key

            // Change starting position
            playerPositionX = 100
            playerPositionY = 500

            init.fadeInScene('MainMenu', this)
        }
    }

    followPlayerSpeech() {
        if (playerSpeechBubble) {
            playerSpeechBubble.x = player.x + 20
            playerSpeechBubble.y = player.y - 25
        }
    }

    followPlayerScore() {
        if (followCamera) {
            // For reference later
            // if (player.x < 400) {
            //     scoreText.x = 60
            //     stageText.x = 60
            // } else {
            //     scoreText.x = player.x - 300
            //     stageText.x = player.x - 300
            // }
        }
    }

    createStars() {
        stars = this.physics.add.group({
            key: 'coin',
            repeat: 5,
            setXY: {x: 225 + xAddBounds, y: 340, stepX: 70}
        })

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))

            child.body.allowGravity = false

        })
    }

    collectStar(player, star) {
        //  Add and update the score
        score += 10
        scoreText.setText('Score: ' + score)

        this.sound.playAudioSprite('sfx', 'ping')

        star.disableBody(true, true)

        if (stars.countActive(true) === 0) {
            tutorialStage++
            if (tutorialStage === 2) {

                tutorialText.setText('Collecting all coins \n will make a bomb appear.')

                tutorialDialogue.setText('Good thing only balls appear in tutorial!')
                tutorialDialogueText = 'Good thing only balls appear in tutorial!'
            }

            if (tutorialStage === 3) {

                tutorialText.setText('Each star completion \n will move to next stage.')

                tutorialDialogue.setText(`Seems easy enough. Let's reach stage 4.`)
                tutorialDialogueText = `Seems easy enough. Let's reach stage 4.`
            }

            if (tutorialStage === 4) {

                tutorialText.setText('Each star completion will move to next stage.')

                // Remove scores and stage
                scoreText.x = 5000
                stageText.x = 5000

                // Adjust camera
                leftBarrier.disableBody(true, true)
                leftBarrier = barriers.create(-50 + gameWidth, 300, 'left-barrier').setImmovable(true).setDepth(5)

                followCamera = true

                tutorialDialogue.setText(`A path opened up on the left.`)
                tutorialDialogueText = `A path opened up on the left.`
            }

            //  Update stage
            stageText.setText('Stage: ' + ++stage)

            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 340, true, true)

                child.body.allowGravity = false
            })

            init.createBomb(this, bombs, player, 0, 'bomb-ball')
            this.createBomb(this, 'bomb-ball')
        }
    }

    createBomb(player, sprite) {

        let bomb = bombs.create(Phaser.Math.Between(gameWidth + xAddBounds + 100, xAddBounds + 300), 16, sprite)
        bomb.setBounce(1)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        bomb.allowGravity = false

        this.sound.playAudioSprite('sfx', 'shot')
    }

    hitBomb(player, bomb) {
        init.setSpeechBubbleAnimations(this, 'ow', 8, 0)

        playerSpeechBubble = speechBubbles.create(player.x - 100, player.y - 100, 'ow').setImmovable(false).setScale(1).setDepth(3)
        playerSpeechBubble.body.allowGravity = false
        playerSpeechBubble.play('ow')

        this.physics.add.collider(speechBubbles, platforms)

        this.sound.playAudioSprite('sfx', 'numkey')
    }

    showGameModes() {

        followCamera = true

        // Quick play
        tutorialText.setText('Game Modes: \n \n Quick play is \n practice mode \n with the latest \n features included.\n Scores are not recorded. \n \n \n Ranked is playing \n on a single level \n with a set of fixed features. \n \n The goal is to get the highest score.')
        tutorialText.x = (gameWidth + xAddBounds) - 1200

        tutorialDialogue.setText(`Oh? I moved back... No, wall of texts! Skip!`)
        tutorialDialogue.x = (gameWidth + xAddBounds) - 1200

        // Ranked play
        this.add.text(120, 30, 'Scores are displayed after ranked game.', {
            fontSize: '24px',
            fill: '#FFF',
            align: 'center'
        })

        this.add.text(400, 570, `Finally, It's done.`, {
            fontSize: '24px',
            fill: '#FFF'
        }).setOrigin(0.5)

        // Iterate over each NPC in the static group
        npc.children.iterate(function (child) {
            // Disable collider between player and NPC
            this.physics.world.disableBody(child.body)
        }, this)

        // Move player
        player.x = 1100

        // Remove left barrier
        leftBarrier.disableBody(true, true)
        leftBarrier = barriers.create(-50, 300, 'left-barrier').setImmovable(true).setDepth(5)
    }

    // Function to update the camera position
    updateCamera() {
        // Check if the condition to unlock camera movement is met
        if (this.cameras.main.scrollX < 1100) {

            if (tutorialStage === 4) {
                tutorialStage++

                rightBarrier.disableBody(true, true)
                rightBarrier = barriers.create(50 + (gameWidth * 2), 300, 'right-barrier').setImmovable(true).setDepth(5)

                tutorialText.setText('Check the notice board.')
                tutorialText.x = (gameWidth + xAddBounds) - 1200

                tutorialDialogue.setText(`What's in here?`)
                tutorialDialogue.x = (gameWidth + xAddBounds) - 1200

                // Update the camera position based on player or other events
                this.cameras.main.scrollX = 800

                // Disable follow
                followCamera = false
            }
        }

        // Disable follow
        if (followCamera) {
            this.cameras.main.startFollow(player, true, 0.08, 0.08)
        } else {
            this.cameras.main.stopFollow()
        }
    }
}
