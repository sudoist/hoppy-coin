export function updateCollectStarModule(objects, features) {

    let sfx = []

    // Play when getting a star
    sfx.push(
        {
            key: 'sfx',
            sound: 'ping'
        }
    )

    // Add and update the score
    objects.score += 10
    objects.scoreText.setText('Score: ' + objects.score)

    // Change background on score
    if ((objects.score % features.changeBackgroundScore) === 0) {

        sfx.push(
            {
                key: 'sfx',
                sound: 'numkey'
            }
        )

        // Platforms
        if (features.changePlatform) {
            objects.platforms[objects.platformIndex].clear(true, true)
        }

        objects.platformIndex++

        // Reset background
        if (objects.platformIndex === 4) {
            objects.platformIndex = 1
        }

        // Backgrounds
        objects.skyIndex++

        // Reset background
        if (objects.skyIndex === 6) {
            objects.skyIndex = 0
        }
    }

    let data = {
        sfx: sfx
    }

    return data
}

export function updateRefreshStarModule(objects) {


    let sfx = {
        key: 'sfx',
        sound: 'shot'
    }

    let data = {
        sfx: sfx
    }

    // Update stage
    objects.stageText.setText('Stage: ' + ++objects.stage)

    // A new batch of stars to collect
    objects.stars.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true)

    })

    let x = (objects.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

    let bomb = objects.bombs.create(x, 16, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    bomb.allowGravity = false

    return data
}

export function updateHitBombModule(objects, bomb) {
    bomb.destroy()

    objects.gameOver = true
}

export function updateChangeBackgroundModule(objects, key) {
    objects.sky.setTexture(key, 0)
}
