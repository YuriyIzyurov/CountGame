import React, {useState} from 'react';
import styles from "styles/Board.module.scss";
import shelf from 'public/images/shelf.svg'
import win from 'public/images/win_window.svg'
import ItemDrag from "../components/ItemDrag";
import {items, ShelvesEnum} from "../constants";
import ItemDrop from "../components/ItemDrop";
import {BottlesGameContext, useStore} from "../store";
import { observer } from 'mobx-react-lite';
import {Button, ShelfWrapper, Title, WinWindow, WinWindowWrapper} from "../styles/styles";
import {useRouter} from "next/router";

const Playground: React.FC = () => {
    const store = useStore(BottlesGameContext);
    const [state, changeState] = useState(false)
    const router = useRouter()

    const redirect = () => router.push('/settings')

    return (
        <>
            {store.isCorrect ? (
                <WinWindowWrapper>
                    <WinWindow src={'/images/win_window.svg'}/>
                    <Button
                        onClick={redirect}
                        position={[467,440]}
                        size={[277,72,36]}
                    >
                        Заново
                    </Button>
                </WinWindowWrapper>
            ) : store.isUncorrect ? (
                <Title>Эта расстановка неверная, попробуй еще раз</Title>
            ) : (
                <Title>Расставь штучки по возрастанию</Title>
            )}
            <div className={styles.items}>
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
                        <ItemDrop position={[ShelvesEnum.top, Number(columnIndex)]} changeState={changeState}
                                  state={state}/>
                        <ItemDrop position={[ShelvesEnum.bottom, Number(columnIndex)]} changeState={changeState}
                                  state={state}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default observer (Playground);