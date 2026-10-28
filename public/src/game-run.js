// Shared game-over lifecycle, independent from stage mechanics and results UI.
const GameRun = {
    finish(scene, onFinish) {
        if (scene.isLeaving || scene.finished) return false
        scene.finished = true
        if (typeof onFinish === 'function') onFinish()
        if (scene.player && scene.player.body) {
            scene.player.setVelocity(0, 0)
            scene.player.body.enable = false
            scene.player.setTexture('explode', 4)
        }
        if (scene.sound && scene.cache.audio.exists('sfx')) {
            scene.sound.playAudioSprite('sfx', 'death')
        }
        // Stop active stage soundtrack if one is assigned.
        if (scene.stageMusic && scene.stageMusic.isPlaying) scene.stageMusic.stop()
        return true
    }
}
