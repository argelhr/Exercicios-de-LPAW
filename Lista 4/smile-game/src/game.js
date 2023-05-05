import Enemy from "./Enemy"
import Food from "./Food"
import Smile from "./Smile"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 60

let qtdEnemies = 3


const smile = new Smile(300, 100, 20, 5, 'yellow')

let gameover = false
let animeReqReference
let boundaries

let pontos = 0

let enemies = Array.from({ length: qtdEnemies });
let foods = Array.from({ length: 1 })

const loop = () => {
	setTimeout(() => {

		// console.log(smile.tempo)
		if (smile.tempo != 300)
			smile.tempo += 1


		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		//input

		let textSize = 24;
		CTX.font = `bold ${textSize}px sans`;
		CTX.textBaseline = "top";
		let texto = `Pontos: ${pontos}`;
		let textMetric = CTX.measureText(texto);

		CTX.fillStyle = "#00f";
		CTX.fillText(
			texto,
			CANVAS.width / 2 - textMetric.width / 2,
			textSize / 3
		)

		texto = `Vidas: ${smile.life}`
		textMetric = CTX.measureText(texto);
		CTX.fillText(
			texto,
			30,
			textSize / 3
		)

		// texto = smile.tempo == 300 ? 'Power ON!': 'Loading...'
		// textMetric = CTX.measureText(texto);
		// CTX.fillText(
		// 	texto,
		// 	CANVAS.width *.8 - textMetric.width / 2,
		// 	textSize / 2
		// )

		CTX.strokeStyle = 'blue';
		CTX.strokeRect(boundaries.width-105, 5, 100, 25);
		
		smile.tempo != 300 ? 
			CTX.fillStyle = 'rgba(255, 255 ,0.7)'
		:	CTX.fillStyle = 'red'
		CTX.fillRect(boundaries.width-104, 6, smile.tempo/3-2, 23);
		
		


		smile.move(boundaries, key)//update
		smile.paint(CTX)//draw

		enemies.forEach(e => {
			e.move(boundaries, 0)
			e.draw(CTX)
			//var = teste?verdadeiro:falso;
			if (e.colide(smile)) {
				smile.life--
				gameover = smile.life == 0 ? !gameover : false
				e.x = Math.random() * boundaries.width
				e.y = 0
			}

		})
		// console.log(smile.life)

		foods.forEach(f => {
			f.move(boundaries, 0)
			f.draw(CTX)
			
			if (f.colide(smile)) {
				smile.size += 1
				f.x = Math.random() * boundaries.width
				f.y = Math.random() * boundaries.height

				pontos++
				if (pontos % 3 == 0) {

					let maisInimigo = new Enemy(
						Math.random() * CANVAS.width,
						0, 10, 2, 'red')

					enemies.push(maisInimigo)
				}
			}
		})

		if (gameover) {
			console.error('DEAD!!!')
			cancelAnimationFrame(animeReqReference)
		} else animeReqReference = requestAnimationFrame(loop)

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
		0, 10, 2, 'red'
	))

	foods = foods.map(i => new Food(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		10, 5, 'green'
	))

	keyPress(window)
	loop()
}


export { init, loop }
