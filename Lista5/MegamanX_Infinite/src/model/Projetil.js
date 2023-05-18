import Circle from "./Circle";
import { loadImage } from "../loadAssets";

export default class Projetil extends Circle {
    constructor(x, y, size, speed, color, img) {
        super(x, y, size, speed, color)

        this.img = img


    }

    move() {
        this.x += this.speed
    }
    drawb(ctx) {
        // console.log(this)
        ctx.drawImage(
            this.img,
            0, 0,
            8, 6,
            this.x, this.y,
            16, 12
        )
    }
}