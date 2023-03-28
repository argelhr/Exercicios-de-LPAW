
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

    // triEqui(ctx, 100, 10, 80, "#000")
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
    style = 'normal', base = 'alphabetic'){
    
    ctx.font = `${style} ${size}px ${family}`
    ctx.textBaseline = base;
    console.log(ctx.font)
    let tamanho = ctx.measureText(text)
    ctx.fillStyle = color
    ctx.fillText(text, cwidth / 2 - tamanho.width / 2, cheight / 2 - size)
}