import React from 'react';
import styles from 'styles/secret.module.scss';
import useCanvas from "../secret/useCanvas";
import useBackgroundCanvas from "../secret/useBackgroundCAnvas";

const BackgroundCanvas = (props) => {
    const { draw, ...rest } = props
    const canvasRef = useBackgroundCanvas(draw)

    return (
        <canvas className={styles.canvas2} ref={canvasRef} {...rest}></canvas>
    );
};

export default BackgroundCanvas;