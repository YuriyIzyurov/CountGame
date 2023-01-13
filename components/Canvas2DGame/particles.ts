class Particle {
    private game: any;
    protected markedForDeletion: boolean;
    protected x: any;
    protected speedX: any;
    protected speedY: any;
    protected y: any;
    protected size: number;
    protected image: HTMLImageElement;
    constructor(game) {
        this.game = game
        this.markedForDeletion = false
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= 0.95
        if(this.size < 0.5) this.markedForDeletion = true
    }
}
export class Dust extends Particle {
    private readonly color: string;
    constructor(game, x, y) {
        super(game)
        this.size = Math.random() * 10 + 10
        this.x = x
        this.y = y
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgb(44,55,147, 0.25)'
    }
    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
    }
}
export class Fire extends Particle {
    private angle: number;
    private readonly va: number;
    private readonly isRocketFire: boolean;
    constructor(game, x, y, size = 100) {
        super(game);
        this.isRocketFire = size !== 100
        this.image = new Image()
        this.image.src = this.isRocketFire && Math.random() > 0.75
            ? 'Canvas2DGame/effects/fire-blue.png' : 'Canvas2DGame/effects/fire.png'
        this.size = Math.random() * size + size
        this.x = x
        this.y = y
        this.speedX = 1
        this.speedY = 1
        this.angle = 0
        this.va = Math.random() * 0.2 - 0.1
    }
    update() {
        super.update()
        if(this.isRocketFire) {
            this.speedY = -4
            if(this.size < 40) this.markedForDeletion = true
        }
        this.angle += this.va
        this.x += Math.sin(this.angle * 5)
    }
    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size)
        context.restore()
    }
}
export class Splash extends Particle {
    private gravity: number;
    constructor(game, x, y) {
        super(game)
        this.image = new Image()
        this.image.src = Math.random() < 0.7 ? 'Canvas2DGame/effects/fire.png' : 'Canvas2DGame/effects/ice-splash2.png'
        this.size = Math.random() * 100 + 50
        this.x = x - this.size * 0.4
        this.y = y- this.size * 0.5
        this.speedX = Math.random() * 6 - 4
        this.speedY = Math.random() * 2 + 1
        this.gravity = 0
    }
    update() {
        super.update()
        this.gravity += 0.1
        this.y += this.gravity
        if(this.size < 5) this.markedForDeletion = true
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size)
    }
}
export class IceSplash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.image = new Image()
        this.image.src = 'Canvas2DGame/effects/ice-splash.png'
        this.size = Math.random() * 40 + 40
        this.x = x
        this.y = y
        this.speedX = 1
        this.speedY = Math.round(-4  + Math.random() * 15)
    }
    update() {
        super.update()
        if(this.size < 35) this.markedForDeletion = true
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size)
    }
}
export class UltimateProgress extends Particle {
    private readonly color: string;
    constructor(game, x, y) {
        super(game)
        this.size = Math.random() * 4
        this.x = x
        this.y = y + Math.random() * 10
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgba(241,211,6,0.6)'
    }
    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
    }
    update() {
        this.x = Math.random() < 0.5 ? this.x - this.speedX : this.x + this.speedX
        this.y -= this.speedY
        this.size *= 0.9
        if(this.size < 0.5) this.markedForDeletion = true
    }
}