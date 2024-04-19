let keyboardControls = {
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
}

export function createSetKeyboardKeyModule() {
    return keyboardControls
}

let joystickControls = {
    x: 400,
    y: 675,
    radius: 100,
    base: {
        x: 0, // Di ko alam ano ginagawa nitong x at y
        y: 0,
        size: 40,
        color: 0x888888
    },
    thumb: {
        x: 0,
        y: 0,
        size: 30,
        color: 0xcccccc
    },
    // base: this.add.circle(0, 0, 40, 0x888888),
    // thumb: this.add.circle(0, 0, 30, 0xcccccc),
    // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
    // forceMin: 16,
    // enable: true
}

let joystickPressed = {
    // Mobile directional pressed key
    pressed: null
}

export function createJoystickPressedModule() {
    return joystickPressed
}

function joyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys()
    let pressed = ''
    for (const name in cursorKeys) {
        if (cursorKeys[name].isDown) {
            pressed = `${name}`
        } else {
            this.mobileCursorKeys = undefined
        }
    }
    joystickPressed.pressed = pressed
}

function createJoystickControls(scene) {
    scene.joyStick = scene.plugins.get('rexvirtualjoystickplugin').add(scene, {
        x: joystickControls.x,
        y: joystickControls.y,
        radius: joystickControls.radius,
        base: scene.add.circle(joystickControls.base.x, joystickControls.base.y, joystickControls.base.size, joystickControls.base.color),
        thumb: scene.add.circle(joystickControls.thumb.x, joystickControls.thumb.y, joystickControls.thumb.size, joystickControls.thumb.color),
    })
        .on('update', joyStickState, scene)
}

export function createSetJoystickModule(scene) {
    return createJoystickControls(scene)
}
