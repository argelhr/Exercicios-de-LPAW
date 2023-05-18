import { loadImage } from "./loadAssets"
import { getKeys, hasKey, keyDownUp } from "./keyboard"
import Hero from "./model/Hero"
import Rect from "./model/Rect"
import Enemy from "./model/Enemy"
import Heart from "./model/Heart"
import Projetil from "./model/Projetil"
import Background from "./model/Background"


let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let bgImage
let bgImage2
let bgImage3


let boundaries = {
    width: canvas.width,
    height: canvas.height - 99
}

let megaman//heroi
let heart//item coletavel
let projetil // imagem do tiro da buster
let tiro // tiro

let tiros = [] // lista de tiros

// lista de plataforma
let blocos = []
let plataforma1 = new Rect(0, 225, 169, 30, 'black')
let plataforma2 = new Rect(238, 143, 320, 30, 'black')
let plataforma3 = new Rect(563, 222, 137, 30, 'black')
blocos.push(plataforma1)
blocos.push(plataforma2)
blocos.push(plataforma3)


let enemyLEFT = Array.from({ length: 3 }) //inimigos que vão da direita para a esquerda <=
let enemyRIGTH = Array.from({ length: 3 })//inimigos que vão da esquerda para a direita =>
let gameover = false
const init = async () => {

    console.log("Iniciando game...")

    bgImage3 = new Background('img/background3.png')
    bgImage = await loadImage('img/background3.png') //background da catarata
    // pattern = ctx.createPattern(bgImage, 'repeat') //obsoleto
    bgImage2 = await loadImage('img/background2.png') //background de onde o megaman anda
    projetil = await loadImage('img/buster.png') //carregando a imagem do tiro

    //instanciando os personagens e item
    megaman = new Hero(canvas.width / 2, canvas.height, 25, 10, 38, 38, 'img/X.png')
    heart = new Heart(100, 243, 15, 0, 'red', 'img/item.png', 3, 60,15,16)
    enemyLEFT = enemyLEFT.map(e => new Enemy(canvas.width, (Math.random() * canvas.height), 25, 10, 'red', 'img/enemy.png', 1))
    enemyRIGTH = enemyRIGTH.map(e => new Enemy(canvas.width, Math.random() * canvas.height, 25, 10, 'red', 'img/enemy.png', 0))

    console.log("Game iniciado com sucesso!")

    keyDownUp(window)
    loop()


}

const loop = () => {
    setTimeout(() => {

        // ctx.drawImage(bgImage, 0, 0, 480, 352, 0, 0, canvas.width, canvas.height)
        bgImage3.draaw(ctx)
        ctx.drawImage(bgImage2, 0, 0)

        //map do inimigo <=
        enemyLEFT.forEach(e => {
            e.moveEsquerda(boundaries)
            e.draaw(ctx)
            if (e.hit.colide(megaman.hit)) {
                e.respawn(boundaries)
            }
            let indice = 0
            tiros.forEach(t => {
                indice++
                if (e.colide(t)) {
                    e.respawn(boundaries)
                    //     tiros.splice(indice, 1)

                }
            })
        })

        enemyRIGTH.forEach(e => {
            e.move(boundaries)
            if (e.hit.colide(megaman.hit)) {
                e.respawn(boundaries)
            }
            let indice
            tiros.forEach(t => {
                indice++
                if (e.colide(t)) {
                    e.respawn(boundaries)
                    megaman.pontos++
                    //     tiros.splice(indice, 1)

                }
            })

            e.draaw(ctx)
        })


        // console.log(tiros)
        if (megaman.atirando) {
            tiro = new Projetil(megaman.x, megaman.y - 80, 15, 13, 'red', projetil)
            megaman.buster(tiros, tiro)
        }
        else
            megaman.libera_tiro = false

        megaman.move(boundaries, blocos)
        megaman.draw(ctx)
        tiros.forEach(t => {
            // console.log(t)

            t.move()
            t.drawb(ctx)
        })

        heart.draaw(ctx)
        // heart.hit.draw(ctx)
        if (heart.hit.colide(megaman.hit)) {
            heart.respawn(boundaries)
            megaman.pontos+=10
            // console.log(megaman.pontos)
        }
        requestAnimationFrame(loop)
    }, 1000 / 30)
}

export { init }