import {Fire, IceSplash} from "./particles";

class Enemy {
    protected width: number;
    protected height: number;
    protected image: HTMLImageElement;
    protected x: any;
    protected y: number;
    protected frameX: number;
    protected frameY: number;
    protected speedX: number;
    protected speedY: number;
    protected maxFrame: number;
    private fps: number;
    private frameTimer: number;
    private frameInterval: number;
    protected markedForDeletion: boolean;
    protected game: any;
    protected actionDelay: number;
    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
        this.markedForDeletion = false
        this.actionDelay = 0
    }
    draw(context) {
       /* context.beginPath()
        context.arc(this.x + this.width/2 - 20, this.y + this.height/2, this.width/3,
            0, Math.PI * 2)
        context.stroke()*/
        if(this.game.debugMode) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height)
    }
    update(deltaTme) {
        //movement
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        if(this.frameTimer > this.frameInterval) {
            if(this.frameX >= this.maxFrame) this.frameX = 0
            else this.frameX++
            this.frameTimer = 0
        } else this.frameTimer += deltaTme
        //delay between actions
        if(this.actionDelay > 0) {
            this.actionDelay -= deltaTme
        } else if(this.actionDelay < 0) this.actionDelay = 0
        //deletion enemy
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true
        }
    }
}

export class FlyingEnemy extends Enemy {
    private angle: number;
    private va: number;
    private spriteWidth: number;
    private spriteHeight: number;
    private touched: boolean;
    private rocketForceSound: HTMLAudioElement;
    private rocketEngineSound: HTMLAudioElement;
    constructor(game) {
        super()
        this.game = game
        this.spriteWidth = 109.7
        this.spriteHeight = 205
        this.width = this.spriteWidth
        this.height = this.spriteHeight
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = Math.random() * this.game.height * 0.3 + 100
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 12
        this.image = new Image()
        this.image.src = 'secret/enemies/winter/rocketman1.1.png'
        this.rocketForceSound = new Audio('secret/sound/rocket_launch.mp3')
        this.angle = 0
        this.va = 0.1
        this.touched = false
    }
    update(deltatime) {
        super.update(deltatime)
        this.angle += this.va
        this.y += 2.3 * Math.sin(this.angle)
        if(this.touched) {
            this.rocketForceSound.play()
            this.game.particles.unshift(new Fire(this.game, this.x + this.width * 0.8,
                this.y + this.height * 0.4, 50))
        }
        if(this.markedForDeletion) {
            this.rocketForceSound.pause()
        }
    }
    draw(context){
        if(this.game.debugMode) context.strokeRect(this.x, this.y, this.width, this.height)
        if(!this.touched) {
            context.drawImage(this.image, this.frameX * this.spriteWidth , 0,
                this.spriteWidth , this.spriteHeight, this.x, this.y, this.width, this.height)
        } else this.rotateAndPaintImage(context, this.image, -25 * Math.PI/180,this.x, this.y)
    }
    rotateAndPaintImage ( context, image, angleInRad , positionX, positionY ) {
        context.translate( positionX, positionY );
        context.rotate( angleInRad );
        context.drawImage(this.image, 0, 0, this.spriteWidth , this.spriteHeight, -this.width/2, 0, this.width, this.height)
        context.rotate( -angleInRad );
        context.translate( -positionX, -positionY );
    }
}
export class CandyPointEnemy extends Enemy {
    private stepSound: HTMLAudioElement;
    constructor(game) {
        super()
        this.game = game
        this.width = 84.65
        this.height = 205
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 8
        this.image = new Image()
        this.image.src = 'secret/enemies/winter/candy_walk.png'
        this.stepSound = new Audio('secret/sound/stepsnow.mp3')
        this.stepSound.loop = true
        this.stepSound.play()
    }
    update(deltaTme) {
        super.update(deltaTme)
        if(this.markedForDeletion) {
            this.stepSound.pause()
        }
    }
}
export class GolemEnemy extends Enemy {
    private vy: number;
    private weight: number;
    private spriteMargin: number;
    private isSliding: boolean;
    private stepSound: HTMLAudioElement;
    private attackSound: HTMLAudioElement;
    private slideSound: HTMLAudioElement;
    constructor(game) {
        super()
        this.game = game
        this.width = 250
        this.height = 250
        this.spriteMargin = 30
        this.x = this.game.width
        this.y = this.game.height - this.height - this.spriteMargin
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 11
        this.image = new Image()
        this.image.src = 'secret/enemies/winter/golem-walk.png'
        this.stepSound = new Audio('secret/sound/stepsnow2.mp3')
        this.attackSound = new Audio('secret/sound/golem-attack.mp3')
        this.slideSound = new Audio('secret/sound/golem-slide-faster.mp3')
        this.stepSound.loop = true
        this.stepSound.play()
        this.vy = 0
        this.weight = 2
        this.isSliding = false
    }
    update(deltaTme) {
        super.update(deltaTme)
        this.y += this.vy
        if(!this.onGround()){
            this.vy += this.weight
        } else {
            this.vy = 0
        }
        if(this.onGround() && Math.abs(this.game.player.x - this.x) < 300) {
            if(Math.random() > 0.5) this.jump() //когда голем приближается к игроку - он прыгает
            else this.slide() //когда голем приближается к игроку - он делает подкат
        }
        if(this.y > this.game.height - this.height - this.spriteMargin) {
            this.y = this.game.height - this.height - this.spriteMargin
        }
        if(this.isSliding) {
            this.game.particles.unshift(new IceSplash(this.game, this.x + this.width * 0.2,
                this.y + this.height * 0.7))
        }
        if(this.markedForDeletion) {
            this.stepSound.pause()
        }
        if(this.image.src.includes('run')) {
            if(this.frameX === 0) this.attackSound.play()
        }
    }
    slide() {
        if(this.actionDelay === 0) {
            this.image.src = 'secret/enemies/winter/golem-sliding.png'
            this.slideSound.play()
            this.frameX = 0
            this.maxFrame = 5
            this.speedX += 8
            this.actionDelay = 4000
            this.isSliding = true
        }
        if(this.actionDelay < 3400) {
            this.image.src = 'secret/enemies/winter/golem-run.png'
            this.maxFrame = 11
            this.speedX = 3
            this.isSliding = false
        }
    }
    jump() {
        if(this.actionDelay === 0) {
            this.vy -= 30
            this.image.src = 'secret/enemies/winter/golem-slashing.png'
            this.attackSound.play()
            this.speedX += 3
            this.actionDelay = 4000
        }
        if(this.actionDelay < 3400) this.image.src = 'secret/enemies/winter/golem-run.png'
    }
    onGround(){
        return this.y >= this.game.height - this.height - 30
    }
}
export class YetiEnemy extends Enemy {
    private attackSound: HTMLAudioElement;
    private roarSound1: HTMLAudioElement;
    private roarSound2: HTMLAudioElement;
    private roarCooldown: number;
    private roarInterval: number;
    private stepSound: HTMLAudioElement;
    constructor(game) {
        super()
        this.game = game
        this.width = 160 //184
        this.height = 200
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin + 20
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 8
        this.image = new Image()
        this.image.src = 'secret/enemies/winter/yeti-walk2.png'
        this.attackSound = new Audio('secret/sound/yeti-attack.wav')
        this.roarSound1 = new Audio('secret/sound/yeti-roar1.wav')
        this.roarSound2 = new Audio('secret/sound/yeti-roar2.wav')
        this.stepSound = new Audio('secret/sound/stepsnow.mp3')
        this.stepSound.loop = true
        this.stepSound.play()
        this.roarCooldown = Math.random() * 1000 + 2000
        this.roarInterval = 0
    }
    update(deltaTme) {
        super.update(deltaTme)
        if(Math.abs(this.game.player.x - this.x) < 400) this.attack()
        if(Math.abs(this.game.player.x - this.x) < 700) {
            if(this.roarInterval === 0) Math.random() < 0.5 ? this.roarSound1.play() : this.roarSound2.play()
            this.roarInterval += deltaTme
            if(this.roarInterval > this.roarCooldown) this.roarInterval = 0
        }
        if(this.markedForDeletion) {
            this.attackSound.loop = false
            this.stepSound.pause()
        }
    }
    attack() {
        if(this.actionDelay === 0) {
            this.image.src = 'secret/enemies/winter/yeti-attack2.png'
            this.stepSound.playbackRate = 2
            this.attackSound.loop = true
            this.attackSound.play()
            this.width = 184
            this.speedX += 7
            this.frameX = 0
            this.actionDelay = 4000
        }
        if(this.actionDelay < 3000) {
            this.width = 160
            this.attackSound.loop = false
            this.image.src = 'secret/enemies/winter/yeti-walk2.png'
        }
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
        this.image = new Image()
        this.image.src = 'secret/enemies/enemy_spider_big.png'
    }
    update(deltatime) {
        super.update(deltatime)
        if(this.y > this.game.height - this.height - this.game.groundMargin) this. speedY *= -1
        if(this.y < -this.height) this.markedForDeletion = true
    }
    draw(context) {
        super.draw(context)
        context.beginPath()
        context.moveTo(this.x + this.width/2,0)
        context.lineTo(this.x + this.width/2, this.y + 50)
        context.stroke()
    }
}