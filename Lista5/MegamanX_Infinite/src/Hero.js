
import Circle from "./model/Circle";
import { loadImage } from "./loadAssets";

export default class Hero extends Circle {

	constructor(x, y, size, speed = 10, width, height, imgUrl, FRAMES) {
		super(x, y, size = 20, speed)
		this.imgUrl = imgUrl
		loadImage(this.imgUrl)
			.then(img => {
				this.img = img
				this.cellWidth = img.naturalWidth / this.totalSprites
				console.log('W:' + this.cellWidth)
			})
		this.gravidade = 10

		this.pulando = false
		this.caindo = false
		this.alturaPULO = 50


		this.altura = 35
		this.largura = 43
		this.totalSprites = 11
		this.spriteSpeed = 6
		console.log('H:' + this.altura)

		this.setControls()

		this.width = width
		this.height = height

		this.status = 'rigth'

		this.hit = new Circle(
			this.x + this.width,
			this.y + this.height,
			this.size,
			this.speed,
			10, "rgba(0,0,255,1)"
		)

		// this.animeSprite(FRAMES)
	}

	draw(CTX) {

		CTX.drawImage(
			this.img,
			0, 0, 43, 35,

			this.x, this.y,
			this.width * 2, this.height * 2
		)

		this.hit.draw(CTX)
	}

	animeSprite(FRAMES) { //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1
				? this.cellX + 1
				: 3;
		}, 1000 / (FRAMES * this.spriteSpeed / 10))
	}

	setControls() {
		this.controls = {
			'KeyA': 'left',
			'KeyD': 'rigth',
			'Space': 'up'
		}
	}

	setCellY() {
		let sprites = {
			// 'down': 0,
			// 'up': 1,
			// 'left': 3,
			// 'rigth':2
			'rigth': 0,
			'up': 1,

			'left': 2

		}

		this.cellY = sprites[this.status]
	}

	move(limits, keys) {
		
		// let movements = {
		// 	'left': { x: this.x - this.speed },
		// 	'rigth': { x: this.x + this.speed },
		// 	'parado': { x: this.x },
		// 	'jump' : { x: this.x}
		// }


		// this.status = this.controls[keys] ? this.controls[keys] : 'parado'
		// this.x = movements[this.status].x

		this.updateHit()
		this.limits(limits)



	}

	limits(limits) {
		if (this.x + this.largura > limits.width - this.largura)
			this.x = limits.width - this.largura * 2
		if (this.x <= 0)
			this.x = 0

		if (this.y + this.largura > limits.height)
			this.y = limits.height - this.largura
		if (this.y - this.largura <= 0)
			this.y = this.largura
	}

	updateHit() {
		this.hit.x = this.x + this.width
		this.hit.y = this.y + this.height
	}

	colide(other) {
		return (this.hit.size + other.size >= Math.sqrt(
			(this.hit.x - other.x) ** 2 + (this.hit.y - other.y) ** 2)
		)
	}

	pulo() {
		this.y -= this.gravidade
		this.alturaPULO -= 5
		this.pulando = true
		console.log(this.alturaPULO)
	}
	fall() {
		this.y += this.gravidade/2
		this.alturaPULO += 5
		if (this.alturaPULO >= 50)
			this.alturaPulo = 50
		this.pulando = false
	}
}