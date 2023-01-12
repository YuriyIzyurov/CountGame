class Layer {
    private x: number;
    private y: number;
    private readonly width: number;
    private readonly height: number;
    private image: HTMLImageElement ;
    private readonly speedModifier: any;
    private speed: number;
    private game: any;
    constructor(game, image, speedModifier, width, height) {
        this.game = game
        this.image = image
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.x = 0
        this.y = this.image.src.includes('Layer7') ? -120 : 0

    }
    update() {
        if(this.x <= -this.width) {
            this.x = 0
        }
        else {
            this.image.src.includes('Layer7')
                ? this.x -= (this.game.speed > 0 ? this.game.speed : 1) * this.speedModifier
                : this.x -= this.game.speed * this.speedModifier
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}
export  class Background {
    private gameWidth: any;
    private gameHeight: any;
    private image: HTMLImageElement;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;
    private game: any;
    private layer1image: HTMLImageElement;
    private layer2image: HTMLImageElement;
    private layer3image: HTMLImageElement;
    private layer4image: HTMLImageElement;
    private layer5image: HTMLImageElement;
    private layer6image: HTMLImageElement;
    private layer7image: HTMLImageElement;
    private layer1: Layer;
    private layer2: Layer;
    private layer3: Layer;
    private layer4: Layer;
    private layer5: Layer;
    private layer6: Layer;
    private layer7: Layer;
    private backgroundLayers: Layer[];
    constructor(game) {
        this.game = game
        this.width = 1500
        this.height = 720
        this.layer1image = new Image()
        this.layer2image= new Image()
        this.layer3image = new Image()
        this.layer4image = new Image()
        this.layer5image = new Image()
        this.layer6image = new Image()
        this.layer7image = new Image()
        this.layer1image.src = 'secret/backgroundLayers/winter/Layer1.png'
        this.layer2image.src = 'secret/backgroundLayers/winter/Layer2.png'
        this.layer3image.src = 'secret/backgroundLayers/winter/Layer3.png'
        this.layer4image.src = 'secret/backgroundLayers/winter/Layer4.png'
        this.layer5image.src = 'secret/backgroundLayers/winter/Layer5.png'
        this.layer6image.src = 'secret/backgroundLayers/winter/Layer6.png'
        this.layer7image.src = 'secret/backgroundLayers/winter/Layer7.png'
        this.layer1 = new Layer(this.game, this.layer1image, 0, this.width, this.height)
        this.layer2 = new Layer(this.game, this.layer2image, 0.2, this.width, this.height)
        this.layer3 = new Layer(this.game, this.layer3image, 0.4, this.width, this.height)
        this.layer4 = new Layer(this.game, this.layer4image, 0.8, this.width, this.height)
        this.layer5 = new Layer(this.game, this.layer5image, 1, this.width, this.height)
        this.layer6 = new Layer(this.game, this.layer6image, 1, this.width, this.height)
        this.layer7 = new Layer(this.game, this.layer7image, 1, this.width, this.height)
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7]
    }
    restart() {
        this.x = 0
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => layer.draw(context))
    }
    update() {
        this.backgroundLayers.forEach(layer => layer.update())

    }
}