import { loadAudio, loadImage } from "./loadAssets"
import { getKeys, hasKey, keyDownUp } from "./keyboard"
import Hero from "./model/Hero"
import Rect from "./model/Rect"
import Enemy from "./model/Enemy"
import Heart from "./model/Heart"
import Projetil from "./model/Projetil"
import Background from "./model/Background"


let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

let bgImage
let bgImage2
let bgImage3
let texto
let barra
let animeReqReference
let ready


let boundaries = {
    width: canvas.width,
    height: canvas.height - 99
}

let megaman//heroi
let heart//item coletavel
let projetil // imagem do projetil da buster
let tiro // tiro
let tiros = [] // lista de tiros

let bola1, bola2, bola3, bola4//frames que aparece na morte

// sons do game
let theme
let som_buster
let som_item
let som_dano
let som_dano_inimigo //dano no inimigo
let death



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

    console.log('clicou')
    document.getElementById('musica').play()
    document.getElementById('home').pause()

    setTimeout(() => {
        console.log('atirando no menu')
    }, 1)
    // gambiarra pro som do tiro ficar sincronizado

    let blaster = document.getElementById('blaster')

    blaster.style.opacity = 1
    blaster.classList.add('animacao-tiro')

    document.getElementById('movendo-tiro').classList.add('movimento-tiro')

    setTimeout(() => {
        let start = document.getElementById("start")
        start.style.opacity = 0
        blaster.style.opacity = 0
        let container = document.getElementById("container")
        container.style.display = "none"
    }, 500)
    canvas.style.display = 'block'

    console.log("Iniciando game...")

    bgImage3 = new Background('img/background3.png')
    bgImage = await loadImage('img/background3.png') //background da catarata
    // pattern = ctx.createPattern(bgImage, 'repeat') //obsoleto
    bgImage2 = await loadImage('img/background2.png') //background de onde o megaman anda
    projetil = await loadImage('img/buster.png') //carregando a imagem do tiro
    barra = await loadImage('img/vida.png')

    // sons do jogo
    theme = await loadAudio('audio/fase.mp3')
    theme.volume = .3

    som_dano = await loadAudio('audio/dano_megaman.mp3')
    som_buster = await loadAudio('audio/buster.mp3')

    som_dano_inimigo = await loadAudio('audio/colisao_buster_inimigo.mp3')
    death = await loadAudio('audio/death.mp3')
    som_item = await loadAudio('audio/heart.mp3')


    //instanciando os personagens e item
    megaman = new Hero(canvas.width / 2, canvas.height, 25, 10, 38, 38, 'img/X.png')
    heart = new Heart(100, 243, 15, 0, 'red', 'img/item.png', 3, 30, 15, 16)


    //reaprovetei a classe heart por ter os metodos que preciso pra ficar mudando a sprite desses componentes
    ready = new Heart(canvas.width / 2 + 40, canvas.height / 2 -50, 0, 3, 'red', 'img/ready.png', 14, 60, 40, 14)
    bola1 = new Heart(0, 0, 0, 5, 'red', 'img/bola.png', 13, 120, 41, 39)
    bola2 = new Heart(0, 0, 0, 5, 'red', 'img/bola.png', 13, 120, 41, 39)
    bola3 = new Heart(0, 0, 0, 5, 'red', 'img/bola.png', 13, 120, 41, 39)
    bola4 = new Heart(0, 0, 0, 5, 'red', 'img/bola.png', 13, 120, 41, 39)

    enemyLEFT = enemyLEFT.map(e => new Enemy(canvas.width, (Math.random() * canvas.height), 25, 10, 'red', 'img/enemy.png', 1))
    enemyRIGTH = enemyRIGTH.map(e => new Enemy(canvas.width, Math.random() * canvas.height, 25, 10, 'red', 'img/enemy.png', 0))

    console.log("Game iniciado com sucesso!")
    theme.play()

    keyDownUp(window)
    pre_loop()


}
let aux = 0
const pre_loop = () => {
    setTimeout(() => {
        aux++
        bgImage3.draaw(ctx)
        ctx.drawImage(bgImage2, 0, 0)
        ctx.drawImage(barra, 1, 1, 15, 85, 20, 20, 30, 160)
        ctx.fillStyle = 'black'
        ctx.fillRect(26, 26, 16, megaman.vida * 12.2)

        ready.draaw(ctx)


        if (aux === 110) {
            cancelAnimationFrame(pre_loop)
            requestAnimationFrame(loop)
        }
        else animeReqReference = requestAnimationFrame(pre_loop)




    }, 1000 / 40);
}

