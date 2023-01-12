import React, {useEffect, useRef} from 'react';

const useExplosionAnimations = (draw) => {
    const canvasRef = useRef(null)
    const CANVAS_WIDTH = 500
    const CANVAS_HEIGHT = 700
    let ctx
    let animationFrameId
    let canvasPosition

    let gameFrame = 0
    const explosions = []


    class Explosion {
        private image: HTMLImageElement;
        private x: any;
        private y: any;
        private enemyWidth: number;
        private enemyHeight: number;
        private width: number;
        private height: number;
        private frame: number;
        private timer: number;
        private angle: number;
        private sound: HTMLAudioElement;
        constructor(x, y) {
            this.image = new Image()
            this.image.src = 'secret/effects/boom.png'
            this.sound = new Audio('sounds/clickOption.mp3')
            this.enemyWidth = 200
            this.enemyHeight = 179
            this.width = this.enemyWidth * 0.7
            this.height = this.enemyHeight * 0.7
            this.x = x
            this.y = y
            this.frame = 0
            this.timer = 0
            this.angle = Math.random() * 6.2
        }
        update() {
            if(this.frame === 0) this.sound.play()
            this.timer++
            if(this.timer % 10 === 0) this.frame++
        }
        draw() {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)
            ctx.drawImage(this.image, this.enemyWidth * this.frame, 0, this.enemyWidth,this.enemyHeight, 0 - this.width/2, 0 - this.height/2, this.width, this.height )
            ctx.restore()
        }
    }



    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        canvasPosition = canvas.getBoundingClientRect()
        ctx = canvas.getContext('2d')

        window.addEventListener('click', (e) => {
            createAnimation(e)
        })
       /* window.addEventListener('mousemove', (e) => {
            createAnimation(e)
        })*/

        const createAnimation = (e) => {
            let positionX = e.x - canvasPosition.left
            let positionY = e.y - canvasPosition.top
            explosions.push(new Explosion(positionX, positionY))
        }

        //Отрисовка
        const render = () => {
            draw(ctx, explosions, CANVAS_WIDTH, CANVAS_HEIGHT)
            for(let i = 0; i < explosions.length; i++) {
                explosions[i].update()
                explosions[i].draw()
                if(explosions[i].frame > 5) {
                    explosions.splice(i, 1)
                }
            }
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
};

export default useExplosionAnimations;
