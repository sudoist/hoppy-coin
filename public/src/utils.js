let init = {}

init.fadeOutScene = function(sceneName, context) {
    context.cameras.main.fadeOut(1700)
    context.time.addEvent({
        delay: 1700,
        callback: function() {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}

init.fadeInScene = function(sceneName, context) {
    context.cameras.main.fadeIn(250)
    context.time.addEvent({
        delay: 250,
        callback: function() {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
}