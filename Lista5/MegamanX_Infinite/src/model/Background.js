import { loadImage } from "../loadAssets";

export default class Background {
    constructor(imgURL, total_frame, FRAMES = 60) {
        this.imgURL = imgURL
        loadImage(this.imgURL)
            .then(img => {
                this.img = img
            })

        this.total_frame = total_frame
        this.FRAMES = FRAMES


        this.spriteSpeed = 1

        this.frameX = 0
        this.animeSprite(30)



    }

    draaw(CTX) {

        CTX.drawImage(
            this.img,
            this.frameX * 481, 0,
            481, 352,
            0, 0,
            700, 400
        )

        // this.updateHit()
        // this.hit.draw(CTX)
    }
    animeSprite(FRAMES) { //Controla a animacao do sprite
        setInterval(() => {
            this.frameX = this.frameX < 3
                ? this.frameX + 1
                : 0;
        }, 1000 / (FRAMES * this.spriteSpeed / 9))
    }

}