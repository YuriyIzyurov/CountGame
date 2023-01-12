import React, {useEffect, useRef} from 'react';

const useEnemyVariety = (draw) => {
    const canvasRef = useRef(null)
    const CANVAS_WIDTH = 500
    const CANVAS_HEIGHT = 800

    let ctx
    let animationFrameId
    let lastTime = 0


    class Game {
        private enemies: any[];
        private ctx: any;
        private width: any;
        private height: any;
        private enemyInterval: number;
        private enemyTimer: number;
        private enemyTypes: string[];
        constructor(ctx, width, height) {
            this.ctx = ctx
            this.width = width
            this.height = height
            this.enemies = []
            this.enemyInterval = 300
            this.enemyTimer = 0
            this.enemyTypes = ['worm', 'ghost', 'spider']
            this.#addNewEnemy()
        }
        update(deltatime) {
            if(this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy()
                this.enemyTimer = 0
                this.enemies = this.enemies.filter(object => !object.markedForDeletion)
            } else {
                this.enemyTimer += deltatime
            }
            this.enemies.forEach(object => object.update(deltatime))
        }
        draw() {
            this.enemies.forEach(object => object.draw(this.ctx))
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
            if(randomEnemy === 'worm') this.enemies.push(new Worm(this))
            if(randomEnemy === 'ghost') this.enemies.push(new Ghost(this))
            if(randomEnemy === 'spider') this.enemies.push(new Spider(this))
            this.enemies.sort((a,b) => a.y - b.y)
        }
    }
    class Enemy {
        protected game: any;
        protected markedForDeletion: boolean;
        protected x: any;
        protected y: number;
        protected width: number;
        protected height: number;
        protected enemyWidth: number;
        protected enemyHeight: number;
        protected image: HTMLImageElement;
        private gameFrame: any;
        protected vx: any;
        private frameX: number;
        private maxFrame: number;
        private frameInterval: number;
        private frameTimer: number;
        constructor(game) {
            this.game = game
            this.markedForDeletion = false
            this.frameX = 0
            this.maxFrame = 5
            this.frameInterval = 100
            this.frameTimer = 0
        }
        update(deltatime) {
            this.x -= this.vx * deltatime
            if(this.x < 0 - this.width) this.markedForDeletion = true
            if(this.frameTimer > this.frameInterval) {
                if(this.frameX < this.maxFrame) this.frameX++
                else this.frameX = 0
                this.frameTimer = 0
            } else {
                this.frameTimer += deltatime
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.enemyWidth * this.frameX, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game)
            this.x = this.game.width
            this.y = Math.random() * this.game.height
            this.enemyWidth = 229
            this.enemyHeight = 171
            this.width = this.enemyWidth/2
            this.height = this.enemyHeight/2
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy_worm.png'
            this.vx = Math.random() * 0.1 + 0.1
        }
    }
    class Ghost extends Enemy {
        private angle: number;
        private curve: number;
        constructor(game) {
            super(game)
            this.x = this.game.width
            this.y = Math.random() * this.game.height
            this.enemyWidth = 261
            this.enemyHeight = 209
            this.width = this.enemyWidth/2
            this.height = this.enemyHeight/2
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy_ghost.png'
            this.vx = Math.random() * 0.2 + 0.1
            this.angle = 0
            this.curve = Math.random() * 3
        }
        update(deltatime) {
            super.update(deltatime)
            this.y += Math.sin(this.angle) * this.curve
            this.angle += 0.2
        }
        draw(ctx) {
            ctx.save()
            ctx.globalAlpha = 0.7
            super.draw(ctx)
            ctx.restore()
        }
    }
    class Spider extends Enemy {
        private vy: number
        private maxLength: number;
        constructor(game) {
            super(game)
            this.enemyWidth = 310
            this.enemyHeight = 171
            this.width = this.enemyWidth/2
            this.height = this.enemyHeight/2
            this.x = Math.random() * this.game.width
            this.y = 0 - this.height
            this.image = new Image()
            this.image.src = 'secret/enemies/enemy_spider.png'
            this.vx = 0
            this.vy = Math.random() * 0.1 + 0.1
            this.maxLength = Math.random() * game.height
        }
        update(deltatime) {
            super.update(deltatime)
            this.y += this.vy * deltatime
            if(this.y > this.maxLength) this.vy *= -1
            if(this.y < 0 - this.height) this.markedForDeletion = true
        }
        draw(ctx) {
            ctx.beginPath()
            ctx.moveTo(this.x + this.width/2, 0)
            ctx.lineTo(this.x + this.width/2, this.y + 10)
            ctx.stroke()
            super.draw(ctx)
        }
    }


    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        ctx = canvas.getContext('2d')

        const game = new Game(ctx, canvas.width, canvas.height)

        //Отрисовка
        const render = (timestamp) => {
            draw(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
            const deltaTime = timestamp - lastTime
            lastTime = timestamp
            game.update(deltaTime)
            game.draw()

            animationFrameId = window.requestAnimationFrame(render)
        }
        render(0)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
};

export default useEnemyVariety;