import Circle from "./model/Circle";

export default class Projetil extends Circle {
    constructor(x, y, size, speed, color, imgUrl) {
        super(x, y, size, speed, color)
        this.imgUrl = imgUrl
        loadImage(this.imgUrl)
            .then(img => {
                this.img = img
            })
    }

    move() {
        this.x += this.speed
    }


}