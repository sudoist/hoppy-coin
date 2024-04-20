const assetsPath = '/assets/objects/'

let objects = [
    {
        key: 'ground',
        path: 'platforms/platform.png',
    },
    {
        key: 'ground-m',
        path: 'platforms/platform-50.png',
    },
    {
        key: 'ground-s',
        path: 'platforms/platform-25.png',
    },
    {
        key: 'star',
        path: 'coin.png',
    },
    {
        key: 'bomb',
        path: 'bomb-r.png',
    },
]

export function preloadObjectModule(scene) {
    for (const object of objects) {
        scene.load.image(object.key, assetsPath + object.path)
    }

    return objects
}
