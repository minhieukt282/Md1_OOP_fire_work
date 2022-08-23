const c = document.getElementById("myCanvas").getContext("2d");
c.width = innerWidth;
c.height = innerHeight;
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = 0.01;
const friction = 0.99;

class Circle {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        this.alpha = 1
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath()
    }

    update() {
        this.draw();
        this.speed.x *= friction;
        this.speed.y *= friction;
        this.speed.y += gravity;
        this.x += this.speed.x
        this.y += this.speed.y
        this.alpha -= 0.01;
        // console.log(this.x + " - " + this.y)

    }
}

let circles

function init() {
    circles = []
}

function animation() {
    requestAnimationFrame(animation)
    c.fillStyle = 'rgba(0,0,0, 0.05)'
    c.fillRect(0, 0, c.width, c.height)

    circles.forEach((circle, index) => {
        if (circle.alpha <= 0) {
            circles.splice(index, 1)

        } else {
            circle.update();
        }
    })
}

// function run() {
window.addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    // mouse.x = Math.random() * c.width
    // mouse.y = Math.random() * c.height / 2
    const circleCount = 5;
    const angle = (Math.PI * 2) / circleCount
    const power = 20
    for (let i = 0; i < circleCount; i++) {
        circles.push(new Circle(mouse.x, mouse.y, 5, `hsl(${Math.random() * 360}, 50%,50%)`, {
            x: Math.cos(angle * i) * Math.random() * power,
            y: Math.sin(angle * i) * Math.random() * power
        }))
        // play();
    }
    console.log(circles)

})
// }

function play() {
    var audio = new Audio('firework.mp3')
    audio.play();
}


init()
animation()
// run()
// setInterval(run, 1000)

