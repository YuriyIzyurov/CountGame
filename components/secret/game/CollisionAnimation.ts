export class CollisionAnimation {
    private image: HTMLImageElement;
    private x: any;
    private y: any;
    private width: number;
    private height: number;
    private frameX: number;
    private angle: number;
    private sound: HTMLAudioElement;
    private game: any;
    private spriteWidth: number;
    private spriteHeight: number;
    private sizeModifier: number;
    private maxFrame: number;
    private markedForDeletion: boolean;
    private fps: number;
    private frameInterval: number;
    private frameTimer: number;
    constructor(game, x, y) {
        this.game = game
        this.image = new Image()
        this.image.src = 'secret/effects/boom.png'
        this.sound = new Audio('secret/sound/enemy-explosion.wav')
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
        //context.save()
        //context.translate(this.x, this.y)
        //context.rotate(this.angle)
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth,this.spriteHeight, this.x, this.y, this.width, this.height )
       // context.restore()
    }
}