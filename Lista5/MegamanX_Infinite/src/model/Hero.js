
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

		this.parado = true
		this.esquerda = false
		this.direita = false
		this.atirando = false
		this.pulo = false

		this.libera_tiro = false

		this.chao = true
		this.gravidade = 10
		this.velocidadeY = 18

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

			tiro.x = this.x + this.largura + 30
			tiro.y = this.y + this.altura / 2 + 5

			if (this.esquerda) {
				tiro.x = this.x - 15
				tiro.speed = -10
			}

			this.libera_tiro = true
			tiros.push(tiro)

		}
	}



	move(limits, plataformas) {
		this.y += this.gravidade

		if (this.direita) {
			this.x += this.speed
			this.frameX += 1
			if (this.atirando)
				this.frameY = 1
			else
				this.frameY = 0
			if (this.frameX > 11)
				this.frameX = 2
		}
		if (this.esquerda) {
			this.x -= this.speed
			this.frameX += 1

			if (this.atirando)
				this.frameY = 3
			else
				this.frameY = 2

			if (this.frameX > 11)
				this.frameX = 2
		}

		if (this.pulo) {
			this.chao = false
			this.pulando = true
			this.y -= this.velocidadeY
			this.frameX += 1
			if (this.esquerda)
				if (this.atirando)
					this.frameY = 7
				else
					this.frameY = 6
			else
				if (this.atirando)
					this.frameY = 5
				else
					this.frameY = 4

			if (this.frameX >= 11)
				this.frameX = 2
		}

		if (getKeys().length === 0)
			this.frameX = 0


		this.esquerda = hasKey('KeyA') ? true : false
		this.direita = hasKey('KeyD') ? true : false
		this.atirando = hasKey('Enter') ? true : false
		this.pulo = hasKey('Space') ? true : false

		hasKey('KeyD') && hasKey('KeyA') ? this.frameX = 0 : null


		this.updateHit()
		this.limits(limits)

		plataformas.forEach(plat => {
			plat.colide(this)
		});


	}

	limits(limits) {
		if (this.x < 0)
			this.x = 0
		if (this.y < 0)
			this.y = 0
		if (this.x + this.largura * 2 >= limits.width)
			this.x = limits.width - this.largura * 2
		if (this.y + this.altura / 3 > limits.height) {
			this.y = limits.height - this.altura / 3
			this.chao = true
		}

	}

	updateHit() {
		this.hit.x = this.x + this.width
		this.hit.y = this.y + this.height
	}
}