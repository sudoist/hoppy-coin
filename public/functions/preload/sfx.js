let data = {
    key: 'sfx',
    spritePath: 'audio/sfx/fx_mixdown.json',
    files: [
        {
            path: 'audio/sfx/fx_mixdown.ogg',
        },
        {
            path: 'audio/sfx/fx_mixdown.mp3',
        },
    ]
}

export function preloadSfxModule() {
    return data
}