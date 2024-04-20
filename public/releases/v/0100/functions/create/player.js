let specs = {
    bounce: 0.2,
    setCollideWorldBounds: true,
}

export function createSelectPlayerSpriteModule(scene, objects) {
    // Randomize player sprite
    const randomSprite = Math.floor(Math.random() * objects.playerSpritesArray.length)

    return objects.playerSpritesArray[randomSprite]
}

export function createSetPlayerModule(objects) {
    //  Player physics properties. Give the little guy a slight bounce.
    objects.player.setBounce(specs.bounce)
    objects.player.setCollideWorldBounds(specs.setCollideWorldBounds)
}
