import Quad from "./Quad.js";

let CANVAS = document.querySelector('canvas')
let CTX = CANVAS.getContext('2d')

let aux
let x = 0
let y = 0
let quad = new Quad(0, 0, CANVAS.width, CANVAS.height, 'WHITE')
let controle = 0
let FRAMES = 15

const init = () => {

    aux = CANVAS.width / 3.2

    quad.draw(CTX)


    CTX.lineWidth = 5;
    CTX.fillStyle = 'white'
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

    loop()
}

const loop = () => {
    setTimeout(() => {
        let color
        if (controle % 2 == 0) {
            color = 'black'
        }
        else {
            color = 'blue'
        }
        CTX.fillStyle = color
        CTX.shadowColor = color;
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 15;
        CTX.fillRect(x, y, aux, aux)
        x += aux

        if (x > CANVAS.width) {
            x = 0
            y += aux
            if (aux > 13)
                aux /= 2
        }

        controle++
        
        if (y > 400) {
            cancelAnimationFrame(loop)
        }
        console.log(y)

        requestAnimationFrame(loop)
    }, 1000 / FRAMES)
}



export { init }
