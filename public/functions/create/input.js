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

    // Mobile directional pressed key
    pressed: null
}

export function createSetJoystickModule() {
    return joystickControls
}

