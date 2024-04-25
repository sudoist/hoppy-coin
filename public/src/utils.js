let init = {}

let player
let playerName
let playerPositionX = 100 // 100 default
let playerPositionY = 450 // 450 default
let playerSprite
let playerSpeechBubble
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
let isMute = true
let previousSceneKey
// Ranked
let env
let level
let levelLabel
let inputKeys
let inputPlayerNameLabel
let inputPlayerNameText
let inputPlayerNameSubmitted = false
let scene
let apiResponse
// Mobile
let isMobile = false
let joystickPressed
// Tutorial
let tutorialStage = 1
let tutorialText
let tutorialDialogue
let tutorialDialogueText
// Navigation
let portals
let barriers
let leftBarrier
let rightBarrier
let gameWidth
// Camera
let currentCamera
let followCamera = true
let xAddBounds = 0
// NPC
let npc
let speechBubbles

// API get
init.apiFetch = async function getRequest(path) {
    let data

    const res = await fetch(path)

    data = await res.json()

    return data
}

// API post
init.apiPost = async function postRequest(req) {
    let data

    const res = await fetch(req.path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req),
    })

    data = await res.json()

    return data
}

init.bootFadeOutScene = function (sceneName, context) {
    context.cameras.main.fadeOut(7000)
    context.time.addEvent({
        delay: 7000,
        callback: function () {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
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
init.setupScene = function (scene, player, playerBounds = true) {
    if (playerBounds) {
        init.addBorders(scene)
    }
    init.setPlayerSprite(scene, player, playerBounds)
    init.setPlayerAnimations(scene, player)
    init.setInputEvents(scene)
    init.addMuteButton(scene)
    init.setSceneBackground(scene.scene.key)
    // Create joystick on mobile
    if (init.isMobile()) {
        isMobile = true
        init.createJoystick(scene)
    }
    init.setInstructions(scene)
    init.setPortalAnimations(scene)
    init.setSpeechBubble(scene)
}

// Get device
init.isMobile = function () {
    const isMobile = /Android|Tablet|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // User is accessing the page on a mobile device
        // console.log("Mobile device detected");

        return true
    } else {
        // User is accessing the page on a desktop device
        // console.log("Desktop device detected");

        return false
    }
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

    // Draw the top border
    graphics.beginPath()
    graphics.moveTo(0, 0) // Start at (0, 0)
    graphics.lineTo(gameWidth, 0) // Draw line to the right edge of the canvas
    graphics.closePath()
    graphics.stroke() // Stroke the line

    // Make sure the border is displayed above other game elements
    graphics.setDepth(9999) // Set a high depth value
}

init.setPlayerSprite = function (scene, key, playerBounds = true) {
    player = scene.player = scene.physics.add.sprite(playerPositionX, playerPositionY, key)

    // Player physics properties. Give the little guy a slight bounce.
    player = scene.player.setBounce(0.2)
    player = scene.player.setCollideWorldBounds(playerBounds)
    player.setDepth(4)
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

init.setPortalAnimations = function (scene, key = 'portal') {
    portals = scene.physics.add.group()

    // Define animations if needed
    scene.anims.create({
        key: 'portalAnimation',
        frames: scene.anims.generateFrameNumbers(key, {start: 0, end: 7}), // Assuming frames 0 to 3 are part of the animation
        frameRate: 10,
        repeat: -1 // Repeat indefinitely
    })
}

init.setSpeechBubble = function (scene) {
    speechBubbles = scene.physics.add.group()
}

init.setSpeechBubbleAnimations = function (scene, key, frameRate, repeat) {
    // Define animations if needed
    scene.anims.create({
        key: key,
        frames: scene.anims.generateFrameNumbers(key, {start: 0, end: 4}),
        frameRate: frameRate,
        repeat: repeat
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

init.setInstructions = function (scene) {
    // Set instructions
    if (isMobile) {
        instructions = scene.add.text(200, 570, 'Move by using the joystick', {fontSize: '32px', fill: '#fff'})
    } else {
        instructions = scene.add.text(200, 570, 'Move with W, A, S, D', {fontSize: '32px', fill: '#fff'})
    }

    instructions.setDepth(7)

    // Center
    instructions.setOrigin(0.5);
    instructions.x = scene.cameras.main.width / 2
}

init.createJoystick = function (scene) {
    scene.joyStick = scene.plugins.get('rexvirtualjoystickplugin').add(scene, {
        x: scene.cameras.main.width / 2,
        y: 480,
        radius: 100,
        base: scene.add.circle(0, 0, 40, 0x888888),
        thumb: scene.add.circle(0, 0, 30, 0xcccccc),
    })
        .on('update', init.getJoystickState, scene)
}

init.getJoystickState = function joyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys()
    let pressed = ''
    for (const name in cursorKeys) {
        if (cursorKeys[name].isDown) {
            pressed = `${name}`
        } else {
            this.mobileCursorKeys = undefined
        }
    }
    joystickPressed = pressed
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

    if (scene.cursors.left.isDown || joystickPressed === 'left') {
        scene.player.setVelocityX(-160)

        scene.player.anims.play(animations[0], true)
    } else if (scene.cursors.right.isDown || joystickPressed === 'right') {
        scene.player.setVelocityX(160)

        scene.player.anims.play(animations[1], true)
    } else {
        scene.player.setVelocityX(0)

        scene.player.anims.play(animations[2])
    }

    if ((scene.cursors.up.isDown || joystickPressed === 'up') && scene.player.body.touching.down) {
        scene.player.setVelocityY(-330)
        scene.sound.playAudioSprite('sfx', 'squit');
    }
}

init.createStars = function (scene, x = 12, y = 0, gravity = true) {
    stars = scene.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: {x: x, y: y, stepX: 70}
    })

    stars.children.iterate(function (child) {
        console.log(gravity)

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))

        child.body.allowGravity = gravity

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

        music = scene.sound.add('hard', {volume: 1, loop: true})
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

        init.createBomb(scene, bombs, player, 0, 'bomb-r')
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
        case 'Tutorial':
            init.changeBackground('night.png', 'cover', 'no-repeat')
            break
        case 'Arcade':
            init.changeBackground('sky.png', 'cover', 'no-repeat')
            break
        case 'RankedName':
            init.changeBackground('john-cosio-xCZ8ynsCfrw-unsplash.jpg', 'cover', 'no-repeat')
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

    let addBounds = 0

    if (xAddBounds > 0) {
        addBounds = xAddBounds - 50
    }

    muteButton = scene.add.image(770 + addBounds, 30, soundToggle)
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

init.monitorMuteStatus = function (game) {
    if (isMute) {
        game.sound.mute = true;
    } else {
        game.sound.mute = false;
    }
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

        // Only get 10
        if (rank < 11) {

            // Format date
            const date = new Date(`${value.date}`).toISOString().slice(0, 10)

            // Score
            let score = scene.add.text(400, startingY, rank + '    ' + `${value.name}` + '    ' + `${value.score}` + '    ' + date, {
                fontSize: '24px',
                fill: '#fff'
            })

            // Set the origin of the text to its center
            score.setOrigin(0.5)

            startingY += 30
        }
    }
}

init.displayInputButtons = function (scene) {
    inputKeys = scene.physics.add.staticGroup()

    // let inputKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]
    let inputKeysUpper = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
    let inputKeysLower = ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

    let startingX = 20

    // for (const [key, value] of Object.entries(inputKeys)) {
    for (const value of inputKeysUpper) {
        inputKeys.create(startingX, 100, value).setName(value).setScale(.4).refreshBody()

        startingX += 40
    }

    // Reset x
    startingX = 20

    for (const value of inputKeysLower) {
        inputKeys.create(startingX, 320, value).setName(value).setScale(.4).refreshBody()

        startingX += 40
    }

    scene.physics.add.collider(scene.player, inputKeys, init.inputPress, null, this)
}

init.inputPress = function (player, input) {
    if (!playerName) {
        playerName = ''
    }

    if (input.name === 'a') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'b') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'c') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'd') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'e') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'f') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'g') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'h') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'i') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'j') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'k') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'l') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'm') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'n') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'o') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'p') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'q') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'r') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 's') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 't') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'u') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'v') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'w') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'x') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'y') {
        playerName += input.name.toUpperCase()
    }

    if (input.name === 'z') {
        playerName += input.name.toUpperCase()
    }

    // Show enter button when at least 3 characters
    if (playerName.length >= 3) {
        inputKeys.create(540, 320, 'enter').setName('enter').setScale(.4).refreshBody()
    }

    if (input.name === 'enter') {
        // Clear page
        inputKeys.clear(true, true)

        inputPlayerNameLabel.destroy()
        inputPlayerNameLabel = scene.add.text(300, 40, 'Hop on!', {fontSize: '24px', fill: '#FFF'})

        inputPlayerNameText.destroy()
        inputPlayerNameText = scene.add.text(410, 40, playerName, {fontSize: '24px', fill: '#FFF'})

        inputPlayerNameSubmitted = true

        return
    }

    init.inputLastThree()

    inputPlayerNameText.destroy()
    inputPlayerNameText = scene.add.text(470, 40, playerName, {fontSize: '24px', fill: '#FFF'})
}

init.inputLastThree = function () {
    if (playerName.length > 3) {
        playerName = playerName.substr(playerName.length - 3)
    }
}
