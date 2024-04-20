let data = [
    {
        key: 'left',
        start: 0,
        end: 3,
        frame: null,
        frameRate: 10,
        repeat: -1,
    },
    {
        key: 'turn',
        start: null,
        end: null,
        frame: 4,
        frameRate: 20,
        repeat: null,
    },
    {
        key: 'right',
        start: 5,
        end: 8,
        frame: null,
        frameRate: 10,
        repeat: -1,
    },
    {
        key: 'explode',
        start: null,
        end: null,
        frame: 9,
        frameRate: 20,
        repeat: null,
    },
]

export function createAnimationModule() {
    return data
}
