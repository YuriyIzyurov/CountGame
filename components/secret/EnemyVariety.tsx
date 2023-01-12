import React from 'react';
import styles from "styles/secret.module.scss";
import useEnemyVariety from "../secret/useEnemyVariety";


const EnemyVariety = (props) => {

    const { draw, ...rest } = props
    const canvasRef = useEnemyVariety(draw)

    return (
        <>
            <canvas className={styles.canvas6} ref={canvasRef}  {...rest}></canvas>
        </>
    );
};

export default EnemyVariety;