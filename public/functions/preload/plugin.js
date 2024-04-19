const assetsPath = '../../assets/plugins/'

let plugins = [
    // Joystick
    {
        key: 'rexvirtualjoystickplugin',
        path: 'rexvirtualjoystickplugin.min.js',
    },
]

function preloadPlugins(scene) {
    for (const plugin of plugins) {
        scene.load.plugin(plugin.key, assetsPath + plugin.path, true)
    }
}

export function preloadPluginModule(scene) {
    return preloadPlugins(scene)
}
