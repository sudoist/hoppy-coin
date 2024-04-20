const assetsPath = '/assets/objects/buttons/'

let buttons = [
    {
        key: 'mute',
        path: 'mute-32.png',
    },
    {
        key: 'sound',
        path: 'sound-32.png',
    },
]

export function preloadButtonModule(scene) {
    for (const button of buttons) {
        scene.load.image(button.key, assetsPath + button.path)
    }
}
