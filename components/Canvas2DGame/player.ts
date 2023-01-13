import {
    Diving,
    FallingLeft, FallingRight,
    JumpingLeft,
    JumpingRight, RollingLeft, RollingRight,
    RunningLeft,
    RunningRight,
    DizzyLeft,
    DizzyRight,
    StandingLeft,
    StandingRight
} from "./state";
import {BonusTimeMessage, FloatingCandyPoint} from "./floatingMessages";
import {CollisionAnimation} from "./CollisionAnimation";

export default class Player {
    x: number;
    y: number;
    private readonly image: HTMLImageElement;
    private frameX: number;
    frameY: number;
    private readonly speed: number;
    private readonly width: number;
    readonly height: number;
    private readonly weight: number;
    private vy: number;
    maxFrame: number;
    private readonly fps: number;
    private frameTimer: number;
    private readonly frameInterval: number;
    private readonly states: any[];
    private currentState: any;
    public gameOver: boolean;
    private maxSpeed: number;
    private readonly game: any;
    private knockoutTime: number;
    private stepSound: HTMLAudioElement;
    private jumpSound: HTMLAudioElement;
    private attackSound: HTMLAudioElement;
    private readonly groundLevel: number;
    private getHitSound: HTMLAudioElement;
    private invulTime: number;
    constructor(game) {
        this.game = game
        this.states = [new StandingLeft(this.game), new StandingRight(this.game), new DizzyLeft(this.game),
            new DizzyRight(this.game), new RunningLeft(this.game), new RunningRight(this.game),
        new JumpingLeft(this.game), new JumpingRight(this.game), new FallingLeft(this.game), new FallingRight(this.game),
        new RollingLeft(this.game), new RollingRight(this.game), new Diving(this.game)]
        this.currentState = this.states[1]
        this.image = new Image()
        this.image.src = 'Canvas2DGame/white_dog.png'
        this.width = 200
        this.height = 181.83
        this.groundLevel = this.game.height - this.height - this.game.groundMargin
        this.x = this.game.width/2 - this.width/2
        this.y = this.groundLevel
        this.stepSound = new Audio('Canvas2DGame/sound/player-step.mp3')
        this.stepSound.loop = true
        this.jumpSound = new Audio('Canvas2DGame/sound/player-jump.mp3')
        this.attackSound = new Audio('Canvas2DGame/sound/fire.mp3')
        this.getHitSound = new Audio('Canvas2DGame/sound/player-hitted.mp3')

        this.frameX = 0
        this.maxFrame = 6
        this.frameY = 0
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
        this.maxSpeed = 10
        this.speed = 0
        this.vy = 0
        this.weight = 1
        this.knockoutTime = 0
        this.invulTime = 0
    }

    draw(context) {
        if(this.game.debugMode) context.strokeRect(this.x, this.y, this.width, this.height)
        if(this.invulTime > 0 && this.knockoutTime < 0) {
            context.save()
            this.frameX > 2 ? context.globalAlpha = 0.15 : context.globalAlpha = 1
            context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
                this.width,this.height,this.x,this.y, this.width, this.height )
            context.restore()
        } else context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
            this.width,this.height,this.x,this.y, this.width, this.height )
    }
    update(input, deltatime) {
        this.currentState.handleInput(input)
        this.checkCollision(deltatime)
        this.checkUltimate()

        //sprite animation
        if(this.frameTimer > this.frameInterval) {
            if(this.frameX >= this.maxFrame) this.frameX = 0
            else this.frameX++
            this.frameTimer = 0
        } else {
            this.frameTimer += deltatime
        }

        //horizontal movement
        this.x += this.speed
        if(this.x < 0) this.x = 0
        else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        //vertical movement
        this.y += this.vy
        if(!this.onGround()){
            this.vy += this.weight
        } else {
            this.vy = 0
        }
        if(this.y > this.game.height - this.height - this.game.groundMargin) {
            this.y = this.game.height - this.height - this.game.groundMargin
        }
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin
    }
    setState(state, speed) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }
    checkCollision(deltatime) {
        if(this.knockoutTime <= 0) {
            this.game.enemies.forEach(enemy => {
                if(
                    enemy.x < this.x + this.width &&
                    enemy.x + enemy.width > this.x &&
                    enemy.y < this.y + this.height &&
                    enemy.y + enemy.height > this.y
                ) {

                    if(this.currentState === this.states[10]
                        || this.currentState === this.states[11]
                        || this.currentState === this.states[12]) {
                        enemy.markedForDeletion = true
                        this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5,
                            enemy.y + enemy.height * 0.5))
                        if(enemy.image.src.includes('candy')) {
                            if(this.game.candyCurrent === this.game.candy - 1) this.game.gameOver = true
                            this.game.floatingMessages.push(new FloatingCandyPoint(this.game, enemy.x, enemy.y,  0))
                        } else {
                            this.game.killedEnemies++
                            this.game.UI.ultimateBarShaking = true
                            setTimeout(() => {
                                this.game.UI.ultimateBarShaking = false
                            }, 50)
                            this.game.floatingMessages.push(new BonusTimeMessage(this.game, '+1', enemy.x, enemy.y, 165, 42))
                        }
                    } else if(this.invulTime === 0 && !this.game.gameOver) {
                            if(this.currentState.state.includes('RIGHT')) {
                                this.setState(3, 0)
                                this.game.lives--
                            } else if(this.currentState.state.includes('LEFT')) {
                                this.setState(2, 0)
                                this.game.lives--
                            }
                        this.knockoutTime = 2000
                        if(enemy.image.src.includes('candy')) {
                            enemy.image.src = 'Canvas2DGame/enemies/winter/candy_run.png'
                            enemy.width = 107
                            enemy.speedX = 5
                            enemy.maxFrame = 4
                            enemy.stepSound.playbackRate = 2
                        } else if(enemy.image.src.includes('rocketman')) {
                            enemy.speedX = 10
                            enemy.maxFrame = 0
                            enemy.touched = true
                        }
                        if(this.game.lives <= 0) this.game.gameOver = true
                    }
                }
            })
        }
        if(this.invulTime > 0) {
            this.knockoutTime -= deltatime
            this.invulTime -= deltatime
        } else {
            this.knockoutTime = 0
            this.invulTime = 0
        }
    }
    checkUltimate() {
        if(this.game.ultimateTimer > 0) {
           if(this.game.speed > 0) {
               this.game.speed = 15
               this.game.enemyInterval = 1500
           }
           if(this.game.ultimateTimer > this.game.ultimateDuration) {
               this.game.ultimateTimer = 0
               this.game.killedEnemies = 0
               this.game.enemyInterval = 2000
           }
        }
    }
}