// Scene-local retry/stages controls. Portal navigation in classic Ranked remains unchanged.
const GameNavigation = {
    bind(scene, {retry, stages}) {
        const onRetry = () => retry()
        const onStages = () => stages()
        scene.input.keyboard.on('keydown-R', onRetry)
        scene.input.keyboard.on('keydown-ESC', onStages)
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            scene.input.keyboard.off('keydown-R', onRetry)
            scene.input.keyboard.off('keydown-ESC', onStages)
        })
    },

    results(scene, {retry, stages}) {
        scene.add.text(400, 325, 'R: Retry     ESC: Stages', {fontSize: '18px', fill: '#fff'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
        scene.add.text(270, 390, 'Retry', {fontSize: '24px', fill: '#ffe28a'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
            .setInteractive({useHandCursor: true}).on('pointerdown', retry)
        scene.add.text(530, 390, 'Stages', {fontSize: '24px', fill: '#ffe28a'})
            .setOrigin(0.5).setScrollFactor(0).setDepth(31)
            .setInteractive({useHandCursor: true}).on('pointerdown', stages)
    }
}
