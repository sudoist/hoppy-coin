let data = {

    // Player
    player: null,

    // Stars
    stars: null,

    // Bombs
    bombs: null,

    // Images
    sky: null,
    skyIndex: 1,
    platforms: [],
    platformIndex: 1,

    // Controls
    cursors: null,

    // Score
    score: 0,
    scoreText: null,

    // Stage
    stage: 1,
    stageText: null,

    // Instructions
    instructions: null,
    instructionsText: null,

    // Audio
    sfx: null,
    music: null,
    isMute: true,

    // Buttons    
    mute: null,

    // Game state
    gameOver: false,
}

export function objectsModule() {
    return data
}