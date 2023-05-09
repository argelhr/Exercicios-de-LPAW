

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')



const init = () => {

    console.log("Iniciando game...")
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.stroke()

}

export {init}