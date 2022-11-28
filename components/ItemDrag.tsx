import * as React from "react";
import { observer } from "mobx-react-lite";
import { useDrag } from "react-dnd";

import { useStore } from "../store";

import {ItemType, ItemTypes, PositionType} from "../constants";
import { ITEM_DND_TYPE } from "../constants";
import {ItemDragWrapper, NumberWrapper} from "../styles/styles";
import {Dispatch, useEffect, useState} from "react";
import Item from "../components/Item";

type ItemDragProps = {
    item: ItemType
    position: PositionType
    number: string|number
};

const ItemDrag: React.FC<ItemDragProps> = ({item, position, number, }: ItemDragProps) => {
    const store = useStore();
    const [num, setNumber] = useState<(number|string) | null>(null)
    const [img, setImage] = useState<string>("/images/coockie_1.svg")

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: ItemTypes.ITEM,
        item: () => {
            const id = item.id
            store.onDrag(position)
            return {id, number}
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }))

   const dragRef = (drag as unknown) as React.RefObject<HTMLDivElement>;

    useEffect(() => {
        setNumber(number)
        setImage(item.image)
    },[])

    return (
        <div>
            <ItemDragWrapper
                ref={dragRef}
                position={position}
                isDragging={isDragging}
                style={{
                    backgroundImage: `url(${img})`
                }}
            >
                {num && <NumberWrapper data-text={num}>{num}</NumberWrapper>}
            </ItemDragWrapper>

        </div>
    );
};

export default observer(ItemDrag);