import Circle from './geometries/Circle';

export default class Smile extends Circle {

	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x, y, size, speed, color)
		this.status = 'ArrowRight';
		this.tempo = 0
		this.poderAtivo = false
		this.life = 3
	}

	paint(ctx) {
		ctx.fillStyle = "#fff";

		this.draw(ctx)

		this.circ(ctx,
			this.x - this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		this.circ(ctx,
			this.x + this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.arc(this.x, this.y + this.size / 4, this.size / 2, 0, Math.PI)
		ctx.strokeStyle = "#000"
		ctx.stroke()

		this.circ(ctx, this.x, this.y, this.size, 2, 'black')

	}

	move(limits, key) {
		let movements = {
			'ArrowDown': {sx: 0,sy: this.speed},
			'ArrowUp': { sx: 0, sy: - this.speed },
			'ArrowLeft': { sx: - this.speed, sy: 0 },
			'ArrowRight': { sx: this.speed, sy: 0 },
			'Space': { sx: 0, sy: 0 }
			//mudei o evento de teclado para code
			// para conseguir pegar o codigo da barra de espaço
		}

		this.status = movements[key] ? key : this.status
		// console.log(key)
		if (key == 'ShiftLeft' && this.tempo === 300){
			this.poderAtivo = true
			this.ativarPoder()
			
}

		const { sx, sy } = movements[this.status]

		this.x += sx
		this.y += sy
		// this.status = 'parado'
		this.limits(limits)
	}

	limits(limits) {
		if (this.x + this.size >= limits.width)
			this.x = limits.width - this.size
		if (this.x - this.size <= 0)
			this.x = this.size
		if (this.y + this.size >= limits.height)
			this.y = limits.height - this.size
		if (this.y - this.size <= 0)
			this.y = this.size

	}

	ativarPoder() {
		
		if(this.poderAtivo)
			this.trocaCor()

		this.speed = 10;

		setTimeout(() => {
			this.speed = 5
			this.tempo = 0
			this.color = 'yellow'
			this.poderAtivo = false
		}, 2000)


	}
}