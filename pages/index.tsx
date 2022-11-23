import A from "../components/A";
import Coockie1 from "../components/ComponentsSVG/Coockie1";

const Index = () => {
    return (
        <div>
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
            </div>
    );
};

export default Index;