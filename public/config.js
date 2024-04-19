let data = {
    configDesktop: {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {},
        // Allows Phaser canvas to be responsive to browser sizing
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600,
        },
        device: 'desktop',
        instructions: 'Move with W, A, S, D',
        parent: 'game',
        // audio: {
        //     disableWebAudio: true
        // }
    },
    configMobile: {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {},
        // Allows Phaser canvas to be responsive to browser sizing
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 750,
        },
        device: 'mobile',
        instructions: 'Move by using the joystick',
        parent: 'game',
        pixelArt: true,
        // audio: {
        //     disableWebAudio: true
        // },
    },
    // Game modes
    mode: 'arcade', // Default to arcade
    // Feature flags
    features: {
        arcade: {
            changePlatform: true,
            changeBackground: true,
            changeBackgroundScore: 360,
            changeMusicScore: 600,
        },
        ranked: {
            changePlatform: false,
            changeBackground: true,
            changeBackgroundScore: 360,
            changeMusicScore: 600,
        }
    }
}

export function configModule() {
    return data
}

function processUrlParams(config, objects) {
    const searchParams = new URLSearchParams(window.location.search)

    // Update game mode
    if (searchParams.has('mode')) {
        config.mode = searchParams.get('mode')
    }

    // Update player name for ranked
    if (searchParams.has('name')) {
        objects.playerName = searchParams.get('name')
    }
}

export function processUrlParamsModule(config, objects) {
    return processUrlParams(config, objects)
}

function processFeatureFlags(mode, features) {
    console.log(features)
    console.log(mode)
    console.log(features.arcade)

    if (mode === 'ranked') {
        return features.ranked
    }

    // Default arcade mode
    // features = features.arcade

    // console.log(mode)
    // console.log(features)

    return features.arcade
}

export function processFeatureFlagsModule(mode, features) {
    return processFeatureFlags(mode, features)
}
