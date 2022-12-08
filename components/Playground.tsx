import React, {useEffect, useRef} from 'react';
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

    const background = Backgrounds[store.background]
    const clickGoToOptions = useRef<HTMLAudioElement>(new Audio('sounds/clickOption.mp3'))

    const alias = {
        background: `backgrounds/${background}_background-empty.jpg`,
        dropBoard: `boards/${background}-drop.svg`,
        audioShelf: `sounds/${background}-onShelf.mp3`,
        audioDrop: `sounds/${background}-drop.mp3`
    }

    useEffect(() => {
        const audioWin = useRef<HTMLAudioElement>(new Audio('sounds/win.mp3'))
        if(store.isCorrect) audioWin.current.play()
    }, [store.isCorrect])


    const redirect = () => {
        store.refreshCurrentNumbers()
        clickGoToOptions.current.play()
        return router.push('/settings')
    }

    const setInitialPositions = (itemIndex: number): number => {
        let itemPosition = itemIndex
        if(store.quantity) {
            switch(store.quantity) {
                case 2: itemPosition = itemIndex === 0 ? itemIndex + 1 : itemIndex + 2
                    break
                case 3: itemPosition =  itemIndex + 1
                    break
                case 4:
                case 5: itemPosition =  itemIndex
            }
        }
        return itemPosition
    }
    const audio = (path: string): HTMLAudioElement => new Audio(path)

    return (
        <GameBackground background={alias.background}>
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
                                number={store.shuffledNumbers[itemKey]}
                                quantity={store.quantity}
                                key={`item-${shelfKey}-${itemKey}`}
                            />
                        );
                    })
                )}
                {Object.keys(items).map((columnIndex) => (
                    <div key={`itemPlaceholder-${columnIndex}`}>
                        <ShelfWrapper
                            position={[ShelvesEnum.top, +columnIndex]}
                            background={background}
                            isEmpty={+columnIndex+1 > store.quantity}
                            quantity={store.quantity}
                            shelfNumber={+columnIndex + 1}
                        />
                        <ItemDrop
                            position={[ShelvesEnum.top, +columnIndex]}
                            audio={audio(alias.audioShelf)}
                            isEmpty={+columnIndex+1 > store.quantity}
                            quantity={store.quantity}
                        />
                        <ItemDrop
                            position={[ShelvesEnum.bottom, +columnIndex]}
                            audio={audio(alias.audioDrop)}
                        />
                    </div>
                ))}
                <ValuesDirection
                    src={store.increase ? 'direction/increase.png' : 'direction/decrease.png'}
                    style={{alignSelf: store.increase ? 'flex-start' : 'flex-end'}}
                    alt={'inc'}/>
                <DropBoard src={alias.dropBoard} alt={'drop-board'}/>
            </ContentWrapper>
        </GameBackground>
    );
};

export default observer (Playground);