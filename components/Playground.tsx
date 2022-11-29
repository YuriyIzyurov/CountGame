import React, {useState} from 'react';
import shelf from 'public/images/shelf.svg'
import win from 'public/images/win_window.svg'
import ItemDrag from "../components/ItemDrag";
import {Backgrounds, items, ShelvesEnum} from "../constants";
import ItemDrop from "../components/ItemDrop";
import { useStore } from "../store";
import { observer } from 'mobx-react-lite';
import {
    Button,
    ShelfWrapper,
    ContentWrapper,
    WinWindowWrapper,
    GameBackground,
    DropBoard, ValuesDirection
} from "../styles/styles";
import {useRouter} from "next/router";

const Playground: React.FC = () => {
    const store = useStore()
    const router = useRouter()

    const path = {
        background: `backgrounds/${Backgrounds[store.background]}_background-empty.jpg`,
        dropBoard: `boards/${Backgrounds[store.background]}-drop.svg`
    }

    const redirect = () => {
        store.refreshCurrentNumbers()
        return router.push('/settings')
    }

    return (
        <GameBackground background={path.background}>
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
                <ValuesDirection
                    src={store.increase ? 'direction/increase.png' : 'direction/decrease.png'}
                    $direction={store.increase} alt={'inc'}/>
                <DropBoard src={path.dropBoard} alt={'drop-board'}/>
            </ContentWrapper>
        </GameBackground>
    );
};

export default observer (Playground);