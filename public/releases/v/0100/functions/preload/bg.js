const assetsPath = '/assets/bg/'

let backgrounds = [
    {
        key: 'sky1',
        path: 'sky.png',
    },
    {
        key: 'sky2',
        path: 'john-cosio-xCZ8ynsCfrw-unsplash.jpg',
    },
    {
        key: 'sky3',
        path: 'john-cosio-RxjSW-seIp0-unsplash.jpg',
    },
    {
        key: 'sky4',
        path: 'aleksandra-khaprenko-0PPw9irzLIw-unsplash.jpg',
    },
    {
        key: 'sky5',
        path: 'nathan-dumlao-kME9jbKd--s-unsplash.jpg',
    },
    {
        key: 'sky6',
        path: 'dan-asaki-K0mJQlbu9Yo-unsplash.jpg',
    },
]

export function preloadBgModule(scene) {
    for (const background of backgrounds) {
        scene.load.image(background.key, assetsPath + background.path)
    }

    return backgrounds
}
