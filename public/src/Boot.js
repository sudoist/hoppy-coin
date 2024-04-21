class Boot extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        // Backgrounds
        this.load.image('sky', '/assets/bg/sky.png')
        this.load.image('planet', '/assets/bg/phaser-planet-small.png')
        this.load.image('default', '/assets/bg/pattern.webp')

        // Objects
        this.load.image('star', '/assets/objects/star.png')
        this.load.image('coin', '/assets/objects/coin.png')
        this.load.image('bomb', '/assets/objects/bomb.png')
        this.load.image('bomb-r', '/assets/objects/bomb-r.png')
        this.load.image('ground', '/assets/objects/platforms/platform.png')
        this.load.image('ground-m', '/assets/objects/platforms/platform-50.png')
        this.load.image('ground-s', '/assets/objects/platforms/platform-25.png')

        // Player
        this.load.spritesheet('dude', '/assets/players/dude.png', {frameWidth: 32, frameHeight: 48})
        this.load.spritesheet('piccolo', '/assets/players/piccolo.png', {frameWidth: 32, frameHeight: 48})
        this.load.spritesheet('explode', '/assets/players/explode.png', {frameWidth: 32, frameHeight: 48})

        // Logos
        this.load.image('phaser', '/assets/logos/phaser.png')
        this.load.image('sudoist', '/assets/logos/sudoist.png')
        this.load.image('logo', '/assets/logos/logo.png')
        this.load.image('github', '/assets/logos/github-mark.png')
        this.load.image('github-white', '/assets/logos/github-mark-white.png')

        // Buttons
        this.load.image('arcade', '/assets/buttons/arcade.png')
        this.load.image('ranked', '/assets/buttons/ranked.png')
        this.load.image('mute', '/assets/buttons/mute-32.png');
        this.load.image('sound', '/assets/buttons/sound-32.png');
        this.load.image('menu', '/assets/buttons/menu.png');
        this.load.image('play-again', '/assets/buttons/play-again.png');
        this.load.image('reset', '/assets/buttons/reset.png');

        // SFX
        this.load.audioSprite('sfx', '/assets/audio/sfx/fx_mixdown.json', [
            '/assets/audio/sfx/fx_mixdown.ogg',
            '/assets/audio/sfx/fx_mixdown.mp3'
        ])

        // Music
        this.load.audio('intro', '/assets/music/Intro Theme.mp3')
        this.load.audio('start', ['/assets/audio/music/Hawaii.mp3'])
        this.load.audio('hard', ['/assets/audio/music/Tyechestra.mp3'])

        // Plugins

        // Joystick
        this.load.plugin('rexvirtualjoystickplugin', '/assets/plugins/rexvirtualjoystickplugin.min.js', true)
    }

    create() {
        init.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        }

        // this.scene.start('Preloader')
        // this.scene.start('MainMenu')
        this.scene.start('Arcade')
        // this.scene.start('Game')
    }
}