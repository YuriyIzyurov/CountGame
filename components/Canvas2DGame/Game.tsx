import React, {useEffect} from 'react';
import styles from "styles/secret.module.scss";
import useGame from "./useGame";

const Game = () => {

    let canvasRef = useGame()
    let gameMusic
    let gameFont


    useEffect(() => {
        gameFont = new FontFace('Rubik Gemstones', 'url(Canvas2DGame/fonts/RubikGemstones.ttf)')
        gameFont.load().then(font => document.fonts.add(font))
        gameMusic = new Audio('Canvas2DGame/sound/Wintertale.mp3')
        gameMusic.loop = true
        gameMusic.play()
        initializeImages()

        return () => {
            gameMusic.pause()
            gameMusic.currentTime = 0
        }
    }, [])

    function initializeImages() {
        const image1 = new Image()
        const image2 = new Image()
        const image3 = new Image()
        const image4 = new Image()
        const image5 = new Image()
        const image6 = new Image()
        const image7 = new Image()
        const image8 = new Image()
        image1.src = 'Canvas2DGame/enemies/winter/rocketman.png'
        image2.src = 'Canvas2DGame/enemies/winter/candy_walk.png'
        image3.src = 'Canvas2DGame/enemies/winter/candy_run.png'
        image4.src = 'Canvas2DGame/enemies/winter/golem-walk.png'
        image5.src = 'Canvas2DGame/enemies/winter/golem-sliding.png'
        image6.src = 'Canvas2DGame/enemies/winter/golem-slashing.png'
        image7.src = 'Canvas2DGame/enemies/winter/yeti-walk.png'
        image8.src = 'Canvas2DGame/enemies/winter/yeti-attack.png'
    }

    return (
        <>
            <canvas className={styles.canvas} ref={canvasRef} ></canvas>
            <div className={styles.UI}>
                <img src={'Canvas2DGame/UI/UI-keyboard.png'} alt='UI'/>
                <button className={styles.fullScreenButton} id='fullScreenButton'>Полный экран</button>
            </div>
        </>
    )
};

export default Game;