let data = [
    {
        bounce: 0.2,
        setCollideWorldBounds: true,
    },
]

export function createPlayerModule() {
    return data
}

function selectPlayerSprite(playerSprites) {

    // Randomize player sprite
    const randomSprite = Math.floor(Math.random() * playerSprites.length);

    return playerSprites[randomSprite];
}

export function createSelectPlayerSpriteModule(playerSpritesArray) {
    return selectPlayerSprite(playerSpritesArray)
}

function setPlayer(objects) {
    //  Player physics properties. Give the little guy a slight bounce.
    objects.player.setBounce(0.2);
    objects.player.setCollideWorldBounds(true);

    return
}

export function createSetPlayerModule(objects) {
    return setPlayer(objects)
}