import React, {useEffect, useRef} from 'react';

const useRavenFly = (draw) => {
    const canvasRef = useRef(null)
    const collisionRef = useRef(null)

    let collisionCtx

    let ctx
    let animationFrameId
    let canvasPosition
    let CANVAS_WIDTH
    let CANVAS_HEIGHT

    let timeToNextRaven = 0
    let ravenInterval = 500
    let lastTime = 0
    let ravens = []
    let explosions = []
    let particles = []

    let score = 0


    class Raven {
        private image: HTMLImageElement;
        private x: any;
        private y: any;
        private enemyWidth: number;
        private enemyHeight: number;
        private width: number;
        private height: number;
        private directionX: number;
        private directionY: number;
        private frame: number;
        private markedForDeletion: boolean;
        private sizeModifier: number;
        private maxFrame: number;
        private timeSinceFlap: number;
        private flapInterval: number;
        private randomColors: number[];
        private color: string;
        private hasTrail: boolean;

        constructor() {
            this.image = new Image()
            this.image.src = 'secret/enemies/raven.png'
            this.enemyWidth = 271
            this.enemyHeight = 194
            this.sizeModifier = Math.random() * 0.6 + 0.4
            this.width = this.enemyWidth * this.sizeModifier
            this.height = this.enemyHeight * this.sizeModifier
            this.x = CANVAS_WIDTH
            this.y = Math.random() * (CANVAS_HEIGHT - this.height)
            this.directionX = Math.random() * 5 + 3
            this.directionY = Math.random() * 5 - 2.5
            this.frame = 0
            this.maxFrame = 4
            this.markedForDeletion = false
            this.timeSinceFlap = 0
            this.flapInterval = Math.random() * 50 + 50
            this.randomColors = [Math.floor(Math.random() * 255), 
                Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
            this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'
            this.hasTrail = Math.random() > 0.5
        }
        update(deltatime) {
            if(this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
                this.directionY = this.directionY * -1
            }
          this.x -= this.directionX
          this.y -= this.directionY

          if(this.x < 0 - this.width) this.markedForDeletion = true
          this.timeSinceFlap += deltatime
          if(this.timeSinceFlap > this.flapInterval) {
              if(this.frame > this.maxFrame) this.frame = 0
              else this.frame++
              this.timeSinceFlap = 0
              if(this.hasTrail) {
                  for(let i = 0; i < 5; i++) {
                      particles.push(new Particle(this.x, this.y, this.width, this.color))
                  }
              }
          }
        }
        draw() {

            collisionCtx.fillStyle = this.color
            collisionCtx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.enemyWidth * this.frame, 0, this.enemyWidth,this.enemyHeight, this.x, this.y, this.width, this.height )
        }
    }

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
        private size: any;
        private timeSinceLastFrame: number;
        private frameInterval: number;
        private markedForDeletion: boolean;
        constructor(x, y, size) {
            this.image = new Image()
            this.image.src = 'secret/effects/boom.png'
            this.sound = new Audio('sounds/clickOption.mp3')
            this.enemyWidth = 200
            this.enemyHeight = 179
            this.size = size
            this.x = x
            this.y = y
            this.frame = 0
            this.timeSinceLastFrame = 0
            this.frameInterval = 100
            this.markedForDeletion = false
        }
        update(deltatime) {
            if(this.frame === 0) this.sound.play()
            this.timeSinceLastFrame += deltatime
            if(this.timeSinceLastFrame > this.frameInterval) {
                this.frame++
                this.timeSinceLastFrame = 0
                if(this.frame > 5) this.markedForDeletion = true
            }
        }
        draw() {
           // ctx.save()
           // ctx.translate(this.x, this.y)
            //ctx.rotate(this.angle)
            ctx.drawImage(this.image, this.enemyWidth * this.frame, 0, this.enemyWidth,this.enemyHeight, this.x, this.y - this.size/4, this.size, this.size )
            //ctx.restore()
        }
    }

    class Particle {
        private x: any;
        private y: any;
        private size: any;
        private radius: number;
        private maxRadius: number;
        private markedForDeletion: boolean;
        private speedX: number;
        private color: any;
        constructor(x, y, size, color) {
            this.size = size
            this.x = x + this.size/2 + Math.random() * 50 - 25
            this.y = y + this.size/2 + Math.random() * 50 - 25
            this.radius = Math.random() * this.size/10
            this.maxRadius = Math.random() * 20 + 35
            this.markedForDeletion = false
            this.speedX = Math.random() + 0.5
            this.color = color
        }
        update() {
            this.x += this.speedX
            this.radius += 0.5
            if(this.radius > this.maxRadius - 5) this.markedForDeletion = true
        }
        draw() {
            ctx.save()
            ctx.globalAlpha = 1 - this.radius/this.maxRadius
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const collisionCanvas = collisionRef.current

        collisionCtx = collisionCanvas.getContext('2d')
        collisionCanvas.width = window.innerWidth
        collisionCanvas.height = window.innerHeight

        CANVAS_WIDTH  = canvas.width = window.innerWidth
        CANVAS_HEIGHT  = canvas.height = window.innerHeight
        canvasPosition = canvas.getBoundingClientRect()
        ctx = canvas.getContext('2d')
        ctx.font = '50px Impact'

        window.addEventListener('click', (e) => {
           const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
           const pc = detectPixelColor.data
            console.log(particles)
           ravens.forEach(raven => {
               if(raven.randomColors[0] === pc[0] && raven.randomColors[1] === pc[1]
                   && raven.randomColors[2] === pc[2]) {
                   //collision detected
                   raven.markedForDeletion = true
                   score++
                   explosions.push(new Explosion(raven.x, raven.y, raven.width))
               }
           })
        })


        const createAnimation = (e) => {
            let positionX = e.x - canvasPosition.left
            let positionY = e.y - canvasPosition.top
           // explosions.push(new Explosion(positionX, positionY))
        }
        const drawScore = () => {
            ctx.fillStyle = 'grey'
            ctx.fillText('Score: ' + score, 50, 75 )
            ctx.fillStyle = 'black'
            ctx.fillText('Score: ' + score, 53, 78)
        }


        //Отрисовка
        const render = (timestamp = 0) => {
            draw(ctx, collisionCtx, CANVAS_WIDTH, CANVAS_HEIGHT)
            let deltatime = timestamp - lastTime
            lastTime = timestamp
            timeToNextRaven += deltatime
            if(timeToNextRaven > ravenInterval) {
                ravens.push(new Raven())
                timeToNextRaven = 0
                ravens.sort((a, b) => a.width - b.width)
            }
            drawScore();

            [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime));
            [...particles, ...ravens, ...explosions].forEach(object => object.draw());
            ravens = ravens.filter(raven => !raven.markedForDeletion)
            explosions = explosions.filter(explosion => !explosion.markedForDeletion)
            particles = particles.filter(particle => !particle.markedForDeletion)

            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return [canvasRef, collisionRef]
};

export default useRavenFly;
