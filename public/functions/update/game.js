function gameOver(mode, game, objects) {
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
        $('#main').removeClass('hidden')
        $('#main').addClass('z-10')
        $('#game').addClass('game-over')

        setTimeout(() => { game.destroy() }, 4000);
    }

    if (mode === 'ranked') {

        setTimeout(() => {
            window.location = "/ranking/index.html?name=" + objects.playerName + "&score=" + objects.score
            game.destroy()
        }, 4000);
    }

    game.pause()

    return data
}

export function updateGameOverModule(mode, game, objects) {
    return gameOver(mode, game, objects)
}
