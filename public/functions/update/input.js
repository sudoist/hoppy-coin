function moveAnimations(objects, isMobileLeft, isMobileRight, isMobileUp) {
    let sfx = []

    if (objects.cursors.left.isDown || isMobileLeft) {
        objects.player.setVelocityX(-160)
        objects.player.anims.play('left', true)
    } else if (objects.cursors.right.isDown || isMobileRight) {
        objects.player.setVelocityX(160)
        objects.player.anims.play('right', true)
    } else {
        objects.player.setVelocityX(0)
        objects.player.anims.play('turn')
    }

    if ((objects.cursors.up.isDown || isMobileUp) && objects.player.body.touching.down) {
        objects.player.setVelocityY(-330)

        sfx.push(
            {
                key: 'sfx',
                sound: 'squit'
            }
        )
    }

    let data = {
        sfx: sfx
    }

    return data
}

export function updateMoveAnimationModule(objects, isMobileLeft, isMobileRight, isMobileUp) {
    return moveAnimations(objects, isMobileLeft, isMobileRight, isMobileUp)
}