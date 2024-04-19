let platforms = [
    //  Add at least 3 platforms for now)
    {
        grounds: [
            {
                x: 400,
                y: 568,
                key: 'ground',
            }
        ],
        ledges: [
            {
                x: 600,
                y: 400,
                key: 'ground',
            },
            {
                x: 50,
                y: 250,
                key: 'ground',
            },
            {
                x: 750,
                y: 220,
                key: 'ground',
            },
        ],
        bombs: [],
    },
    {
        grounds: [
            {
                x: 400,
                y: 568,
                key: 'ground',
            }
        ],
        ledges: [
            {
                x: 18,
                y: 170,
                key: 'ground-s',
            },
            {
                x: 325,
                y: 220,
                key: 'ground-s',
            },
            {
                x: 609,
                y: 190,
                key: 'ground-s',
            },
            {
                x: 800,
                y: 390,
                key: 'ground-s',
            },
            {
                x: 260,
                y: 370,
                key: 'ground',
            },
        ],
        bombs: [],
    },
    {
        grounds: [
            {
                x: 150,
                y: 568,
                key: 'ground-s',
            },
            {
                x: 450,
                y: 568,
                key: 'ground-s',
            },
            {
                x: 550,
                y: 568,
                key: 'ground-s',
            },
        ],
        ledges: [
            {
                x: 18,
                y: 170,
                key: 'ground-s',
            },
            {
                x: 325,
                y: 220,
                key: 'ground-s',
            },
            {
                x: 609,
                y: 190,
                key: 'ground-s',
            },
            {
                x: 710,
                y: 410,
                key: 'ground-s',
            },
            {
                x: 750,
                y: 410,
                key: 'ground-s',
            },
            {
                x: 260,
                y: 370,
                key: 'ground',
            },
        ],
        bombs: [
            // Left
            {
                x: 3,
                y: 595,
                key: 'bomb',
            },
            {
                x: 10,
                y: 595,
                key: 'bomb',
            },
            {
                x: 20,
                y: 594,
                key: 'bomb',
            },
            {
                x: 30,
                y: 598,
                key: 'bomb',
            },
            {
                x: 37,
                y: 597,
                key: 'bomb',
            },
            {
                x: 50,
                y: 596,
                key: 'bomb',
            },
            // Mid
            {
                x: 249,
                y: 597,
                key: 'bomb',
            },
            {
                x: 260,
                y: 595,
                key: 'bomb',
            },
            {
                x: 267,
                y: 599,
                key: 'bomb',
            },
            {
                x: 289,
                y: 598,
                key: 'bomb',
            },
            {
                x: 280,
                y: 595,
                key: 'bomb',
            },
            {
                x: 309,
                y: 599,
                key: 'bomb',
            },
            {
                x: 330,
                y: 599,
                key: 'bomb',
            },
            {
                x: 330,
                y: 594,
                key: 'bomb',
            },
            {
                x: 353,
                y: 595,
                key: 'bomb',
            },
            {
                x: 300,
                y: 596,
                key: 'bomb',
            },
            {
                x: 320,
                y: 594,
                key: 'bomb',
            },
            {
                x: 340,
                y: 598,
                key: 'bomb',
            },
            // Right
            {
                x: 550,
                y: 595,
                key: 'bomb',
            },
            {
                x: 560,
                y: 596,
                key: 'bomb',
            },
            {
                x: 571,
                y: 599,
                key: 'bomb',
            },
            {
                x: 580,
                y: 598,
                key: 'bomb',
            },
            {
                x: 589,
                y: 598,
                key: 'bomb',
            },
            {
                x: 600,
                y: 595,
                key: 'bomb',
            },
            {
                x: 609,
                y: 594,
                key: 'bomb',
            },
            {
                x: 620,
                y: 597,
                key: 'bomb',
            },
            {
                x: 627,
                y: 594,
                key: 'bomb',
            },
            {
                x: 640,
                y: 598,
                key: 'bomb',
            },
            {
                x: 651,
                y: 594,
                key: 'bomb',
            },
            {
                x: 660,
                y: 597,
                key: 'bomb',
            },
            {
                x: 671,
                y: 599,
                key: 'bomb',
            },
            {
                x: 680,
                y: 597,
                key: 'bomb',
            },
            {
                x: 690,
                y: 593,
                key: 'bomb',
            },
            {
                x: 700,
                y: 595,
                key: 'bomb',
            },
            {
                x: 710,
                y: 599,
                key: 'bomb',
            },
            {
                x: 720,
                y: 596,
                key: 'bomb',
            },
            {
                x: 730,
                y: 593,
                key: 'bomb',
            },
            {
                x: 740,
                y: 600,
                key: 'bomb',
            },
            {
                x: 748,
                y: 598,
                key: 'bomb',
            },
            {
                x: 760,
                y: 594,
                key: 'bomb',
            },
            {
                x: 772,
                y: 596,
                key: 'bomb',
            },
            {
                x: 780,
                y: 599,
                key: 'bomb',
            },
            {
                x: 788,
                y: 597,
                key: 'bomb',
            },
            {
                x: 792,
                y: 597,
                key: 'bomb',
            },
        ],
    }
]

export function createPlatformModule(scene, objects) {

    for (let [index, platform] of platforms.entries()) {
        objects.platforms[++index] = scene.physics.add.staticGroup()
    }

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
                objects.platforms[objects.platformIndex].create(ledge.x, ledge.y, ledge.key)
            }

            break
        }
    }

    return platforms
}