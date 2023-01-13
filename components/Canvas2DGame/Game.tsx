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
        return () => {
            gameMusic.pause()
            gameMusic.currentTime = 0
        }
    }, [])

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