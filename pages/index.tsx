import Head from "next/head";
import A from "../components/A";
import {GameBackground} from "../styles/styles";
import {useEffect} from "react";

const Index = () => {

    return (
        <>
            <GameBackground background={'backgrounds/background-stars.jpg'}>
                <div className='navbar'>
                    <A href={'/settings'} text='ИГРАТЬ'/>
                    <A href={'/secret'} text='В РАЗРАБОТКЕ'/>
                </div>
            </GameBackground>
        </>
    );
};

export default Index;