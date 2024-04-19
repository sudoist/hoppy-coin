export function createSetCollidersModule(scene, objects) {
    scene.physics.add.collider(objects.player, objects.platforms[objects.platformIndex])
    scene.physics.add.collider(objects.stars, objects.platforms[objects.platformIndex])
    scene.physics.add.collider(objects.bombs, objects.platforms[objects.platformIndex])
}
