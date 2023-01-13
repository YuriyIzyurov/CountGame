import {Dust, Fire, Splash} from "./particles";

export enum states {
    STANDING_LEFT,
    STANDING_RIGHT,
    DIZZY_LEFT,
    DIZZY_RIGHT,
    RUNNING_LEFT,
    RUNNING_RIGHT,
    JUMPING_LEFT,
    JUMPING_RIGHT,
    FALLING_LEFT,
    FALLING_RIGHT,
    ROLLING_LEFT,
    ROLLING_RIGHT,
    DIVING
}
class State {
    private state: any;
    protected game: any;
    constructor(state, game) {
        this.game = game
        this.state = state
    }
}
export class StandingLeft extends State {
    private player: any;
    constructor(game) {
        super('STANDING LEFT', game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 1
        this.game.player.maxFrame = 6
        this.game.player.speed = 0
        this.game.player.stepSound.stop()
    }
    handleInput(input) {
        if(input.includes('ArrowRight')) this.game.player.setState(states.RUNNING_RIGHT, 1)
        else if(input.includes('ArrowLeft')) this.game.player.setState(states.RUNNING_LEFT, 0)
        else if(input.includes('ArrowUp')) this.game.player.setState(states.JUMPING_LEFT, 0)
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_LEFT, 0)
    }
}
export class StandingRight extends State {
    private player: any;
    constructor(game) {
        super('STANDING RIGHT', game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 0
        this.game.player.maxFrame = 6
        this.game.player.speed = 0
        this.game.player.stepSound.stop()
    }
    handleInput(input) {
        if(input.includes('ArrowLeft')) this.game.player.setState(states.RUNNING_LEFT, 0)
        else if(input.includes('ArrowRight')) this.game.player.setState(states.RUNNING_RIGHT, 1)
        else if(input.includes('ArrowUp')) this.game.player.setState(states.JUMPING_RIGHT, 1)
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_RIGHT, 2)
    }
}
export class DizzyLeft extends State {
    private player: any;
    constructor(game) {
        super('DIZZY LEFT', game)

    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 9
        this.game.player.maxFrame = 8
        this.game.player.speed = 0
        this.game.player.invulTime = 4000
        this.game.player.stepSound.stop()
        this.game.player.getHitSound.play()
    }
    handleInput(input) {
        if(this.game.player.knockoutTime <= 0 && this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_LEFT, 0)
            this.game.player.knockoutTime = 0
        } else if(this.game.player.knockoutTime <= 0 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_LEFT, 0)
            this.game.player.knockoutTime = 0
        }
    }
}
export class DizzyRight extends State {
    private player: any;
    constructor(game) {
        super('DIZZY RIGHT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 8
        this.game.player.maxFrame = 8
        this.game.player.speed = 0
        this.game.player.invulTime = 4000
        this.game.player.stepSound.stop()
        this.game.player.getHitSound.play()
    }
    handleInput(input) {
        if(this.game.player.knockoutTime <= 0 && this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT, 0)
            this.game.player.knockoutTime = 0
        } else if(this.game.player.knockoutTime <= 0 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_RIGHT, 0)
            this.game.player.knockoutTime = 0
        }
    }
}
export class RunningLeft extends State {
    private player: any;
    constructor(game) {
        super('RUNNING LEFT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 7
        this.game.player.maxFrame = 8
        this.game.player.speed = -this.game.player.maxSpeed
        this.game.player.stepSound.play()
    }
    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height))

        if(input.includes('ArrowRight') && !input.includes('ArrowLeft'))  this.game.player.setState(states.RUNNING_RIGHT, 1)
        else if(input.includes('ArrowUp')) this.game.player.setState(states.JUMPING_LEFT, 0)
        else if(input.length === 0) this.game.player.setState(states.STANDING_LEFT, 0)
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_LEFT, 0)
    }
}
export class RunningRight extends State {
    private player: any;
    constructor(game) {
        super('RUNNING RIGHT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 6
        this.game.player.maxFrame = 8
        this.game.player.stepSound.play()
    }

    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height))

        //постепенно уменьшаем скорость персонажа ближе к х = 370
        if(this.game.player.x < 370){
            this.game.player.speed = -(this.game.player.x - 370) * 0.03
        } else if(this.game.player.x > 370){
            this.game.player.speed = -(this.game.player.x - 370) * 0.01
        } else this.game.player.speed = 0

        if(input.includes('ArrowLeft') && !input.includes('ArrowRight')) this.game.player.setState(states.RUNNING_LEFT, 0)
        else if(input.includes('ArrowUp')) this.game.player.setState(states.JUMPING_RIGHT, 1)
        else if(input.length === 0) this.game.player.setState(states.STANDING_RIGHT, 0)
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_RIGHT, 2)
    }
}
export class JumpingLeft extends State {
    private player: any;
    constructor(game) {
        super('JUMPING LEFT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 3
        this.game.player.maxFrame = 6
        this.game.player.stepSound.stop()
        if(this.game.player.onGround()) {
            this.game.player.speed = -this.game.player.maxSpeed *  0.5
            this.game.player.jumpSound.play()
            this.game.player.vy -= 30
        } else this.game.player.speed = -this.game.player.maxSpeed
    }
    handleInput(input) {
        if(input.includes('ArrowRight') && !input.includes('ArrowLeft')) this.game.player.setState(states.JUMPING_RIGHT, 1)
        else if(input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_LEFT, 0)
        else if(this.game.player.onGround()) this.game.player.setState(states.STANDING_LEFT, 0)
        else if(this.game.player.vy > 0) this.game.player.setState(states.FALLING_LEFT, 0)
        else if(input.includes('ArrowDown') && this.game.player.groundLevel - this.game.player.y > 250) {
            this.game.player.setState(states.DIVING, 0)
        }
    }
}
export class JumpingRight extends State {
    private player: any;
    constructor(game) {
        super('JUMPING RIGHT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 2
        this.game.player.maxFrame = 6
        this.game.player.stepSound.stop()
        if(this.game.player.onGround()) {
            this.game.player.speed = this.game.player.maxSpeed *  0.5
            this.game.player.jumpSound.play()
            this.game.player.vy -= 30
        } else this.game.player.speed = this.game.player.maxSpeed
    }
    handleInput(input) {
        if(input.includes('ArrowLeft') && !input.includes('ArrowRight')) this.game.player.setState(states.JUMPING_LEFT, 0)
        else if(input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_RIGHT, 1)
        else if(this.game.player.onGround()) this.game.player.setState(states.STANDING_RIGHT, 0)
        else if(this.game.player.vy > 0) this.game.player.setState(states.FALLING_RIGHT, 1)
        else if(input.includes('ArrowDown') && this.game.player.groundLevel - this.game.player.y > 250) {
            this.game.player.setState(states.DIVING, 0)
        }
    }
}
export class FallingLeft extends State {
    private player: any;
    constructor(game) {
        super('FALLING LEFT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 5
        this.game.player.maxFrame = 6
        if(this.game.player.vy !== 1) this.game.player.speed = -this.game.player.maxSpeed
    }
    handleInput(input) {
        if(input.includes('ArrowRight') && !input.includes('ArrowLeft')) this.game.player.setState(states.FALLING_RIGHT, 1)
        else if(this.game.player.onGround()) this.game.player.setState(states.STANDING_LEFT, 0)
        else if(input.includes('ArrowDown') && this.game.player.groundLevel - this.game.player.y > 250) {
            this.game.player.setState(states.DIVING, 0)
        }
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_LEFT, 0)
    }
}
export class FallingRight extends State {
    private player: any;
    constructor(game) {
        super('FALLING RIGHT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 4
        this.game.player.maxFrame = 6
        if(this.game.player.vy !== 1) this.game.player.speed = this.game.player.maxSpeed
    }
    handleInput(input) {
        if(input.includes('ArrowLeft') && !input.includes('ArrowRight')) this.game.player.setState(states.FALLING_LEFT, 1)
        else if(this.game.player.onGround()) this.game.player.setState(states.STANDING_RIGHT, 0)
        else if(input.includes('ArrowDown') ) {
            this.game.player.setState(states.DIVING, 0)
        }
        else if (input.includes(' ') && this.game.ultimateTimer > 0) this.game.player.setState(states.ROLLING_RIGHT, 2)
    }
}
export class RollingLeft extends State {
    private player: any;
    constructor(game) {
        super('ROLLING LEFT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 11
        this.game.player.maxFrame = 6
        this.game.player.speed = -this.game.player.maxSpeed
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.75,
            this.game.player.y + this.game.player.height * 0.4))
        if(!input.includes(' ') && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING_LEFT, 0)
        } else if(!input.includes(' ') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_LEFT, 0)
        } else if(input.includes(' ') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 30
        } else if(input.includes('ArrowDown') && this.game.player.groundLevel - this.game.player.y > 250) {
            this.game.player.setState(states.DIVING, 0)
        } else if(this.game.ultimateTimer === 0 && this.game.player.onGround()) this.game.player.setState(states.RUNNING_LEFT, 0)
    }
}
export class RollingRight extends State {
    private player: any;
    constructor(game) {
        super('ROLLING RIGHT',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 10
        this.game.player.maxFrame = 6
    }
    handleInput(input) {
        //постепенно уменьшаем скорость персонажа ближе к х = 370
        if(this.game.player.x < 370){
            this.game.player.speed = -(this.game.player.x - 370) * 0.03
        } else if(this.game.player.x > 370){
            this.game.player.speed = -(this.game.player.x - 370) * 0.01
        } else this.game.player.speed = 0

        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.4))
        if(!input.includes(' ') && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING_RIGHT, 1)
        } else if(!input.includes(' ') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_RIGHT, 0)
        } else if(input.includes(' ') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 30
        } else if(input.includes('ArrowDown') && this.game.player.groundLevel - this.game.player.y > 250) {
            this.game.player.setState(states.DIVING, 0)
        } else if(this.game.ultimateTimer === 0 && this.game.player.onGround()) this.game.player.setState(states.RUNNING_RIGHT, 1)
    }
}
export class Diving extends State {
    private player: any;
    constructor(game) {
        super('DIVING',game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.frameY = 10
        this.game.player.maxFrame = 6
        this.game.player.vy = 30
        this.game.player.attackSound.stop()
        this.game.player.attackSound.play()
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.4))
        if(this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT, 0)
            if(input.includes(' ')) {
                for(let i = 0; i < 30; i++) {
                    this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5,
                        this.game.player.y + this.game.player.height - 50))
                }
            } else for(let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5,
                    this.game.player.y + this.game.player.height))
            }
        }
    }
}