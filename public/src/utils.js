let init = {}

let player
let playerName
let playerPositionX = 100
let playerPositionY = 450
let playerSprite
let stars
let bombs
let sky
let skyIndex = 1
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
        if (skyIndex === 7) {
            skyIndex = 1
        }

        scene.changeBackground('sky' + skyIndex)
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

init.createBomb = function (scene, bombs, player, delay) {
    // Spawn bomb after 3 seconds
    setTimeout(() => {
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

        let bomb = bombs.create(x, 16, 'bomb-r')
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

init.setSceneBackground = function (sceneName) {
    switch (sceneName) {
        case 'MainMenu':
            init.changeBackground('pattern.webp', 'initial', 'repeat')
            break
        case 'Arcade':
            init.changeBackground('sky.png', 'cover', 'no-repeat')
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
// document.getElementById('container').style.backgroundImage="url(/assets/bg/john-cosio-RxjSW-seIp0-unsplash.jpg)"
// document.getElementById('container').style.backgroundSize="cover"
// document.getElementById('container').style.backgroundRepeat="no-repeat"


init.repeatingBackground = function (scene, key) {
    // Define the size of the canvas
    const canvasWidth = scene.sys.game.config.width // Width of the canvas
    const canvasHeight = scene.sys.game.config.height // Height of the canvas

    // Define the size of the image
    const imageWidth = 100 // Width of each image
    const imageHeight = 100 // Height of each image

    // Calculate the number of rows and columns needed
    const numColumns = Math.floor(canvasWidth / imageWidth)
    const numRows = Math.floor(canvasHeight / imageHeight)

    // Calculate the spacing between each image to cover the whole canvas
    const spacingX = canvasWidth / numColumns
    const spacingY = canvasHeight / numRows

    // Loop to create the images
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            // Calculate the position of each image based on the row, column, and spacing
            const posX = (j + 0.5) * spacingX // Add 0.5 to center the images within each cell
            const posY = (i + 0.5) * spacingY // Add 0.5 to center the images within each cell

            // Create the image
            const image = scene.add.image(posX, posY, key)

            // Optionally, set properties for each image
            image.setScale(0.6) // Example: Set scale
            // image.setOrigin(0.5) // Example: Set origin
        }
    }
}