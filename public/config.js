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
        audio: {
            disableWebAudio: true
        }
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
        audio: {
            disableWebAudio: true
        },
    },
}

export function configModule() {
    return data
}