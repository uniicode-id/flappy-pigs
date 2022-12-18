const doc = window.document

/** @type {HTMLCanvasElement} */
const canvas = doc.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.style.backgroundColor = 'blue'
canvas.width = 280
canvas.height = 480

class Bird {
    constructor({ name, x, y, speed }) {
        this.name = name
        this.width = 24
        this.height = 24
        this.x = x
        this.y = y
        this.speed = speed
        this.gravity = 0.05
    }

    // --- moving function
    jump(treshold) {
        this.speed = 10
        this.gravity = 0.5
        this.y -= treshold + this.gravity + this.speed / 1.25

        this.draw()
    }

    die() {

    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'yellow'
    }

    updates() {
        this.gravity += this.speed
        this.speed += 1.25
        this.y += this.speed / 10

        this.draw()
    }
}

function generetaRandomHeight(treshold) {
    const val = (Math.floor(Math.random() * (canvas.height / 2) + (Math.random() * 30)))

    return val
}
class Pipe {
    constructor({ x }) {
        this.gap = 120
        this.width = 80
        this.bottomHeight = generetaRandomHeight()
        this.topHeight = canvas.height - (this.bottomHeight + this.gap)
        this.x = x
        this.y = {
            bot: canvas.height - this.bottomHeight,
            top: 0
        }
        this.distances = canvas.width - 30
    }

    draw() {
        ctx.fillRect(this.x, this.y.bot, this.width, this.bottomHeight)
        ctx.fillRect(this.x, this.y.top, this.width, this.topHeight)
        ctx.fillStyle = 'green'
    }

    updates() {
        this.x -= 2

        this.draw()
    }

    regenerate(index) {
        this.x = this.distances * 2 - 30
        this.gap = Math.floor(Math.random() * 20) + 120
        this.bottomHeight = generetaRandomHeight()
        this.topHeight = canvas.height - (this.bottomHeight + this.gap)
        this.y = {
            bot: canvas.height - this.bottomHeight,
            top: 0
        }
    }
}

// const map = new Map({ width: 240, height: 1280 })
const player = new Bird({ name: 'galih', x: 12, y: 24, speed: 10 })
const pipes = [
    new Pipe({ x: canvas.width }),
    new Pipe({ x: canvas.width * 2 - 20 }),
]

let treshold = 0
let onJump = false
function gameMechanics(e) {
    // --- player control
    if (e.keyCode === 32) {
        onJump = true
        treshold += 0.25
    }
}

window.addEventListener('keydown', (e) => gameMechanics(e))
window.addEventListener('keyup', (e) => {
    // reset treshold
    treshold = 0
    onJump = false
})

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (onJump === false) {
        player.updates()
    } else {
        player.jump(treshold)
    }

    pipes.forEach((p, i) => {
        p.updates()

        if (p.x + p.width <= 0) {
            p.regenerate(i)
        }
    })


    requestAnimationFrame(animation)
}

function init() {
    animation()
}

init()
