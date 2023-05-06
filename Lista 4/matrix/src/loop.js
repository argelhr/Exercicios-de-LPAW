
let CANVAS = document.querySelector('canvas')
let CTX = CANVAS.getContext('2d')
const FRAMES = 60

let letras = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789'
letras = letras.split('')
let boundaries

let x = 0
let y = 0

let textSize = 24;
let colunas
let drops

const loop = () => {
	setTimeout(() => {

		CTX.font = `bold ${textSize}px sans`;
		CTX.textBaseline = "top";

		CTX.fillStyle = 'rgba(0,0,0,0.15)'
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)


		CTX.fillStyle = "green"

		// for (x = 0; x < drops.length; x++) {
		// 	drops.forEach(() => {
		// 		CTX.fillText(texto, x*textSize, y);
		// 		y += textSize;
		// 	})
		// }

		x = x > CANVAS.width ? 0 : x

		for (let i = 0; i < colunas; i++) {

			let texto = letras[Math.floor(Math.random() * letras.length)]
			CTX.fillText(texto, x, drops[i])

			x += textSize
			drops[i] += textSize / 2

			if (Math.random() > 0.99) {
				CTX.fillStyle = "white"
				CTX.fillText('C', x, drops[i])
				drops[i] += textSize
				CTX.fillText('S', x, drops[i])
				drops[i] += textSize
				CTX.fillText('T', x, drops[i])
				drops[i] += textSize
				CTX.fillText('S', x, drops[i])
				drops[i] += textSize
				CTX.fillText('I', x, drops[i])
				drops[i] += textSize
				CTX.fillStyle = "green"
			}

			if (drops[i] > CANVAS.width && Math.random() > 0.9)
				drops[i] = 1

		}

		requestAnimationFrame(loop)
	}, 1000 / 15)
}


const init = () => {
	console.log("Initialize Canvas")

	colunas = CANVAS.width / textSize

	drops = Array.from({ length: colunas }).fill(1)


	CTX.linewidth = 1;
	CTX.beginPath()
	CTX.rect(0, 0, CANVAS.width, CANVAS.height);
	CTX.strokeStyle = "black";
	CTX.fill()


	loop()
}


export { init, loop }
