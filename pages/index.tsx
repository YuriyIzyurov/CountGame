import A from "../components/A";
import {GameBackground} from "../styles/styles";
import styles from "styles/secret.module.scss";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <Head>
                <title>Игры</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet"
                />
            </Head>
            <GameBackground background={'DragDropGame/backgrounds/background-stars.jpg'}>
                <div className={styles.gamesMenu}>
                    <header>ВЫБЕРИ ИГРУ</header>
                    <A href={'/settings'} text='&nbsp;Знаешь&nbsp;ли&nbsp;ты&nbsp;числа?'/>
                    <A href={'/jumpingdog'} text='&nbsp;Охота&nbsp;&nbsp;за&nbsp;конфетами'/>
                </div>
            </GameBackground>
        </>
    );
};

export default Index;