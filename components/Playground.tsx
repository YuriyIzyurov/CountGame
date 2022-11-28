import React, {useState} from 'react';
import shelf from 'public/images/shelf.svg'
import win from 'public/images/win_window.svg'
import ItemDrag from "../components/ItemDrag";
import {items, ShelvesEnum} from "../constants";
import ItemDrop from "../components/ItemDrop";
import { useStore } from "../store";
import { observer } from 'mobx-react-lite';
import {
    Button,
    ShelfWrapper,
    ContentWrapper,
    WinWindow,
    WinWindowWrapper,
    GameBackground,
    DropBoard
} from "../styles/styles";
import {useRouter} from "next/router";

const Playground: React.FC = () => {
    const store = useStore()
    const router = useRouter()
    const redirect = () => router.push('/settings')

    return (
        <GameBackground background={'coockie_background-empty.jpg'}>
            {store.isCorrect && (
                <WinWindowWrapper>
                    <div style={{position:'relative'}}>
                        <img src={'/images/win_window.svg'}/>
                        <Button
                            onClick={redirect}
                            position={[441,307]}
                            size={[277,72,36]}
                            background={'#2bd600'}
                            color={'white'}
                        >
                            Заново
                        </Button>
                    </div>
                </WinWindowWrapper>
            )}
            <ContentWrapper width={1060} height={900}>
                {store.positionKeys.map((shelfKey, shelfIndex) =>
                    store.getShelf(shelfKey).map((itemKey, itemIndex, shelfKey) => {
                        if (itemKey === null) {
                            return null;
                        }
                        return (
                            <ItemDrag
                                item={items[itemKey]}
                                position={[shelfIndex, itemIndex]}
                                number={store.correctNumbers[itemKey]}
                                key={`bottle-${shelfKey}-${itemKey}`}
                            />
                        );
                    })
                )}
                {Object.keys(items).map((columnIndex) => (
                    <div key={`itemPlaceholder-${columnIndex}`}>
                        <ShelfWrapper position={[ShelvesEnum.top, Number(columnIndex)]} shelf style={{backgroundImage: `url(/images/shelf.svg)`}}/>
                        <ItemDrop position={[ShelvesEnum.top, Number(columnIndex)]} />
                        <ItemDrop position={[ShelvesEnum.bottom, Number(columnIndex)]} />
                    </div>
                ))}
                <DropBoard src={'boards/candy-drop.svg'} alt={'drop-board'}/>
            </ContentWrapper>
        </GameBackground>
    );
};

export default observer (Playground);