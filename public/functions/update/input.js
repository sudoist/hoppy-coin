function joystickMoveAnimations(objects, isMobileLeft, isMobileRight, isMobileUp) {
    let sfx = []

    // console.log('mobile hsdas')

    if (isMobileLeft) {
        objects.player.setVelocityX(-160)
        console.log('module')
        console.log(isMobileLeft)



        objects.player.anims.play('left', true)
    } else if (objects.cursors.right.isDown) {
        objects.player.setVelocityX(160)

        objects.player.anims.play('right', true)
    } else {

        isMobileLeft = false

        console.log('modstoppingule')
        objects.player.setVelocityX(0)
        objects.player.anims.play('turn')
    }

    if ((objects.cursors.up.isDown) && objects.player.body.touching.down) {
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

function keyboardMoveAnimations(objects) {
    let sfx = []

    if (objects.cursors.left.isDown) {
        objects.player.setVelocityX(-160)
        console.log('module')
        console.log(objects.cursors.left.isDown)
        objects.player.anims.play('left', true)
    } else if (objects.cursors.right.isDown) {
        objects.player.setVelocityX(160)

        objects.player.anims.play('right', true)
    } else {
        objects.player.setVelocityX(0)
        objects.player.anims.play('turn')
    }

    if ((objects.cursors.up.isDown) && objects.player.body.touching.down) {
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

export function updateMoveAnimationModule(objects, isMobile, isMobileLeft, isMobileRight, isMobileUp) {
    // console.log(isMobile)
    if (isMobile) {
        return joystickMoveAnimations(objects, isMobileLeft, isMobileRight, isMobileUp)
    } else {
        return keyboardMoveAnimations(objects)
    }

}