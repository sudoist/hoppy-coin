const assetsPath = '/assets/plugins/'

let plugins = [
    // Joystick
    {
        key: 'rexvirtualjoystickplugin',
        path: 'rexvirtualjoystickplugin.min.js',
    },
]

export function preloadPluginModule(scene) {
    for (const plugin of plugins) {
        scene.load.plugin(plugin.key, assetsPath + plugin.path, true)
    }
}
