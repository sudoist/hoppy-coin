let texts = {
 score: {
        x: 16,
        y: 16,
        text: 'Score: 0',
        font: {
            fontSize: '32px',
            fill: '#FFF'
        }
    },
stage: 
   {
       x: 16,
       y: 46,
       text: 'Stage: 1',
       font: {
           fontSize: '32px',
           fill: '#FFF'
       }
   }
,
instruction: 
   {
       x: 16,
       y: 560,
       text: '',
       font: {
           fontSize: '32px',
           fill: '#FFF'
       }
   }

}

export function createTextModule() {
    return texts
}

let star = {
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
}

export function createStarModule() {
    return star
}

function generateStars(objects) {
    objects.stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
}

export function createStarChildrenModule(objects) {
    return generateStars(objects)
}

function startBomb(objects) {
    let x = (objects.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    let bomb = objects.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
}

export function createStartBombModule(objects) {
    return startBomb(objects)
}