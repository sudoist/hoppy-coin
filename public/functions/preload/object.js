const assetsPath = '../../assets/objects/'

let objects = [
    {
        key: 'ground',
        path: assetsPath + 'platforms/platform.png',
    },
    {
        key: 'ground-m',
        path: assetsPath + 'platforms/platform-50.png',
    },
    {
        key: 'ground-s',
        path: assetsPath + 'platforms/platform-25.png',
    },
    {
        key: 'star',
        path: assetsPath + 'coin.png',
    },
    {
        key: 'bomb',
        path: assetsPath + 'bomb-r.png',
    },
]

export function preloadObjectModule(scene) {
    for (const object of objects) {
        scene.load.image(object.key, assetsPath + object.path)
    }

    return objects
}
