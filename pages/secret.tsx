import React, {useEffect, useRef} from 'react';
import Canvas from "../components/secret/Canvas";
import BackgroundCanvas from "../components/secret/BackgroundCanvas";
import MovementCanvas from "../components/secret/MovementCanvas";
import ExplosionAnimations from "../components/secret/ExplosionAnimations";
import RavenAnimation from "../components/secret/RavenAnimation";
import EnemyVariety from "../components/secret/EnemyVariety";
import Game from "../components/secret/Game";
import styles from "styles/secret.module.scss";

const Secret = () => {

    const staggerFrames = 5
    const spriteWidth = 575
    const spriteHeight = 523

    const spriteAnimations = []
    const animationStates = [
        {
            name: 'idle',
            frames: 7,
        },
        {
            name: 'jump',
            frames: 7,
        },
        {
            name: 'fall',
            frames: 7,
        },
        {
            name: 'run',
            frames: 9,
        },
        {
            name: 'dizzy',
            frames: 11,
        },
        {
            name: 'sit',
            frames: 5,
        },
        {
            name: 'roll',
            frames: 7,
        },
        {
            name: 'bite',
            frames: 7,
        },
        {
            name: 'ko',
            frames: 12,
        },
        {
            name: 'hitted',
            frames: 4,
        },
    ]
    animationStates.forEach((state, index) => {
        let frames = {
            loc:[]
        }
        for(let i = 0; i < state.frames; i++) {
            let positionX = i * spriteWidth
            let positionY = index * spriteHeight
            frames.loc.push({x: positionX, y: positionY})
        }
        spriteAnimations[state.name] = frames
    })

    useEffect(() => {
        const gameFont = new FontFace('Rubik Gemstones', 'url(secret/fonts/RubikGemstones.ttf)')
        gameFont.load().then(font => document.fonts.add(font))
    }, [])

    return (
        <div className={styles.gameBackground}>
            <Game />
        </div>
    );
};

export default Secret;