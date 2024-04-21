let init = {}

let player
let playerName
let playerPositionX = 750
let playerPositionY = 200
let playerSprite
let stars
let bombs
let sky
let skyIndex = 0
let platforms
let cursors
let score = 0
let scoreText
let gameOver = false
let gameOverSound = true
let stage = 1
let stageText
let instructions
let instructionsText
let sfx
let music
let muteButton
let menuButton
let playButton
let arcadeButton
let rankedButton
let isMute = false
let previousSceneKey
// Ranked
let level
let levelLabel
let env

// Get env
init.apiFetch = async function fetchJSONData(path) {
    let data

    const res = await fetch(path)

    data = await res.json()

    return data
}

init.fadeOutScene = function (sceneName, context) {
    context.cameras.main.fadeOut(1700)
    context.time.addEvent({
        delay: 1700,
        callback: function () {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}

init.fadeInScene = function (sceneName, context) {
    context.cameras.main.fadeIn(250)
    context.time.addEvent({
        delay: 250,
        callback: function () {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}

// Add functions that should be applied to all scenes
// E.g. (this, 'dude/Player sprite key')
init.setupScene = function (scene, player) {
    init.addBorders(scene)
    init.setPlayerSprite(scene, player)
    init.setPlayerAnimations(scene, player)
    init.setInputEvents(scene)
    init.addMuteButton(scene)
    init.setSceneBackground(scene.scene.key)
}

init.addBorders = function (scene) {
    // Get the width and height of the game canvas
    const gameWidth = scene.sys.game.config.width
    const gameHeight = scene.sys.game.config.height

    // Create a graphics object
    const graphics = scene.add.graphics()

    // Set the line style for the border
    const borderWidth = 1 // Adjust the border width as needed
    const borderColor = 0x21572f // Adjust the border color as needed
    const alpha = 1 // Adjust the alpha (transparency) as needed
    graphics.lineStyle(borderWidth, borderColor, alpha)

    // Draw the left border
    graphics.strokeRect(0, 0, borderWidth, gameHeight)

    // Draw the right border
    graphics.strokeRect(gameWidth - borderWidth, 0, borderWidth, gameHeight)
}

init.setPlayerSprite = function (scene, key) {
    player = scene.player = scene.physics.add.sprite(playerPositionX, playerPositionY, key)

    // Player physics properties. Give the little guy a slight bounce.
    player = scene.player.setBounce(0.2)
    player = scene.player.setCollideWorldBounds(true)
}

init.randomizePlayerSprite = function () {
    // Randomize player sprite
    let spriteArray = [
        'dude',
        'piccolo'
    ];

    return spriteArray[Math.floor(Math.random() * spriteArray.length)]
}

init.setPlayerAnimations = function (scene, key) {
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers(key, {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'turn',
        frames: [{key: key, frame: 4}],
        frameRate: 20
    })

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers(key, {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    })

    // Game over animations
    scene.anims.create({
        key: 'eleft',
        frames: scene.anims.generateFrameNumbers('explode', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: 'eturn',
        frames: [{key: 'explode', frame: 4}],
        frameRate: 20
    })

    scene.anims.create({
        key: ['eright'],
        frames: scene.anims.generateFrameNumbers('explode', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    })
}

init.setInputEvents = function (scene) {
    scene.cursors = scene.input.keyboard.createCursorKeys()

    scene.cursors = scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    })
}

init.setPlayerMovements = function (scene) {
    let animations
    let alive = ['left', 'right', 'turn']
    let dead = ['eleft', 'eright', 'eturn']

    if (gameOver) {
        animations = dead
    } else {
        animations = alive
    }

    if (scene.cursors.left.isDown) {
        scene.player.setVelocityX(-160)

        scene.player.anims.play(animations[0], true)
    } else if (scene.cursors.right.isDown) {
        scene.player.setVelocityX(160)

        scene.player.anims.play(animations[1], true)
    } else {
        scene.player.setVelocityX(0)

        scene.player.anims.play(animations[2])
    }

    if (scene.cursors.up.isDown && scene.player.body.touching.down) {
        scene.player.setVelocityY(-330)
        scene.sound.playAudioSprite('sfx', 'squit');
    }
}

init.createStars = function (scene) {
    stars = scene.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
    })

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))

    })
}

