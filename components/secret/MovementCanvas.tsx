import React from 'react';
import styles from 'styles/secret.module.scss';
import useMovementCanvas from "../secret/useMovementCanvas";

const MovementCanvas = (props) => {
    const { draw, ...rest } = props
    const canvasRef = useMovementCanvas(draw)

    return (
        <canvas className={styles.canvas3} ref={canvasRef} {...rest}></canvas>
    );
};

export default MovementCanvas;