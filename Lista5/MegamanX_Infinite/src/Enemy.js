import { loadImage } from "./loadAssets";
import Circle from "./model/Circle";

export default class Enemy extends Circle {
	constructor(x, y, size, speed = 10, color = "#fff", imgURL, frame) {
		super(x, y, size, speed, color)
		this.imgURL = imgURL
		loadImage(this.imgURL)
			.then(img => {
				this.img = img
				this.cellWidth = img.naturalWidth/this.totalSprites

			})
		this.line = 1
		this.width = 47
		this.height = 39

		this.cellHeight= 177
		this.cellX = 0
		this.totalSprites = 3
		this.spriteSpeed = 1

		this.frameY = frame
		this.frameX = 0

		this.hit = new Circle(
			this.x + this.width + 50,
			this.y + this.height,
			this.size,
			this.speed,
			10, "rgba(255,0,0,1)"
		)
		this.animeSprite(30)
	}

	draaw(CTX) {

		CTX.drawImage(
			this.img,
			this.frameX * this.width, this.frameY * this.height,
			this.width, this.frameY * this.height,
			this.x, this.y,
			this.width * 2, this.height * 2
		)

		this.updateHit()
		this.hit.draw(CTX)
	}

	move(limits) {
		this.x += this.speed
		this.limits(limits)
	}
	moveEsquerda(limits) {
		this.x -= this.speed
		this.limits(limits)

	}
	updateHit() {
		this.hit.x = this.x + this.width
		this.hit.y = this.y + this.height
	}


	limits(limits) {

		if (this.x <0 && Math.random() > 0.9755) {
			// this.trocaCor()
			this.y = Math.random() * limits.height
			this.x = limits.width + 70
		}
	}

	animeSprite(FRAMES) { //Controla a animacao do sprite
		setInterval(() => {
			this.frameX = this.frameX < 10
				? this.frameX + 1
				: 0;
		}, 1000 / (60 * this.spriteSpeed / 9))
	}
}







