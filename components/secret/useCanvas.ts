import {useEffect, useRef} from "react";

const useCanvas = draw => {
    const canvasRef = useRef(null)
    let CANVAS_WIDTH
    let CANVAS_HEIGHT
    let ctx
    let animationFrameId
    let gameFrame = 0

    useEffect(() => {
        console.log('useEffect restart')
        const canvas = canvasRef.current
        CANVAS_WIDTH = canvas.width = 600
        CANVAS_HEIGHT = canvas.height = 600
        ctx = canvas.getContext('2d')
        const playerImage = new Image()
        playerImage.src = 'secret/shadow_dog.png'

        //Отрисовка
        const render = () => {
            gameFrame++
            draw(ctx, playerImage, gameFrame, CANVAS_WIDTH, CANVAS_HEIGHT)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}
export default useCanvas