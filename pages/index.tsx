import A from "../components/A";
import Coockie1 from "../components/ComponentsSVG/Coockie1";
import {GameBackground} from "../styles/styles";

const Index = () => {

    return (
        <GameBackground background={'coockie_background-empty.jpg'}>
            <div className='navbar'>
                <A href={'/'} text='Main'/>
                <A href={'/Board'} text='Board'/>
                <A href={'/settings'} text='Settings'/>
            </div>
            <h1>Главная страница</h1>
            <style jsx>
                {`
                    .navbar {
                    background: orange;
                    padding: 15px;
                    }
                    .link {
                    text-decoration: none;
                    color: white;
                    font-size: 24px;
                    padding: 10px;
                    }
                `}
            </style>
        </GameBackground>
    );
};

export default Index;