init.collectStar = function (scene, player, star) {
    scene.sound.playAudioSprite('sfx', 'ping')

    star.disableBody(true, true)

    //  Add and update the score
    score += 10
    scoreText.setText('Score: ' + score)

    // Switch music when reaching stage 5
    if (score === 600) {
        music.stop()

        music = scene.sound.add('hard')
        music.play()
    }

    // Change background on score
    if ((score % 360) === 0) {
        scene.sound.playAudioSprite('sfx', 'numkey')

        skyIndex++

        // Reset background
        if (skyIndex === 6) {
            skyIndex = 0
        }

        init.changeBackgroundOnScore()
    }

    if (stars.countActive(true) === 0) {
        //  Update stage
        stageText.setText('Stage: ' + ++stage)

        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true)
        })

        init.createBomb(scene, bombs, player, 0)
    }

}

init.createBomb = function (scene, bombs, player, delay, sprite) {
    // Spawn bomb after 3 seconds
    setTimeout(() => {
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

        let bomb = bombs.create(x, 16, sprite)
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        bomb.allowGravity = false

        scene.sound.playAudioSprite('sfx', 'shot')
    }, delay);

}

init.changeBackground = function (filename, size, repeat) {
    document.getElementById('container').style.backgroundImage = 'url(/assets/bg/' + filename + ')'
    document.getElementById('container').style.backgroundSize = size
    document.getElementById('container').style.backgroundRepeat = repeat
}

init.changeBackgroundOnScore = function () {
    let backgrounds = [
        'sky.png',
        'john-cosio-xCZ8ynsCfrw-unsplash.jpg',
        'aleksandra-khaprenko-0PPw9irzLIw-unsplash.jpg',
        'nathan-dumlao-kME9jbKd--s-unsplash.jpg',
        'dan-asaki-K0mJQlbu9Yo-unsplash.jpg',
        'john-cosio-RxjSW-seIp0-unsplash.jpg',
    ]

    init.changeBackground(backgrounds[skyIndex], 'cover', 'no-repeat')
}

init.setSceneBackground = function (sceneName) {
    switch (sceneName) {
        case 'MainMenu':
            init.changeBackground('pattern.webp', 'initial', 'repeat')
            break
        case 'Arcade':
            init.changeBackground('sky.png', 'cover', 'no-repeat')
            break
        case 'RankedMenu':
            init.changeBackground('john-cosio-xCZ8ynsCfrw-unsplash.jpg', 'cover', 'no-repeat')
            break
        default:
            init.changeBackground('pattern.webp', 'initial', 'repeat')
            break
    }
}

// Add common buttons
init.addMuteButton = function (scene) {
    let soundToggle = 'sound'
    if (isMute) {
        soundToggle = 'mute'
    }
    muteButton = scene.add.image(770, 30, soundToggle)
        .setInteractive()
        .on('pointerdown', () => init.toggleSound())
}

init.toggleSound = function () {
    if (isMute) {
        muteButton.setTexture('sound', 0)
        isMute = false

        return
    }

    isMute = true
    muteButton.setTexture('mute', 0)
}

// Game over
init.gameOverReset = function (scene, newScene, newPositionX, newPositionY) {
    scene.physics.pause()

    // Set sound
    gameOverSound = true

    // Set status
    gameOver = false

    // Set background
    skyIndex = 1

    // Set player position
    playerPositionX = newPositionX
    playerPositionY = newPositionY

    previousSceneKey = scene.scene.key

    init.fadeInScene(newScene, scene)
}

// Ranked
init.getScores = async function () {
    return await fetch(env.API_URL + "/scores", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
}

// Ranked
init.printScores = function (scene, scores) {

    let rank = 0

    let startingY = 100

    for (const [key, value] of Object.entries(scores.data)) {
        ++rank

        // Only get 9
        if (rank < 10) {

            // Format date
            const date = new Date(`${value.date}`).toISOString().slice(0, 10)

            // Score
            let score = scene.add.text(400, startingY, rank + '    ' + `${value.name}` + '    ' + `${value.score}` + '    ' + date, {
                fontSize: '24px',
                fill: '#fff'
            })

            // Set the origin of the text to its center
            score.setOrigin(0.5)

            startingY+= 30
        }
    }
}
