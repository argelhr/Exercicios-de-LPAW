import Enemy from "./Enemy"

let CTX
let CANVAS
const FRAMES = 15

let qtdEnemies = 60
let boundaries


let enemies = Array.from({ length: qtdEnemies });

const loop = () => {
	setTimeout(() => {

		CTX.fillStyle = 'rgba(255,255,255,0.3)'
		CTX.fillRect(0, 0,
			CANVAS.width, CANVAS.height)


		
		enemies.forEach(e => {
			e.move(boundaries, 0)
			e.draw(CTX)
			
		})
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

	enemies = enemies.map(i => new Enemy(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height, 10, 2, 'red'
	))

	
	
	loop()
}


export { init, loop }
