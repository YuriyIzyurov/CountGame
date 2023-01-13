class FloatingMessages {
    protected x: any;
    protected y: any;
    protected targetX: any;
    protected targetY: any;
    private markedForDeletion: boolean;
    protected timer: number;
    protected game: any;
    constructor(game) {
        this.game = game
        this.markedForDeletion = false
        this.timer = 0
    }
    update(deltaTme) {
        this.x += (this.targetX - this.x) * 0.03
        this.y += (this.targetY - this.y) * 0.03
        this.timer++
        if(this.timer > 100 || this.game.gameOver) {
            this.markedForDeletion = true
        }
    }
}
export class BonusTimeMessage extends FloatingMessages{
    private readonly value: any;
    constructor(game, value, x, y, targetX, targetY) {
        super(game)
        this.value = value
        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY
    }
    update(deltaTme) {
        super.update(deltaTme);
        if(this.timer > 100) {
            this.game.time += 1000
        }
    }
    draw(context) {
        context.fillStyle = 'white'
        context.fillText(this.value, this.x, this.y)
        context.fillStyle = 'indigo'
        context.fillText(this.value, this.x - 2, this.y - 2)
    }
}

export class FloatingCandyPoint extends FloatingMessages{
    private readonly candyWidth: number;
    private readonly candyHeight: number;
    private scalingWidth: number;
    private scalingHeight: number;
    private sizeModifier: number;
    private readonly image: HTMLImageElement;
    constructor(game, x, y, targetY) {
        super(game)
        this.image = new Image()
        this.image.src = 'Canvas2DGame/effects/mini_candy.png'
        this.x = x
        this.y = y
        this.candyWidth = 43
        this.candyHeight = 100
        this.sizeModifier = 0
        this.scalingWidth = this.candyWidth
        this.scalingHeight = this.candyHeight
        this.targetX = 605 + this.scalingWidth/1.7 * this.game.candyCurrent
        this.targetY = targetY
    }
    update(deltaTme) {
        super.update(deltaTme);
        this.sizeModifier += deltaTme * 0.42
        this.scalingWidth = this.candyWidth/(1 + this.sizeModifier * 0.001)
        this.scalingHeight = this.candyHeight/(1 + this.sizeModifier * 0.001)
        if(this.timer > 100) {
            this.game.candyCurrent++
        }

    }
    draw(context) {
       context.drawImage(this.image, 43, 0, this.candyWidth, this.candyHeight, this.x, this.y, this.scalingWidth, this.scalingHeight)
    }
}
