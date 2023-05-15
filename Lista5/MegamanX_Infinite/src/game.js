import { loadImage } from "./loadAssets"
import { getKeys, hasKey, keyDownUp } from "./keyboard"
import Hero from "./Hero"

// import { Sprite } from "./sprite"


let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let bgImage
let bgImage2
let pattern

let boundaries = {
    width: canvas.width,
    height: canvas.height * .837
}
let megaman = new Hero(canvas.width / 2, boundaries.height, 20, 7, 43, 35, 'img/X.png', 30);

let gameover = false
let anime;

const init = async () => {

    console.log("Iniciando game...")
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.stroke()

    bgImage = await loadImage('img/background.png')
    pattern = ctx.createPattern(bgImage, 'repeat')
    bgImage2 = await loadImage('img/background2.png')

    keyDownUp(window)
    loop()
}

const loop = () => {
    setTimeout(() => {

        // ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(bgImage2, 0, 0)

        // megaman.y += megaman.speed

        megaman.draw(ctx)
        megaman.move(boundaries, getKeys())
        megaman.moveY(boundaries, getKeys())

        requestAnimationFrame(loop)
    }, 1000 / 30)
}

export { init }