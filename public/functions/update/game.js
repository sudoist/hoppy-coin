export function updateGameOverModule(mode, game, objects) {
    // Array to have multiple sounds later
    let sfx = [
        {
            key: 'sfx',
            sound: 'death'
        }
    ]

    let data = {
        sfx: sfx
    }

    if (mode === 'arcade') {
        $('#main-arcade').removeClass('hidden')
        $('#main-arcade').addClass('z-10')
        $('#game').addClass('game-over')

        setTimeout(() => { game.destroy() }, 4000);
    }

    if (mode === 'ranked') {
        $('#main-ranked').removeClass('hidden')
        $('#main-ranked').addClass('z-10')
        $('#main-ranked').addClass('opacity-90')
        $('#game').addClass('game-over')

        setTimeout(() => {
            window.location = "/ranking/index.html?name=" + objects.playerName + "&score=" + objects.score
            game.destroy()
        }, 4000);
    }

    game.pause()

    return data
}
