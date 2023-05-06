
let CTX
let CANVAS
const FRAMES = 60

let letras = "ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789"
letras = letras.split()

let boundaries

let x = 0
let y = 0

const loop = () => {
	setTimeout(() => {



		let textSize = 40;
		CTX.font = `bold ${textSize}px sans`;
		CTX.textBaseline = "top";
		CTX.fillStyle = 'rgba(0,0,0,0.05)'
		CTX.fillRect(0, 0,
			CANVAS.width, CANVAS.height)
		let texto = letras[Math.floor(Math.random() * letras.length)]

		CTX.fillStyle = "green"
		CTX.fillText(texto, x, y)

		x += textSize / 2
		if (x > CANVAS.width) {
			y += textSize
			x = 0
		}
		if (x > CANVAS.width && y > CANVAS.height) {
			x = 0
			y = 0
		}
		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

// export default function init(){
// function init(){
const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')

	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	CTX.linewidth = 5;
	CTX.beginPath();
	CTX.rect(0, 0, boundaries.width, boundaries.height);
	CTX.strokeStyle = '#black';
	CTX.fill();






	loop()
}


export { init, loop }
