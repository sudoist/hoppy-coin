class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
    }

    create() {
        // Logos
        let phaser = this.add.image(450, 300, 'phaser')
        phaser.setScale(.5)

        let sudoist = this.add.image(350, 300, 'sudoist')
        sudoist.setScale(.5)

        init.bootFadeOutScene('MainMenu', this)
    }
}