const loop = () => {
    setTimeout(() => {

        // ctx.drawImage(bgImage, 0, 0, 480, 352, 0, 0, canvas.width, canvas.height)
        bgImage3.draaw(ctx)
        ctx.drawImage(bgImage2, 0, 0)
        ctx.drawImage(barra, 1, 1, 15, 85, 20, 20, 30, 160)
        ctx.fillStyle = 'black'
        ctx.fillRect(26, 26, 16, megaman.vida * 12.2)

        //foreach do inimigo <=
        enemyLEFT.forEach(e => {

            e.moveEsquerda(boundaries)
            e.draaw(ctx)

            if (e.hit.colide(megaman.hit)) {
                e.respawn(boundaries)
                som_dano.currentTime = 0
                som_dano.play()
                megaman.vida++
            }

            tiros.forEach(t => {
                // indice++
                if (e.colide(t)) {
                    e.respawn(boundaries)
                    som_dano_inimigo.currentTime = 0
                    som_dano_inimigo.play()

                    t.x += 700

                    megaman.pontos++
                    //     tiros.splice(indice, 1)

                }
            })
        })

        enemyRIGTH.forEach(e => {

            e.move(boundaries)
            e.draaw(ctx)

            if (e.hit.colide(megaman.hit)) {
                e.respawn(boundaries)
                megaman.vida++
                som_dano.currentTime = 0
                som_dano.play()
            }

            tiros.forEach(t => {
                if (e.hit.colide(t)) {
                    t.x -= 700
                    som_dano_inimigo.currentTime = 0
                    som_dano_inimigo.play()
                    e.respawn(boundaries)
                    megaman.pontos++
                    //     tiros.splice(indice, 1)
                }
            })

        })

        let textSize = 24;
        ctx.font = `bold ${textSize}px sans`;
        ctx.textBaseline = "top";
        ctx.fillStyle = "#fff";
        texto = `Pontos: ${megaman.pontos}`
        ctx.fillText(
            texto,
            canvas.width - 130,
            textSize / 3
        )

        //quando clica pra atirar, cria apenas um
        if (megaman.atirando) {
            tiro = new Projetil(megaman.x, megaman.y - 80, 15, 13, 'red', projetil)
            if (!megaman.libera_tiro) {
                som_buster.currentTime = 0
                som_buster.play()
                megaman.buster(tiros, tiro)
            }
            //aqui dentro deste metodo nao deixa criar novos tiros com apenas um enter
        }
        else
            megaman.libera_tiro = false

        megaman.move(boundaries, blocos)
        megaman.draw(ctx)

        tiros.forEach(t => {
            t.move()
            t.drawb(ctx)
        })

        heart.draaw(ctx)// heart.hit.draw(ctx)

        if (heart.hit.colide(megaman.hit)) {
            heart.respawn(boundaries)
            megaman.pontos += 10
            som_item.currentTime = 0
            som_item.play()
        }

        gameover = megaman.vida === 10 ? true : false

        if (gameover) {
            console.error('DEAD!!!')
            bola1.x = bola2.x = bola3.x = bola4.x = megaman.x
            bola1.y = bola2.y = bola3.y = bola4.y = megaman.y
            death.currentTime = 0.5
            death.play()
            theme.pause()
            requestAnimationFrame(morte)
        } else animeReqReference = requestAnimationFrame(loop)

    }, 1000 / 30)
}

const morte = () => {
    setTimeout(() => {


        // ctx.drawImage(bgImage, 0, 0, 480, 352, 0, 0, canvas.width, canvas.height)
        bgImage3.draaw(ctx)
        ctx.drawImage(bgImage2, 0, 0)
        ctx.drawImage(barra, 1, 1, 15, 85, 20, 20, 30, 160)
        ctx.fillStyle = 'black'
        ctx.fillRect(26, 26, 16, megaman.vida * 12.2)

        bola1.draaw(ctx)
        bola2.draaw(ctx)
        bola3.draaw(ctx)
        bola4.draaw(ctx)

        bola1.moveX()
        bola2.moveX2()
        bola3.moveY()
        bola4.moveY2()

        let textSize = 24;
        ctx.font = `bold ${textSize}px sans`;
        ctx.textBaseline = "top";
        ctx.fillStyle = "#fff";
        texto = `Pontos: ${megaman.pontos}`
        ctx.fillText(
            texto,
            canvas.width - 130,
            textSize / 3
        )

        requestAnimationFrame(morte)

    }, 1000 / 60)
}

export { init }