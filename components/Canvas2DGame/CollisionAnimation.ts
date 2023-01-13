export class CollisionAnimation {
    private readonly image: HTMLImageElement;
    private x: any;
    private readonly y: any;
    private readonly width: number;
    private readonly height: number;
    private frameX: number;
    private angle: number;
    private sound: HTMLAudioElement;
    private game: any;
    private readonly spriteWidth: number;
    private readonly spriteHeight: number;
    private readonly sizeModifier: number;
    private readonly maxFrame: number;
    private markedForDeletion: boolean;
    private readonly fps: number;
    private readonly frameInterval: number;
    private frameTimer: number;
    constructor(game, x, y) {
        this.game = game
        this.image = new Image()
        this.image.src = 'Canvas2DGame/effects/boom.png'
        this.sound = new Audio('Canvas2DGame/sound/enemy-explosion.mp3')
        this.spriteWidth = 260
        this.spriteHeight = 260
        this.sizeModifier = 1.3
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.frameX = 0
        this.maxFrame = 9
        this.markedForDeletion = false
        this.fps = 60
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.angle = Math.random() * 6.2
    }
    update(deltatime) {
        if(this.frameX === 0) this.sound.play()
        this.x -= this.game.speed
        if(this.frameTimer > this.frameInterval) {
            this.frameX++
            this.frameTimer = 0
        } else this.frameTimer += deltatime
        if(this.frameX > this.maxFrame) this.markedForDeletion = true
    }
    draw(context) {
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth,this.spriteHeight, this.x, this.y, this.width, this.height )
    }
}