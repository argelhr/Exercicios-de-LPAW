import { loadImage } from "./loadAssets"
import { getKeys, hasKey, keyDownUp } from "./keyboard"
import Hero from "./Hero"
import Rect from "./model/Rect"
import Enemy from "./Enemy"
import Projetil from "./Projetil"


let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let bgImage
let bgImage2
let pattern


let boundaries = {
    width: canvas.width,
    height: canvas.height - 99
}

let megaman
let projetil

let blocos = []
let plataforma1 = new Rect(0, 225, 169, 30, 'black')
let plataforma2 = new Rect(238, 143, 320, 30, 'black')
let plataforma3 = new Rect(563, 222, 137, 30, 'black')
blocos.push(plataforma1)
blocos.push(plataforma2)
blocos.push(plataforma3)

let enemyLEFT = Array.from({ length: 5 })
let enemyRIGTH = Array.from({ length: 5 })
let gameover = false

const init = async () => {

    console.log("Iniciando game...")

    bgImage = await loadImage('img/background3.png')
    // pattern = ctx.createPattern(bgImage, 'repeat')
    bgImage2 = await loadImage('img/background2.png')

    megaman = new Hero(canvas.width / 2, canvas.height, 25, 10, 38, 38, 'img/X.png');
    // projetil = new Projetil(megaman.x,megaman.y,10,15,5,5,'img/.png')
    enemyLEFT = enemyLEFT.map(e => new Enemy(canvas.width, (Math.random() * canvas.height), 25, 10, 'red', 'img/enemy.png', 1))
    // console.log(enemyLEFT)
    enemyRIGTH = enemyRIGTH.map(e => new Enemy(canvas.width, Math.random() * canvas.height,25, 10, 'red','img/enemy.png'))

    console.log("Game iniciado com sucesso!")

    keyDownUp(window)
    loop()
}

const loop = () => {
    setTimeout(() => {

        // ctx.clearRect(0, 0, canvas.width, canvas.height)

        // ctx.fillStyle = pattern
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(bgImage,
            0,0,480,352,
            0,0,canvas.width,canvas.height)
        ctx.drawImage(bgImage2, 0, 0)

        enemyLEFT.forEach(e => {
            // console.log(e)
            e.moveEsquerda(boundaries)
            if (e.colide(megaman)) {
                e.respawn(boundaries)
            }

            e.draaw(ctx)
        })
        enemyRIGTH.forEach(e => {
            // console.log(e)
            e.move(boundaries)
            if (e.colide(megaman)) {
                e.respawn(boundaries)
            }

            e.draaw(ctx)
        })

        megaman.move(boundaries, blocos)
        // megaman.tiros.forEach(t => {
        //     t.move(boundaries, blocos)
        // })
        megaman.draw(ctx)

        requestAnimationFrame(loop)
    }, 1000 / 30)
}

export { init }