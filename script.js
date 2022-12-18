import { Pipe, Bird } from './classes.js'

const doc = window.document

/** @type {HTMLCanvasElement} */
export const canvas = doc.getElementById('canvas')
export const ctx = canvas.getContext('2d')

canvas.style.backgroundColor = 'blue'
canvas.width = 280
canvas.height = 480

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
