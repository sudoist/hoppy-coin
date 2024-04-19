const assetsPath = '/assets/players/'

let players = [
    {
        key: 'dude1',
        path: 'dude.png',
    },
    {
        key: 'dude2',
        path: 'piccolo.png',
    },
]

export function preloadPlayerModule(scene, objects) {
    for (const player of players) {
        scene.load.spritesheet(player.key, assetsPath + player.path, {frameWidth: 32, frameHeight: 48})
        objects.playerSpritesArray.push(player.key) // For displaying sprite in create
    }
}
