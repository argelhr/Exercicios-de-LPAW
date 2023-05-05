import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x,y,size,speed,color)
		this.line = 1
		this.trocaCor()
		this.trocaTamanho
		// console.log('enemy',this) 
	}
	move(limits){
		this.y += 20
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
			this.trocaCor()
			this.trocaTamanho()
			this.y = Math.random()*limits.height
			this.x = Math.random()*limits.width;
		}
	}
}







