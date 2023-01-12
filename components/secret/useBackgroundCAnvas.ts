import {useEffect, useRef} from "react";

const useBackgroundCanvas = draw => {
    const canvasRef = useRef(null)
    let CANVAS_WIDTH
    let CANVAS_HEIGHT
    let ctx
    let animationFrameId
    let gameSpeed = 15
   // let gameFrame = 0


    let LayerObject1
    let LayerObject2
    let LayerObject3
    let LayerObject4
    let LayerObject5

    class Layer {
        private x: number;
        private y: number;
        private readonly width: number;
        private readonly height: number;
        private image: HTMLImageElement ;
        private readonly speedModifier: any;
        private speed: number;
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400
            this.height = 700
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }
        update() {
            this.speed = gameSpeed * this.speedModifier
            if(this.x <= -this.width) {
                this.x = 0
            }
            this.x = this.x - this.speed
           // this.x = gameFrame * this.speed % this.width
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }

    useEffect(() => {
        console.log('useEffect restart ---- background')
        const canvas = canvasRef.current
        CANVAS_WIDTH = canvas.width = 800
        CANVAS_HEIGHT = canvas.height = 700
        ctx = canvas.getContext('2d')

        const Layer1 = new Image()
        const Layer2 = new Image()
        const Layer3 = new Image()
        const Layer4 = new Image()
        const Layer5 = new Image()

        Layer1.src = 'secret/backgroundLayers/layer-1.png'
        Layer2.src = 'secret/backgroundLayers/layer-2.png'
        Layer3.src = 'secret/backgroundLayers/layer-3.png'
        Layer4.src = 'secret/backgroundLayers/layer-4.png'
        Layer5.src = 'secret/backgroundLayers/layer-5.png'

        LayerObject1 = new Layer(Layer1, 0.2)
        LayerObject2 = new Layer(Layer2, 0.4)
        LayerObject3 = new Layer(Layer3, 0.6)
        LayerObject4 = new Layer(Layer4, 0.8)
        LayerObject5 = new Layer(Layer5, 1)

        const layers = [LayerObject1,LayerObject2,LayerObject3,LayerObject4,LayerObject5]

        //Отрисовка
        const render = () => {
            draw(ctx, layers, CANVAS_WIDTH, CANVAS_HEIGHT)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}
export default useBackgroundCanvas