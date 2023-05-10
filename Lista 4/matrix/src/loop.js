
let CANVAS = document.querySelector('canvas')
let CTX = CANVAS.getContext('2d')
const FRAMES = 30

let letras = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789'
letras = letras.split('')

let CSTSI = 'CSTSI'
CSTSI = CSTSI.split('')

let x = 0

let textSize = 40;
let colunas
let drops //array
let texto
let flags //array pra colocar o CSTSI

CTX.font = `bold ${textSize}px sans`
CTX.textBaseline = "top"

const loop = () => {

	setTimeout(() => {

		CTX.fillStyle = 'rgba(0,0,0,0.1)'
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

		
		x = x >= CANVAS.width ? 0 : x
		
		for (let i = 0; i < colunas; i++) {
			
			if (flags[i] <= 4) {
				texto = CSTSI[flags[i]]
				CTX.fillStyle = 'white'
				flags[i] += 1
				console.log(flags)
			}
			else{
				CTX.fillStyle = "green"
				texto = letras[Math.floor(Math.random() * letras.length)]
			}

			CTX.fillText(texto, x, drops[i])

			x += textSize
			drops[i] += textSize

			if (Math.random() > 0.995 && flags[i] >= 5)
				flags[i] = 0

			if (drops[i] > CANVAS.width && Math.random() > 0.98)
				drops[i] = 1

		}
		
		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}


const init = () => {
	console.log("Initialize Canvas")

	colunas = Math.floor(CANVAS.width / textSize)

	drops = Array.from({ length: colunas },() => 1)//.fill(1)
	flags = Array.from({ length: colunas },() => 5)//.fill(5)

	CTX.linewidth = 1;
	CTX.beginPath()
	CTX.rect(0, 0, CANVAS.width, CANVAS.height);
	CTX.strokeStyle = "black";
	CTX.fill()


	loop()
}


export { init, loop }
