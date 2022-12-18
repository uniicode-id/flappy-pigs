import { ctx, canvas } from "./script.js"

export class Bird {
    constructor({ name, x, y, speed }) {
        this.name = name
        this.width = 24
        this.height = 24
        this.x = x
        this.y = y
        this.speed = speed * 2
        this.gravity = 0.5
    }

    // --- moving function
    jump(treshold) {
        this.speed = 10
        this.gravity = 0.5
        this.y -= treshold + this.gravity + this.speed / 1.25

        this.draw()
    }

    die() {
        console.log('mati')
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

export class Pipe {
    constructor({ x }) {
        this.gap = 120
        this.width = 80
        this.bottomHeight = this.generetaRandomHeight()
        this.topHeight = canvas.height - (this.bottomHeight + this.gap)
        this.x = x
        this.y = {
            bot: canvas.height - this.bottomHeight,
            top: 0
        }
        this.distances = canvas.width - 30
    }

    generetaRandomHeight() {
        const val = (Math.floor(Math.random() * (canvas.height / 2) + (Math.random() * 30)))

        return val
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

    regenerate() {
        this.x = this.distances * 2 - 30
        this.gap = Math.floor(Math.random() * 20) + 120
        this.bottomHeight = this.generetaRandomHeight()
        this.topHeight = canvas.height - (this.bottomHeight + this.gap)
        this.y = {
            bot: canvas.height - this.bottomHeight,
            top: 0
        }
    }
}