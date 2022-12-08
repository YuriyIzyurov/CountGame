import A from "../components/A";
import Coockie1 from "../components/ComponentsSVG/Coockie1";
import {GameBackground} from "../styles/styles";

const Index = () => {

    return (
        <GameBackground background={'backgrounds/background-stars.jpg'}>
            <div className='navbar'>
                <A href={'/settings'} text='ИГРАТЬ'/>
            </div>
            <style jsx>
                {`
                    .navbar {
                    padding: 15px;
                    }
                    .link {
                    text-decoration: none;
                    color: orange;
                    font-size: 54px;
                    padding: 10px;
                    }
                `}
            </style>
        </GameBackground>
    );
};

export default Index;