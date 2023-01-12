import React, {useEffect, useRef} from 'react';

const useMovementCanvas = (draw) => {
    const canvasRef = useRef(null)
    const CANVAS_WIDTH = 500
    const CANVAS_HEIGHT = 1000
    let ctx
    let animationFrameId
    const numberOfEnemies = 50
    let gameFrame = 0
    const enemiesArray = []


    class Enemy {
        private x: number;
        private y: number;
        private readonly width: number;
        private readonly height: number;
        private speed: number;
        private image: HTMLImageElement;
        private staggerFrames: number;
        private frame: number;
        private enemyWidth: number;
        private frameX: number;
        private enemyHeight: number;
        private flapSpeed: number;
        private angle: number;
        private angleSpeed: number;
        private curve: number;
        private newX: number;
        private newY: number;
        private interval: number;
        constructor() {
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy4.png'
            this.speed = Math.random() * 4 + 1
            this.enemyWidth = 213
            this.enemyHeight = 213
            this.width = this.enemyWidth/3
            this.height = this.enemyHeight/3
            this.x = Math.random() * (CANVAS_WIDTH - this.width)
            this.y = Math.random() * (CANVAS_HEIGHT - this.width)
            this.newX = Math.random() * CANVAS_WIDTH
            this.newY = Math.random() * CANVAS_HEIGHT
            this.frame = 0
            this.flapSpeed = Math.floor(Math.random() * 3 +1)
            this.interval = Math.floor(Math.random() * 200 +50)
        }
        update() {
            if(gameFrame % this.interval === 0) {
                this.newX = Math.random() * (CANVAS_WIDTH - this.width)
                this.newY = Math.random() * (CANVAS_HEIGHT - this.width)
            }
            let dx = this.x - this.newX
            let dy = this.y - this.newY
            this.x -= dx/70
            this.y -= dy/70
            if(this.x + this.width < 0) this.x = CANVAS_WIDTH

            //animate sprites
            if(gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++
            }
            this.frameX = this.enemyWidth * this.frame
        }
        draw() {
            ctx.drawImage(this.image, this.frameX, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
        }
    }


    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        ctx = canvas.getContext('2d')


        for(let i = 0; i < numberOfEnemies; i++) {
            enemiesArray.push(new Enemy())
        }


        //Отрисовка
        const render = () => {
            draw(ctx, enemiesArray, CANVAS_WIDTH, CANVAS_HEIGHT)
            gameFrame++
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
};

export default useMovementCanvas;

//----->Enemy Bat movement 1
/*
class Enemy {
    private x: number;
    private y: number;
    private readonly width: number;
    private readonly height: number;
    private speed: number;
    private image: HTMLImageElement;
    private staggerFrames: number;
    private frame: number;
    private enemyWidth: number;
    private frameX: number;
    private enemyHeight: number;
    private flapSpeed: number;
    constructor() {
        this.flapSpeed = Math.floor(Math.random() * 3 +1)
        this.image = new Image()
        this.image.src = 'secret/enemies/enemy1.png'
        // this.speed = Math.random() * 4 - 2
        this.enemyWidth = 293
        this.enemyHeight = 155
        this.width = this.enemyWidth/3
        this.height = this.enemyHeight/3
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT - this.width)
        this.frameX = 0
        this.frame = 0
    }
    update() {
        this.x += Math.random() * 5 - 2.5
        this.y += Math.random() * 5 - 2.5
        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
        this.frameX = this.enemyWidth * this.frame
    }
    draw() {
        ctx.drawImage(this.image, this.frameX, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
    }
}
--------------> Enemy bat movement 2
class Enemy {
        private x: number;
        private y: number;
        private readonly width: number;
        private readonly height: number;
        private speed: number;
        private image: HTMLImageElement;
        private staggerFrames: number;
        private frame: number;
        private enemyWidth: number;
        private frameX: number;
        private enemyHeight: number;
        private flapSpeed: number;
        private angle: number;
        private angleSpeed: number;
        private curve: number;
        constructor() {
            this.flapSpeed = Math.floor(Math.random() * 3 +1)
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy2.png'
            this.speed = Math.random() * 4 + 1
            this.enemyWidth = 266
            this.enemyHeight = 188
            this.width = this.enemyWidth/3
            this.height = this.enemyHeight/3
            this.x = Math.random() * (CANVAS_WIDTH - this.width)
            this.y = Math.random() * (CANVAS_HEIGHT - this.width)
            this.frameX = 0
            this.frame = 0
            this.angle = Math.random() * 2
            this.angleSpeed = Math.random() * 0.2
            this.curve = Math.random() * 7
        }
        update() {
            this.x -= this.speed
            this.y += this.curve * Math.sin(this.angle)
            if(this.x + this.width < 0) this.x = CANVAS_WIDTH
            this.angle += this.angleSpeed

            //animate sprites
            if(gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++
            }
            this.frameX = this.enemyWidth * this.frame
        }
        draw() {
            ctx.drawImage(this.image, this.frameX, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
        }
    }

--------enemy bat movement 3
class Enemy {
        private x: number;
        private y: number;
        private readonly width: number;
        private readonly height: number;
        private speed: number;
        private image: HTMLImageElement;
        private staggerFrames: number;
        private frame: number;
        private enemyWidth: number;
        private frameX: number;
        private enemyHeight: number;
        private flapSpeed: number;
        private angle: number;
        private angleSpeed: number;
        private curve: number;
        constructor() {
            this.flapSpeed = Math.floor(Math.random() * 3 +1)
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy3.png'
            this.speed = Math.random() * 4 + 1
            this.enemyWidth = 218
            this.enemyHeight = 177
            this.width = this.enemyWidth/3
            this.height = this.enemyHeight/3
            this.x = Math.random() * (CANVAS_WIDTH - this.width)
            this.y = Math.random() * (CANVAS_HEIGHT - this.width)
            this.frameX = 0
            this.frame = 0
            this.angle = 0
            this.angleSpeed = Math.random() * 1.5 + 0.5
            //this.curve = Math.random() * 7
        }
        update() {
            this.x = CANVAS_WIDTH/2 * Math.cos(this.angle * Math.PI/90) + (CANVAS_WIDTH/2 - this.width/2)
            this.y = CANVAS_HEIGHT/2 * Math.sin(this.angle * Math.PI/270) + (CANVAS_HEIGHT/2 - this.height/2)

            if(this.x + this.width < 0) this.x = CANVAS_WIDTH
            this.angle += this.angleSpeed

            //animate sprites
            if(gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++
            }
            this.frameX = this.enemyWidth * this.frame
        }
        draw() {
            ctx.drawImage(this.image, this.frameX, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
        }
    }
*/
