let data = [
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

export function createButtonModule() {
    return data
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

export function createButtonSoundToggleModule(objects) {
    return toggleSound(objects)
}

// For other states that can be used later
function enterButtonHoverState() {
    // enterButtonHoverState
}

function enterButtonRestState() {
    // enterButtonRestState
}