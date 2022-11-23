import React, { useState } from 'react';
import {Button, ChooseSection, ItemsCount, PickCircle, SettingsWrapper, Values} from "../styles/styles";

const Settings = () => {
    const [itemsCount, setItemsCount] = useState(2)
    const [values, setValues] = useState(0)


    const setSelectorsOptions = (index: number, arr: unknown[]) => {
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
        <SettingsWrapper>
            <img style={{width: '700px'}} src={'/settings_window.svg'} alt={'settings'}/>
            <ItemsCount>
                {Array.from({length: 4}).map((item, index, arr) => {
                    const [width, justifyContent, itemCount] = setSelectorsOptions(index, arr)
                    return <ChooseSection
                        key={index}
                        width={width}
                        justifyContent={justifyContent}
                        onClick={() => setItemsCount(itemCount)}
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
                        onClick={() => setValues(value)}
                    >
                        {values === value && <PickCircle/>}
                    </ChooseSection>
                })}
            </Values>
            <Button
                position={[687,426]}
                size={[279,63,31]}
            >
                Играть
            </Button>
        </SettingsWrapper>
    );
};

export default Settings;