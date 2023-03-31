
//padrao para todos os exercicios
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


//exercicio 1
function quad(ctx, x, y, s, l, color, fill = false) {
    ctx.lineWidth = 5
    ctx.strokeStyle = color
    ctx.strokeRect(x, y, s, l)

    if (fill) {
        ctx.fillStyle = fill
        ctx.fillRect(x, y, s, l)
    }

    
}

//exercicio 2
function circ(ctx, x, y, r, l, color, fill = false) {
    ctx.lineWidth = l

    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)

    ctx.strokeStyle = color
    ctx.stroke()

    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
}
//exercicio 3
function triEqui(ctx, x, y, l, color = "#000", rev = false) {

    ctx.lineWidth = 1
    ctx.strokeStyle = color
    ctx.beginPath()

    if (rev) {
        ctx.moveTo(x, y)
        ctx.lineTo(x + l, y)
        ctx.lineTo(x + l / 2, y + l)
        ctx.lineTo(x, y)
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill()
    }
    else {
        ctx.moveTo(x, y + l)
        ctx.lineTo(x + l, y + l)
        ctx.lineTo(x + l / 2, y)
        ctx.lineTo(x, y + l)
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill()
    }
}

//exercicio4
function drawStar(ctx, x, y, s, color) {

    triEqui(ctx, x, y, s, color, true)
    triEqui(ctx, x, y - s / 3, s, color, false)
    
}

// exercicio5
function writeCenterXY(
    ctx, cwidth, cheight,
    text, color = 'black',
    size = 12, family = 'serif',
    style = 'normal', base = 'alphabetic') {

    ctx.font = `${style} ${size}px ${family}`
    ctx.textBaseline = base;
    console.log(ctx.font)
    let tamanho = ctx.measureText(text)
    ctx.fillStyle = color
    ctx.fillText(text, cwidth / 2 - tamanho.width / 2, cheight / 2 - size)
}

function shield(ctx, x, y, size) {
    circ(ctx, x, y, size, 1, "red", "red")
    circ(ctx, x, y, size * .80, 1, "white", "white")
    circ(ctx, x, y, size * .7, 1, "red", "red")
    circ(ctx, x, y, size * .50, 1, "white", "white")
    circ(ctx, x, y, size * .4, 1, "blue", "blue")
    drawStar(ctx, x*.9, y*.9, size * .6,'white')
    circ(ctx, x, y, size * .4, 1, "blue")
    
}

function smile(ctx,x,y,size){
    circ(ctx, x, y, size, 1, "black", "yellow")
    circ(ctx, x-size/2, y-size/2, 5, 1, "black", "black")
    circ(ctx, x+size/2, y-size/2, 5, 1, "black", "black")

    ctx.beginPath()
    ctx.lineWidth=3
    ctx.arc(x, y, size*.65, 0, 3.14155555)

    ctx.strokeStyle = "black"
    ctx.stroke()

    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    ctx.closePath()

}
function aux(ctx){
    let gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

    gradiente.addColorStop(0, "#000")
    gradiente.addColorStop(.5, "#f00")
    gradiente.addColorStop(.9, "#00f")
    ctx.fillStyle = gradiente;

    ctx.fillRect(0, 0, canvas.width, canvas.height)
}