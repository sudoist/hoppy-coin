class Boot extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        // Backgrounds
        this.load.image('sky', '/assets/bg/sky.png')
        this.load.image('planet', '/assets/bg/phaser-planet-small.png')
        this.load.image('default', '/assets/bg/pattern.webp')

        // Sprites
        this.load.image('star', '/assets/objects/star.png')
        this.load.image('coin', '/assets/objects/coin.png')
        this.load.image('bomb', '/assets/objects/bomb.png')
        this.load.image('bomb-r', '/assets/objects/bomb-r.png')
        this.load.image('bomb-ball', '/assets/sprites/bomb-ball.png')
        this.load.image('leaderboard', '/assets/sprites/leaderboard-32.png')
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
        this.load.image('mute', '/assets/buttons/mute-32.png')
        this.load.image('sound', '/assets/buttons/sound-32.png')
        this.load.image('menu', '/assets/buttons/menu.png')
        this.load.image('play-again', '/assets/buttons/play-again.png')
        this.load.image('reset', '/assets/buttons/reset.png')
        this.load.image('a', '/assets/buttons/button_a.png')
        this.load.image('b', '/assets/buttons/button_b.png')
        this.load.image('c', '/assets/buttons/button_c.png')
        this.load.image('d', '/assets/buttons/button_d.png')
        this.load.image('e', '/assets/buttons/button_e.png')
        this.load.image('f', '/assets/buttons/button_f.png')
        this.load.image('g', '/assets/buttons/button_g.png')
        this.load.image('h', '/assets/buttons/button_h.png')
        this.load.image('i', '/assets/buttons/button_i.png')
        this.load.image('j', '/assets/buttons/button_j.png')
        this.load.image('k', '/assets/buttons/button_k.png')
        this.load.image('l', '/assets/buttons/button_l.png')
        this.load.image('m', '/assets/buttons/button_m.png')
        this.load.image('n', '/assets/buttons/button_n.png')
        this.load.image('o', '/assets/buttons/button_o.png')
        this.load.image('p', '/assets/buttons/button_p.png')
        this.load.image('q', '/assets/buttons/button_q.png')
        this.load.image('r', '/assets/buttons/button_r.png')
        this.load.image('s', '/assets/buttons/button_s.png')
        this.load.image('t', '/assets/buttons/button_t.png')
        this.load.image('u', '/assets/buttons/button_u.png')
        this.load.image('v', '/assets/buttons/button_v.png')
        this.load.image('w', '/assets/buttons/button_w.png')
        this.load.image('x', '/assets/buttons/button_x.png')
        this.load.image('y', '/assets/buttons/button_y.png')
        this.load.image('z', '/assets/buttons/button_z.png')
        this.load.image('enter', '/assets/buttons/button_enter.png')

        // SFX
        this.load.audioSprite('sfx', '/assets/audio/sfx/fx_mixdown.json', [
            '/assets/audio/sfx/fx_mixdown.ogg',
            '/assets/audio/sfx/fx_mixdown.mp3'
        ])

        // Music
        this.load.audio('intro', '/assets/music/Intro Theme.mp3')
        this.load.audio('rankedMenu', '/assets/music/Worldmap Theme.mp3')
        this.load.audio('start', ['/assets/audio/music/Hawaii.mp3'])
        this.load.audio('hard', ['/assets/audio/music/Tyechestra.mp3'])
        this.load.audio('boot', ['/assets/music/hoppy-boot.mp3'])

        // Plugins

        // Joystick
        this.load.plugin('rexvirtualjoystickplugin', '/assets/plugins/rexvirtualjoystickplugin.min.js', true)

        // Setup api env
        init.apiFetch('/env.json').then((data) => {
            // console.log(data)
            env = data
        })
    }

    create() {
        init.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        }

        // Play boot music
        music = this.sound.add('boot', {volume: 1.2, loop: false})
        music.play()

        this.scene.start('Preloader')
        // this.scene.start('MainMenu')
        // this.scene.start('Arcade')
        // this.scene.start('RankedName')
        // this.scene.start('Leaderboard')
        // this.scene.start('RankedMenu')
        // this.scene.start('Ranked')
    }
}