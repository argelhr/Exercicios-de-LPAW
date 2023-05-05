
let CTX
let CANVAS
const FRAMES = 15

let boundaries

let letras = "ABCBEFGHIJKLMNOPQRSTUVXYZ0123456789"
letras = letras.split()


const loop = () => {
	setTimeout(() => {

		CTX.fillStyle = 'rgba(255,255,255,0.3)'
		CTX.fillRect(0, 0,
			CANVAS.width, CANVAS.height)






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

	let textSize = 20;
	CTX.font = `bold ${ textSize }px sans`;
	CTX.textBaseline = "top";
	let texto = "01a Canvas!";
	let textMetric = CTX.measureText(texto)
	CTX.fillStyle = "green";
	CTX.fillText(texto,
		CTX.width / 2 - textMetric.width / 2,
		CTX.height / 2 - textSize)



	loop()
}


export { init, loop }
