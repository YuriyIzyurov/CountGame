import React from 'react';
import Game from "../components/Canvas2DGame/Game";
import styles from "styles/secret.module.scss";

const Jumpingdog = () => {

    return (
        <div className={styles.gameBackground}>
            <Game />
        </div>
    );
};

export default Jumpingdog;