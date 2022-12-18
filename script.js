import { Pipe, Bird } from './classes.js'

// ---------------------------------------------------------------
// --- DOM ---
// ---------------------------------------------------------------

const doc = window.document

/** @type {HTMLCanvasElement} */
export const canvas = doc.getElementById('canvas')
export const ctx = canvas.getContext('2d')

// --- canvas property
canvas.style.backgroundColor = 'blue'
canvas.width = 280
canvas.height = 480

// --- Element
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

// --- Game function mechanics
function control(e) {
    // --- player control
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
    timer(frames)

    if (die) {
        cancelAnimationFrame(frames)
    }
}

// --- Timer function
let mili = 0
function timer(count) {
    mili++
    let miliSecond = mili % 60 == 0 ? mili = 0 : mili
    let second = Math.floor(count / 60)
    let min = 0
    let hour = 0

    timerElement.innerText = `${hour}:${min}:${second}:${miliSecond}`
}

// --- Main function
function init() {
    dieElement.hidden = true
    animation()
}

init()


// const doc = window.document

// const usernameInput = doc.getElementById('usernameInput');
// const passwordInput = doc.getElementById('passwordInput');
// const loginButton = doc.getElementById('loginButton');
// const admin = doc.getElementById('admin');
// const user = doc.getElementById('user');
// const form = doc.getElementById('form')

// // reset title
// admin.style.display = "none";
// user.style.display = "none";


// // login function
// function onLogin(e) {
//     e.preventDefault()

//     console.log('tombol di klik sini');
//     console.log(usernameInput.value)
//     console.log(passwordInput.value)
//     localStorage.setItem("admin", usernameInput.value);

//     if(usernameInput.value === '' || passwordInput.value === ''){
//         alert('Insert datanya dulu gan')
//         return
//     }
// }

// function saveToLocalStorage(){
//     if (usernameInput.value == "bimaardyansyah" && passwordInput.value == "B1m@ardyans") {
//         admin.style.display = ("block");
//         user.style.display = ("none")
//         localStorage.setItem("role", "admin");
//         form.hidden = true
//     } else {
//         user.style.display = ("block")
//         admin.style.display = ("none")
//         localStorage.setItem("role", "user");
//         form.hidden = true
//     }

//     if (localStorage.getItem('username')) {
//         loginButton.style.display = "none"

//         if (localStorage.getItem('role') == "admin") {
//             admin.style.display = ("block");
//             user.style.display = ("none")
//         } else {
//             user.innerText = `Login sebagai pengguna, halo ${usernameInput.value}`
//             user.style.display = ("block")
//             admin.style.display = ("none")
//         }
//     }
// }

// form.addEventListener('submit', (e) => {
//     onLogin(e)
// })