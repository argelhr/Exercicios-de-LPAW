import Circle from "./geometries/Circle";

export default class Food extends Circle {
	constructor(x, y, size, speed = 3, color = "#000") {
		super(x, y, size, speed, color)
		this.line = 1
		// console.log('enemy',this) 
	}
	move(limits) {
		Math.random() < 0.5 ? this.y = this.y + this.speed *0.1 :this.y -= this.speed*0.1
		Math.random() < 0.5 ? this.x += this.speed*0.1 :this.x -= this.speed*0.1
		// this.x += this.speed
		this.limits(limits)
	}

	limits(limits) {

		if (this.x + this.size >= limits.width){
			this.x = limits.width - this.size

		}
		if (this.x - this.size <= 0){
			this.x = this.size
		
		}
		if (this.y + this.size >= limits.height){
			this.y = limits.height - this.size
		}
		if (this.y - this.size <= 0){
			this.y = this.size
}
		}
}







