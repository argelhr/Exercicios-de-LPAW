
export default class Rect {
	constructor(x, y, xf, yf, color = "#00f") {
		this.x = x;
		this.y = y;
		this.xf = xf
		this.yf = yf;
		this.color = color;
	}
	pinta(ctx) {
		ctx.lineWidth = 5;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.xf, this.yf);
	}

	colide(hero) {
		// if (hero.x < this.x + this.xf && hero.x + hero.largura > this.x &&
		// 	hero.chao >= this.y + 5) {
		// 		console.log(this.x,hero.x)
		// 		hero.y = this.y +5
		// 		console.log('aaaaaaaaaaaaaaaaa')
		// }

		if (hero.x < this.x + this.xf-20 && hero.x + hero.largura > this.x &&
			hero.y < this.y + this.yf && hero.y + hero.altura > this.y) {
				hero.y = this.y - hero.altura;
				hero.chao = true
		}
		
		
		// const centroHEROX = hero.x + hero.largura / 2
		// const centroHEROY = hero.y + hero.altura / 2
		// const centroRECTX = this.x + this.xf / 2
		// const centroRECTY = this.y + this.yf / 2

		// let catetoX = centroHEROX - centroRECTX
		// let catetoY = centroHEROY - centroRECTY

		// let somaX = hero.x / 2 + this.x / 2
		// let somaY = hero.y / 2 + this.y / 2

		// if (Math.abs(catetoX) < somaX && Math.abs(catetoY) < somaY)
		// {	
		// }

		// if (hero.x < this.x + this.xf && hero.x + hero.largura > this.x &&
		// 	hero.y < this.y + this.yf && hero.y + hero.altura > this.y) {
		// 	  if (hero.y + hero.altura <= this.y + 5) { // 5 é um valor de folga para evitar que o personagem afunde na plataforma
		// 		hero.y = this.y - hero.altura; // Define a posição do personagem para ficar em cima da plataforma
		// 		hero.velY = 0; // Define a velocidade vertical do personagem para zero
		// 	  }
		// }
	}



}