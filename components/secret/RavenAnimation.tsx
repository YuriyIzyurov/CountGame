import React from 'react';
import styles from "styles/secret.module.scss";
import useRavenFly from "../secret/useRavenFly";

const RavenAnimation = (props) => {
    const { draw, ...rest } = props
    const [canvasRef, collisionRef] = useRavenFly(draw)

    return (
        <>
            <canvas className={styles.collisionCanvas} ref={collisionRef}  {...rest}></canvas>
            <canvas className={styles.canvas5} ref={canvasRef}  {...rest}></canvas>
        </>
    );
};

export default RavenAnimation;