function gameOver() {
    // Array to have multiple sounds later
    let sfx = [
        {
            key: 'sfx',
            sound: 'death'
        }
    ]
    console.log("game over")

    $('#main').removeClass('hidden')
    $('#main').addClass('z-10')
    $('#game').addClass('game-over')

    let data = {
        sfx: sfx
    }

    return data
}

export function updateGameOverModule() {
    return gameOver()
}