let buttons = [
    {
        x: 770,
        y: 30,
        key: 'mute',
    },
    {
        x: 770,
        y: 30,
        key: 'sound',
    },
]

export function createButtonModule(scene, objects) {
    // Check keys in public\functions\create\button.js for specific buttons

    // Init mute button
    objects.mute = scene.add.image(buttons[0].x, buttons[0].y, buttons[0].key).setInteractive()
    objects.mute.on('pointerdown', () => toggleSound(objects))
}

function toggleSound(objects) {

    if (objects.isMute) {
        objects.mute.setTexture('sound', 0)
        objects.isMute = false

        return
    }

    objects.isMute = true
    objects.mute.setTexture('mute', 0)

    return
}

// For other states that can be used later
function enterButtonHoverState() {
    // enterButtonHoverState
}

function enterButtonRestState() {
    // enterButtonRestState
}
