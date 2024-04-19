const assetsPath = '/assets/audio/music/'

let music = [
    {
        key: 'start',
        path: 'Hawaii.mp3',
    },
    {
        key: 'hard',
        path: 'Tyechestra.mp3',
    },
]

export function preloadMusicModule(scene) {
    for (const item of music) {
        scene.load.audio(item.key, [assetsPath + item.path])
    }
}
