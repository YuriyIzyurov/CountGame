import React, {MutableRefObject, useEffect, useRef} from 'react';
import ItemDrag from "../../components/DragAndDropGame/ItemDrag";
import {Backgrounds, convertImage, items, ShelvesEnum, toBase64} from "../../constants";
import ItemDrop from "../../components/DragAndDropGame/ItemDrop";
import { useStore } from "../../store";
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import {
    Button,
    ShelfWrapper,
    ContentWrapper,
    WinWindowWrapper,
    GameBackground,
    DropBoard, ValuesDirection
} from "../../styles/styles";
import win_window from '../../public/DragDropGame/images/win_window.svg'
import {useRouter} from "next/router";

const Playground: React.FC = () => {
    const store = useStore()
    const router = useRouter()


    const background = Backgrounds[store.background]

    const clickGoToOptions = useRef<undefined|HTMLAudioElement>(typeof Audio !== "undefined"
        ? new Audio('DragDropGame/sounds/clickOption.mp3')
        : undefined)
    const audioWin = useRef<undefined|HTMLAudioElement>(typeof Audio !== "undefined"
        ? new Audio('DragDropGame/sounds/win.mp3')
        : undefined)

    const alias = {
        background: `DragDropGame/backgrounds/${background}_background-empty.jpg`,
        dropBoard: `/DragDropGame/boards/${background}-drop.png`,
        audioShelf: `DragDropGame/sounds/${background}-onShelf.mp3`,
        audioDrop: `DragDropGame/sounds/${background}-drop.mp3`
    }

    useEffect(() => {
        if(store.background === null) router.push('/settings')
        if(store.isCorrect) audioWin.current?.play()
    }, [store.isCorrect])


    const redirect = () => {
        store.refreshCurrentNumbers()
        clickGoToOptions.current.play()
        return router.push('/settings')
    }

    const audio = (path: string): MutableRefObject <HTMLAudioElement> =>
        useRef<HTMLAudioElement>(typeof Audio !== "undefined" ? new Audio(path) : undefined)




    return (
        <GameBackground background={alias.background}>
            {store.isCorrect && (
                <WinWindowWrapper>
                    <div style={{position:'relative'}}>
                        <Image src={win_window}
                               width={853}
                               height={598}
                               placeholder="blur"
                               blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                   convertImage(700, 475)
                               )}`}
                               alt="win"/>
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
                            audio={audio(alias.audioShelf).current}
                            isEmpty={+columnIndex+1 > store.quantity}
                            quantity={store.quantity}
                        />
                        <ItemDrop
                            position={[ShelvesEnum.bottom, +columnIndex]}
                            audio={audio(alias.audioDrop).current}
                        />
                    </div>
                ))}
                <ValuesDirection
                    src={store.increase ? 'DragDropGame/direction/increase.png' : 'DragDropGame/direction/decrease.png'}
                    style={{alignSelf: store.increase ? 'flex-start' : 'flex-end'}}
                    alt={'inc'}/>
                <DropBoard src={alias.dropBoard} alt={'drop-board'}/>
            </ContentWrapper>
        </GameBackground>
    );
};

export default observer (Playground);
