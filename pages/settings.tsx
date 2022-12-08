import React, {useRef, useState} from 'react';
import {
    Button,
    ChooseSection,
    GameBackground,
    ItemsCount,
    PickCircle,
    ContentWrapper,
    Values, ChooseField, CustomCheckbox, CustomSelect, ErrorMessage
} from "../styles/styles";
import {useStore} from "../store";
import {useRouter} from "next/router";
import {Backgrounds} from "../constants";



const Settings = () => {
    const [itemsCount, setItemsCount] = useState<number>(5)
    const [values, setValues] = useState<number>(0)
    const [isIncrease, setIsIncrease] = useState<boolean>(true)
    const [isRandom, setIsRandom] = useState<boolean>(true)
    const [background, setBackground] = useState<number>(4)
    const [error, setError] = useState<boolean>(false)

    const store = useStore()
    const router = useRouter()
    const clickValue = useRef<HTMLAudioElement|undefined>(typeof Audio !== "undefined" ? new Audio('sounds/clickOption.mp3') : undefined)
    const clickOptions = useRef<HTMLAudioElement|undefined>(typeof Audio !== "undefined" ? new Audio('sounds/clickDirectionAndRandom.mp3') : undefined)
    const clickStart = useRef<HTMLAudioElement|undefined>(typeof Audio !== "undefined" ? new Audio('sounds/clickStartGame.mp3') : undefined)

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
        while (set.size < itemsCount) {
            set.add(chooseSymbol(values))
        }
        return chooseDirection(values, isIncrease, set)
    }

    const setOptionsAndStartGame = () => {
        if(!isRandom && background === 4) {
            setError(true)
            setTimeout(() => setError(false), 1000)
            return
        }
        const array = generateRandomSymbols(values, isIncrease)
        store.setQuantity(itemsCount)
        store.setRandomNumbers(array)
        store.setDirection(isIncrease)
        store.setBackground(generateBackground(background, isRandom))
        store.shuffle()
        clickStart.current.play()
        redirect()
    }
    const redirect = () => router.push('/Board')
    const setRandomField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRandom(e.currentTarget.checked)
        setBackground(4)
        clickOptions.current.play()
    }
    const changeBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBackground(+e.target.value)
        clickOptions.current.play()
    }
    const generateBackground = (background: number, isRandom: boolean) => {
        if (isRandom) {
            return Math.floor(Math.random() * 4)
        } else if(background === 4) {
            setError(true)
        } else return background
    }
    const clickOptionHandler = (callback: React.Dispatch<number|boolean>, value: number|boolean, audio: HTMLAudioElement) => {
        callback(value)
        audio.play()
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
            <img style={{width: '700px'}} src={'backgrounds/settings_window.svg'} alt={'settings'}/>
            <ItemsCount>
                {Array.from({length: 4}).map((item, index, arr) => {
                    const [width, justifyContent, itemCount] = setSelectorsOptions(index, arr)
                    return <ChooseSection
                        key={index}
                        width={width}
                        justifyContent={justifyContent}
                        onClick={() => clickOptionHandler(setItemsCount as React.Dispatch<number>, itemCount as number, clickValue.current)}
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
                        onClick={() => clickOptionHandler(setValues as React.Dispatch<number>, value as number, clickValue.current)}
                    >
                        {values === value && <PickCircle/>}
                    </ChooseSection>
                })}
            </Values>
            <Button
                style={{opacity: !isIncrease ? '0.5' : '1'}}
                onClick={() => clickOptionHandler(setIsIncrease as React.Dispatch<boolean>, true, clickOptions.current)}
                position={[400,75]}
                size={[260,55,28]}
                background={'#ffd748'}
                color={' #423f45'}>По возрастанию</Button>
            <Button
                style={{opacity: isIncrease ? '0.5' : '1'}}
                onClick={() => clickOptionHandler(setIsIncrease as React.Dispatch<boolean>, false, clickOptions.current)}
                position={[400,363]} size={[260,55,28]}
                background={'#ffd748'}
                color={' #423f45'}>По убыванию</Button>
            <ChooseField>
                <CustomCheckbox>
                    <input type="checkbox" id="random" checked={isRandom} onChange={setRandomField}/>
                    <label htmlFor="random">Случайная тема</label>
                </CustomCheckbox>
                <CustomSelect>
                    <select disabled={isRandom} value={background} onChange={changeBackground}>
                        <option disabled value={4}>Выберите тему</option>
                        <option value={Backgrounds.cookie}>Сладости</option>
                        <option value={Backgrounds.coin}>Монетки</option>
                        <option value={Backgrounds.winter}>Новый Год</option>
                        <option value={Backgrounds.flower}>Цветы</option>
                    </select>
                </CustomSelect>
            </ChooseField>
            {error && <ErrorMessage>Выберите тему!</ErrorMessage>}
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