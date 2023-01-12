import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from "styles/secret.module.scss";
import useGame from "../secret/useGame";

const Game = (props) => {
    const { draw, ...rest } = props
    let canvasRef = useGame(draw)
    let gameMusic

    useEffect(() => {
        gameMusic = new Audio('secret/sound/Wintertale.mp3')
        gameMusic.loop = true
        gameMusic.play()
        return () => {
            gameMusic.pause()
            gameMusic.currentTime = 0
        }
    }, [])

    return (
        <>
            <canvas className={styles.canvas7} ref={canvasRef}  {...rest}></canvas>
            <div className={styles.UI}>
                <img src={'secret/UI/UI-keyboard4.png'} alt='UI'/>
                <button className={styles.fullScreenButton} id='fullScreenButton'>Полный экран</button>
            </div>
        </>
    )
};

export default Game;