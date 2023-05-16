import { Pipe, Bird } from './classes.js'

// ---------------------------------------------------------------
// --- DOM ---
// ---------------------------------------------------------------

const doc = window.document

/** @type {HTMLCanvasElement} */
export const canvas = doc.getElementById('canvas')
export const ctx = canvas.getContext('2d')

canvas.style.backgroundColor = 'blue'
canvas.width = 280
canvas.height = 480

const dieElement = doc.getElementById('die-message')
const timerElement = doc.getElementById('timer')

// ---------------------------------------------------------------
// --- GAME OBJECT ---
// ---------------------------------------------------------------

const player = new Bird({ name: 'galih', x: 12, y: 24, speed: 10 })
const pipes = [
    new Pipe({ x: canvas.width }),
    new Pipe({ x: canvas.width * 2 - 20 }),
]

// --- Game states
// TODO : create an object
let treshold = 0
let onJump = false
let die = false
let score = 0

// --- Game function mechanics
// --- player control
function control(e) {
    if (e.keyCode === 32) {
        onJump = true
        treshold += 0.25
    }
}

// ---------------------------------------------------------------
// --- EVENT LISTENER --- 
// ---------------------------------------------------------------

// --- Browser event listener for game controller
// window.addEventListener('mousemove', (e) => {
//     const rect = canvas.getBoundingClientRect()
//     console.log(e.clientX - rect.x)
//     pipes.forEach((p, i) => {
//         console.log(`
//             pipes property:
//                 x : ${p.x}
//             bottom pipes (coords) : 
//                 ${p.y.bot} 
//             upper pipes (coords) : 
//                 ${p.y.top}
//         `)

//     })
// })

window.addEventListener('keydown', (e) => control(e))
window.addEventListener('keyup', (e) => {
    // reset treshold
    treshold = 0
    onJump = false
})


// ---------------------------------------------------------------
// --- MAIN FUNCTION ---
// ---------------------------------------------------------------
function collision(pipes) {
    const p = pipes
    if (player.x + player.width >= p.x && player.y <= p.y.top + p.topHeight || player.y + player.height >= p.y.bot) {
        dieElement.hidden = false
        die = true
    }
}

// --- Animate function
// TODO : REFACTOR WHOLE FUNCTION
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // TODO : move to single function
    if (onJump === false) {
        player.updates()
    } else {
        player.jump(treshold)
    }

    // TODO : move to single function
    pipes.forEach((p, i) => {
        p.updates()

        // collision detection
        const distances = (p.x) - (player.x + player.width)

        if (distances < 10) {
            console.log('approaching...')
            collision(p)
        }

        if (p.x + p.width <= 0) {
            p.regenerate(i)
        }
    })

    const frames = requestAnimationFrame(animation)
    fpsTime(frames)

    if (die) {
        cancelAnimationFrame(frames)
        timer(false)
    }
}

// --- Timer function
function timer(on) {
    if (!on) return

    let miliSecond = 0
    let second = 0
    let min = 0
    let hour = 0

    setInterval(() => {
        // miliSecond % 1000 == 0 ? 0 : miliSecond
        miliSecond++

        if (miliSecond == 1000) {
            miliSecond = 0
            second++
        }
        if (second == 60) {
            second = 0
            min++
        }

        if (min == 60) {
            min = 60
            hour++
        }

        timerElement.innerText = `${hour}:${min}:${second}:${miliSecond}`
    }, 1)
}

function fpsTime(frames) {
    const fpsTimer = doc.getElementById('fps')

    let fm = frames % 60 == 0 ? 0 : frames
    let second = Math.floor(fm / 60)
    let min = 0
    let hour = 0

    if (second == 60) {
        second = 0
        min++
    }

    if (min == 60) {
        min = 60
        hour++
    }

    fpsTimer.innerText = `${hour}:${min}:${second}:${frames}`
}

// --- Main function
function init() {
    dieElement.hidden = true
    animation()
    timer(true)
}

init()
















