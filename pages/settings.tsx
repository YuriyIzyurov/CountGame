import React, {useEffect, useState} from 'react';
import {
    Button,
    ChooseSection,
    GameBackground,
    ItemsCount,
    PickCircle,
    ContentWrapper,
    Values, ChooseField
} from "../styles/styles";
import {useStore} from "../store";
import {useRouter} from "next/router";
import {Backgrounds} from "../constants";



const Settings = () => {
    const [itemsCount, setItemsCount] = useState<number>(2)
    const [values, setValues] = useState<number>(0)
    const [isIncrease, setIsIncrease] = useState<boolean>(true)
    const [isRandom, setIsRandom] = useState<boolean>(true)
    const [background, setBackground] = useState<number>(3)
    const [error, setError] = useState<boolean>(false)

    const store = useStore()
    const router = useRouter()

    const chooseSymbol = (values: number) => {
        return values === 0
            ? String.fromCharCode(Math.floor(Math.random()*(1040-1071))+1071)
            : Math.round( 0.5 + Math.random() * values)
    }
    const chooseDirection = (values: number, isIncrease: boolean, set: Set<number|string>) => {
        const a = Array.from(set)
        if( values === 0 ) {
            return isIncrease
                ? a.sort()
                : a.sort().reverse()
        } else return isIncrease
            ? a.sort((a:number,b:number) => a - b)
            : a.sort((a:number,b:number) => b - a)
    }

    const generateRandomSymbols = (values: number, isIncrease: boolean): (number | string)[] => {
        let set: Set<number|string> = new Set()
        while (set.size < 5) {
            set.add(chooseSymbol(values))
        }
        return chooseDirection(values, isIncrease, set)
    }

    const setOptionsAndStartGame = () => {
        if(!isRandom && background === 3) {
            setError(true)
            return
        }
        const array = generateRandomSymbols(values, isIncrease)
        store.shuffle()
        store.getRandomNumbers(array)
        store.setDirection(isIncrease)
        store.setBackground(generateBackground(background, isRandom))
        redirect()
    }
    const redirect = () => router.push('/Board')
    const setRandomField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRandom(e.currentTarget.checked)
    }
    const changeBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBackground(+e.target.value)
    }
    const generateBackground = (background: number, isRandom: boolean) => {
        if (isRandom) {
            return Math.floor(Math.random() * 3)
        } else if(background === 3) {
            setError(true)
        } else return background
    }

    const setSelectorsOptions = (index: number, arr: unknown[]): Array<number | string> => {
        let width
        let value
        let justifyContent
        let topOptions = arr.length === 4
        switch (index) {
            case 0: width = topOptions ? 80 : 60, value = topOptions ? 2 : 0, justifyContent = 'flex-start'
                break
            case 1: width = topOptions ? 120 : 85, value = topOptions ? 3 : 9, justifyContent = 'center'
                break
            case 2: width = topOptions ? 120 : 110, value = topOptions ? 4 : 19, justifyContent = 'center'
                break
            case 3: width = topOptions ? 80 : 90, value = topOptions ? 5 : 50, justifyContent = topOptions ? 'flex-end' : 'center'
                break
            case 4: width = 120, value = 99, justifyContent = 'center'
                break
            case 5: width = 67, value = 999, justifyContent = 'flex-end'
        }
        return [width, justifyContent, value]
    }
    return (
        <GameBackground background={'backgrounds/background-stars.jpg'}>
          <ContentWrapper width={700} height={661}>
            <img style={{width: '700px'}} src={'/settings_window.svg'} alt={'settings'}/>
            <ItemsCount>
                {Array.from({length: 4}).map((item, index, arr) => {
                    const [width, justifyContent, itemCount] = setSelectorsOptions(index, arr)
                    return <ChooseSection
                        key={index}
                        width={width}
                        justifyContent={justifyContent}
                        onClick={() => setItemsCount(itemCount as number)}
                    >
                        {itemsCount === itemCount && <PickCircle/>}
                    </ChooseSection>
                })}
            </ItemsCount>
            <Values>
                {Array.from({length: 6}).map((item, index, arr) => {
                    const [width, justifyContent, value] = setSelectorsOptions(index, arr)
                    return <ChooseSection
                        key={index}
                        width={width}
                        justifyContent={justifyContent}
                        onClick={() => setValues(value as number)}
                    >
                        {values === value && <PickCircle/>}
                    </ChooseSection>
                })}
            </Values>
            <Button
                style={{opacity: !isIncrease ? '0.5' : '1'}}
                onClick={() => setIsIncrease(true)}
                position={[400,75]}
                size={[260,55,28]}
                background={'#ffd748'}
                color={' #423f45'}>По возрастанию</Button>
            <Button
                style={{opacity: isIncrease ? '0.5' : '1'}}
                onClick={() => setIsIncrease(false)}
                position={[400,363]} size={[260,55,28]}
                background={'#ffd748'}
                color={' #423f45'}>По убыванию</Button>
            <ChooseField>
                <div>
                    <input type="checkbox" id="random" checked={isRandom} onChange={setRandomField}/>
                    <label htmlFor="random">Случайная тема</label>
                </div>
                <h1>{background}</h1>
                <select disabled={isRandom} value={background} onChange={changeBackground}>
                    <option disabled value={3}>Выберите тему</option>
                    <option value={Backgrounds.cookie}>Сладости</option>
                    <option value={Backgrounds.coin}>Монетки</option>
                    <option value={Backgrounds.winter}>Новый Год</option>
                </select>
                {error && <a style={{color: 'red'}}>Выберите тему!</a>}
            </ChooseField>
            <Button
                position={[549,210]}
                size={[279,63,31]}
                background={'#2bd600'}
                color={'white'}
                onClick={setOptionsAndStartGame}
            >Играть</Button>
          </ContentWrapper>
        </GameBackground>
    );
};

export default Settings;