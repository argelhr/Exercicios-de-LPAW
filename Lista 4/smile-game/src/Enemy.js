import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x,y,size,speed,color)
		this.line = 1
		// console.log('enemy',this) 
	}
	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height && Math.random() > 0.97){
			this.trocaCor()
			this.y = 0
			this.x = Math.random()*limits.width;
		}
	}
}







