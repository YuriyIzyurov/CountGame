import {UltimateProgress} from "./particles";

export class UI {
    private readonly game: any;
    private readonly fontSize: number;
    private readonly fontFamily: string;
    private readonly liveImage: HTMLImageElement;
    private readonly candyImage: HTMLImageElement;
    private readonly candyWidth: number;
    private readonly candyHeight: number;
    private candyFrame: number;
    private readonly color: string;
    private readonly ultimateBar: HTMLImageElement;
    private readonly barWidth: number;
    private barFrameX: number;
    private barFrameY: number;
    private readonly barHeight: number;
    private readonly marginTop: number;
    private readonly barX: number;
    private test: HTMLImageElement;
    private readonly baseParticleGapX: number;
    private currentParticleGapX: number;
    private barAngle: number;
    private readonly ultimateBarShaking: boolean;
    private readonly ultimateCountNumbers: HTMLImageElement;
    private readonly numbersWidth: number;
    private readonly numbersHeight: number;
    constructor(game) {
        this.game = game
        this.fontSize = 50
        this.fontFamily = 'Rubik Gemstones'
        this.color = 'indigo'
        this.marginTop = 17
        this.liveImage = new Image()
        this.liveImage.src = 'Canvas2DGame/effects/heart.png'
        this.candyImage = new Image()
        this.candyImage.src = 'Canvas2DGame/effects/mini_candy.png'
        this.candyWidth = 40.5
        this.candyHeight = 100
        this.candyFrame = 0
        this.ultimateBar = new Image()
        this.ultimateBar.src = 'Canvas2DGame/effects/ultimate-progress.png'
        this.test = new Image()
        this.test.src = 'Canvas2DGame/effects/ultimate-progress-full.png'
        this.ultimateCountNumbers = new Image()
        this.ultimateCountNumbers.src = 'Canvas2DGame/effects/numbers_ui.png'
        this.numbersWidth = 100
        this.numbersHeight = 115
        this.barX = 900
        this.barWidth = 267
        this.barHeight = 60
        this.barFrameX = 0
        this.barFrameY = 0
        this.barAngle = 0
        this.baseParticleGapX = 37
        this.currentParticleGapX = 0
        this.ultimateBarShaking = false
    }

    update() {
        this.barAngle = Math.random() < 0.5 ? -0.06 : 0.06

        this.chooseBarImg(this.game.killedEnemies)
        for(let i = 1; i < 4; i++) {
            this.game.particles.unshift(new UltimateProgress(this.game, this.barX + this.baseParticleGapX + this.currentParticleGapX,
                this.marginTop + (i*10)))
        }
    }
    draw(context) {
        //game timer
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.color
        context.fillText('Время: ' + (this.game.time * 0.001).toFixed(0), 22, 52)

        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.liveImage, 40 * i + 350, this.marginTop, 40, 40)
        }

        //candy count
        for (let i = 1; i < this.game.candy + 1; i++) {
            if(this.game.candyCurrent >= i) this.candyFrame = 1
            else this.candyFrame = 0
            context.drawImage(this.candyImage, this.candyWidth * this.candyFrame, 0,
                this.candyWidth, this.candyHeight, 25 * i + 580, this.marginTop, this.candyWidth/1.7, this.candyHeight/1.7)
        }

        //ultimate progress bar
        if(this.ultimateBarShaking && this.game.ultimateTimer === 0) {
            context.save()
            context.translate(this.barX + 145, this.marginTop)
            context.rotate(this.barAngle)
            context.drawImage(this.ultimateBar, this.barWidth * this.barFrameX, this.barHeight * this.barFrameY,
                this.barWidth, this.barHeight, -this.barWidth * 0.55, -this.barHeight * 0.5 + 30, this.barWidth, this.barHeight)
            context.restore()
        } else {
            context.drawImage(this.ultimateBar, this.barWidth * this.barFrameX, this.barHeight * this.barFrameY,
                this.barWidth, this.barHeight, this.barX, this.marginTop, this.barWidth, this.barHeight)
            if(this.game.ultimateTimer > 0) {
                const frameX = +(this.game.ultimateTimer * 0.001).toFixed(0)
                context.drawImage(this.ultimateCountNumbers, this.numbersWidth * frameX, 0,
                    this.numbersWidth, this.numbersHeight, this.barX + this.barWidth * 0.43, this.marginTop,
                    this.numbersWidth/2, this.numbersHeight/2)
            }
        }

        //game over
        if(this.game.gameOver) {
            context.fillStyle = "rgba(235,226,252,0.4)"
            context.fillRect(0, 0, this.game.width, this.game.height)

            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            context.fillStyle = this.color
            context.fillText(this.game.candyCurrent === this.game.candy - 1
                ? 'Хорошая работа, пёс!'
                : 'Не повезло :(',
                this.game.width * 0.5, this.game.height * 0.5 -20)
            context.fillText('Enter - начать заново', this.game.width * 0.5, this.game.height * 0.5 + 60)
        }
    }
    chooseBarImg(enemyKilled) {
        const basePixels = 23
        switch (enemyKilled) {
            case 0: this.barFrameX = 0, this.barFrameY = 0,
                this.ultimateBar.src = 'Canvas2DGame/effects/ultimate-progress.png', this.currentParticleGapX = 0
                break
            case 1: this.barFrameX = 0, this.barFrameY = 1, this.currentParticleGapX = basePixels
                break
            case 2: this.barFrameX = 0, this.barFrameY = 2, this.currentParticleGapX = 2*basePixels
                break
            case 3: this.barFrameX = 1, this.barFrameY = 0, this.currentParticleGapX = 3*basePixels
                break
            case 4: this.barFrameX = 1, this.barFrameY = 1, this.currentParticleGapX = 4*basePixels
                break
            case 5: this.barFrameX = 1, this.barFrameY = 2, this.currentParticleGapX = 5*basePixels
                break
            case 6: this.barFrameX = 2, this.barFrameY = 0, this.currentParticleGapX = 6*basePixels
                break
            case 7: this.barFrameX = 2, this.barFrameY = 1, this.currentParticleGapX = 7*basePixels
                break
            case 8: this.barFrameX = 2, this.barFrameY = 2, this.currentParticleGapX = 8*basePixels
                break
            default: this.barFrameX = 0, this.barFrameY = 0,
                this.ultimateBar.src = 'Canvas2DGame/effects/ultimate-progress-full.png', this.currentParticleGapX = 9*basePixels
                break
        }
    }
}