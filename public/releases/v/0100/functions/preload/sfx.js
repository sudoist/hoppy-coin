const assetsPath = '/assets/audio/sfx/'

let sfxSprites = {
    key: 'sfx',
    spritePath: 'fx_mixdown.json',
    files: [
        {
            path: 'fx_mixdown.ogg',
        },
        {
            path: 'fx_mixdown.mp3',
        },
    ]
}

export function preloadSfxModule(scene) {
    // https://github.com/phaserjs/examples/blob/master/public/src/audio/HTML5%20Audio/audiosprite.js
    // SFX
    let audioFiles = []
    for (const sfxSprite of sfxSprites.files) {
        audioFiles.push(assetsPath + sfxSprite.path)
    }
    scene.load.audioSprite(sfxSprites.key, assetsPath + sfxSprites.spritePath, audioFiles)
}
