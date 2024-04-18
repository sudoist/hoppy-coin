function changePlatform(objects, platforms) {
    let resetColliders = false

    // Default
    if (objects.platformIndex === 1) {

        for (let [index, platform] of platforms.entries()) {
            // Only get from first
            if (index === 0) {

                // Here we create the ground.
                // Scale it to fit the width of the game (the original sprite is 400x32 in size)
                for (const ground of platform.grounds) {
                    objects.platforms[objects.platformIndex].create(ground.x, ground.y, ground.key).setScale(2).refreshBody()
                }

                // Now let's create some ledges
                for (const ledge of platform.ledges) {
                    objects.platforms[objects.platformIndex].create(ledge.x, ledge.y, ledge.key);
                }

                resetColliders = true

                break
            }
        }
    } else if (objects.platformIndex === 2) {

        for (let [index, platform] of platforms.entries()) {
            // Only get from first
            if (index === 1) {

                // Here we create the ground.
                // Scale it to fit the width of the game (the original sprite is 400x32 in size)
                for (const ground of platform.grounds) {
                    objects.platforms[objects.platformIndex].create(ground.x, ground.y, ground.key).setScale(2).refreshBody()
                }

                // Now let's create some ledges
                for (const ledge of platform.ledges) {
                    objects.platforms[objects.platformIndex].create(ledge.x, ledge.y, ledge.key);
                }

                resetColliders = true

                break;
            }
        }
    } else if (objects.platformIndex === 3) {

        for (let [index, platform] of platforms.entries()) {
            // Only get from first
            if (index === 2) {

                // Here we create the ground.
                // Scale it to fit the width of the game (the original sprite is 400x32 in size)
                for (const ground of platform.grounds) {
                    objects.platforms[objects.platformIndex].create(ground.x, ground.y, ground.key).setScale(2).refreshBody()
                }

                // Now let's create some ledges
                for (const ledge of platform.ledges) {
                    objects.platforms[objects.platformIndex].create(ledge.x, ledge.y, ledge.key);
                }

                // Add bombs
                for (const bomb of platform.bombs) {
                    objects.bombs.create(bomb.x, bomb.y, bomb.key).setImmovable(false).body.allowGravity = false;
                }

                resetColliders = true

                break
            }
        }
    }

    return resetColliders
}

export function updateChangePlatformModule(objects, platforms) {
    return changePlatform(objects, platforms)
}