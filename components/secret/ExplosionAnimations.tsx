import React from 'react';
import styles from "styles/secret.module.scss";
import useExplosionAnimations from "../secret/useExplosionAnimations";

const ExplosionAnimations = (props) => {
    const { draw, ...rest } = props
    const canvasRef = useExplosionAnimations(draw)

    return (
        <canvas className={styles.canvas4} ref={canvasRef}  {...rest}></canvas>
    );
};

export default ExplosionAnimations;