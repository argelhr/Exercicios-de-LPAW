
import Circle from "./Circle";
import { loadImage } from "../loadAssets";
import { getKeys, hasKey } from "../keyboard";
import Projetil from "./Projetil";

export default class Hero extends Circle {

	constructor(x, y, size, speed = 15, width, height, imgUrl) {
		super(x, y, size, speed)
		this.imgUrl = imgUrl
		loadImage(this.imgUrl)
			.then(img => {
				this.img = img
			})

		this.lado = 'right'
		this.parado = true

		this.atirando = false
		this.pulando = false
		this.pulo = false



		this.libera_tiro = false

		this.chao = true
		this.gravidade = 10
		this.velocidadeY = 0

		this.frameX = 0
		this.frameY = 0
		this.atirando = false

		this.altura = 38
		this.largura = 38
		this.pontos = 0
		this.vida = 0

		this.width = width
		this.height = height

		this.hit = new Circle(
			this.x + this.width,
			this.y + this.height,
			this.size,
			this.speed
		)

	}

	draw(CTX) {

		CTX.drawImage(
			this.img,
			this.frameX * this.largura, this.frameY * this.altura,
			this.largura, this.altura,
			this.x, this.y,
			this.largura * 2, this.altura * 2
		)

		// this.hit.draw(CTX)
	}

	buster(tiros, tiro) {
		if (!this.libera_tiro) {

			tiro.x = this.x + this.largura + 15
			tiro.y = this.y + this.altura / 2 + 5

			if (this.lado == 'left') {
				tiro.x = this.x
				tiro.speed = -15

			}

			this.libera_tiro = true
			tiros.push(tiro)

		}
	}



	move(limits, plataformas) {


		this.parado = hasKey('KeyA') || hasKey('KeyD') ? false : true
		this.atirando = hasKey('Enter') ? true : false

		if (this.chao) {
			if (!this.parado) {

				this.frameX += 1
				if (this.frameX > 11)
					this.frameX = 2

				if (this.lado === 'left') {
					this.x -= this.speed
					if (this.atirando)
						this.frameY = 3
					else
						this.frameY = 2

				} else {
					if (this.lado === 'right') {
						this.x += this.speed
						if (this.atirando)
							this.frameY = 1
						else
							this.frameY = 0
					}
				}
			}
			else {
				if (this.lado === 'right') {
					this.frameX = 0
					if (this.atirando)
						this.frameY = 1
					else
						this.frameY = 0
				} else if (this.lado === 'left') {
					this.frameX = 0
					if (this.atirando)
						this.frameY = 3
					else
						this.frameY = 2
				}


			}
		}

		if (hasKey('Space') && this.chao) {
			this.velocidadeY = 0
			this.chao = false
			console.log(this.chao)
		}
		else {
			this.y += this.velocidadeY
			console.log(this.velocidadeY)
			if (!this.chao) {
				if (this.velocidadeY <= 12) {
					this.y -= 15
					this.velocidadeY += 1
				}

				this.frameX = 0
				if (hasKey('KeyD')) {
					this.x += this.speed
				}
				else if (hasKey('KeyA')) {
					this.x -= this.speed
				}

				if (this.lado === 'right')
					this.frameY = this.atirando ? 5 : 4
				else
					this.frameY = this.atirando ? 7 : 6

			}
			else
				this.velocidadeY = 12
		}


		if (!this.parado)
			if (hasKey('KeyA') && !hasKey('KeyD')) { this.lado = 'left' }
			else if (hasKey('KeyD') && !hasKey('keyA')) this.lado = 'right'


		this.updateHit()
		this.limits(limits)

		plataformas.forEach(plat => {
			plat.colide(this)
		})


	}

	limits(limits) {
		if (this.x < 0)
			this.x = 0
		if (this.y < 0)
			this.y = 0
		if (this.x + this.largura * 2 >= limits.width)
			this.x = limits.width - this.largura * 2
		if (this.y + this.altura > limits.height) {
			this.y = limits.height - this.altura
			this.chao = true
		}

	}

	updateHit() {
		this.hit.x = this.x + this.width
		this.hit.y = this.y + this.height
	}
}