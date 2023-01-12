import React, {useEffect, useRef} from 'react';
import styles from 'styles/secret.module.scss'
import useCanvas from "../secret/useCanvas";

const Canvas = props => {

    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return (
            <canvas className={styles.canvas1} ref={canvasRef} {...rest}></canvas>
    );
};

export default Canvas;