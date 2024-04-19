const assetsPath = '../../assets/bg/'

let backgrounds = [
    {
        key: 'sky1',
        path: assetsPath + 'sky.png',
    },
    {
        key: 'sky2',
        path: assetsPath + 'john-cosio-xCZ8ynsCfrw-unsplash.jpg',
    },
    {
        key: 'sky3',
        path: assetsPath + 'john-cosio-RxjSW-seIp0-unsplash.jpg',
    },
    {
        key: 'sky4',
        path: assetsPath + 'aleksandra-khaprenko-0PPw9irzLIw-unsplash.jpg',
    },
    {
        key: 'sky5',
        path: assetsPath + 'nathan-dumlao-kME9jbKd--s-unsplash.jpg',
    },
    {
        key: 'sky6',
        path: assetsPath + 'dan-asaki-K0mJQlbu9Yo-unsplash.jpg',
    },
]

export function preloadBgModule(scene) {
    for (const background of backgrounds) {
        scene.load.image(background.key, assetsPath + background.path)
    }

    return backgrounds
}
