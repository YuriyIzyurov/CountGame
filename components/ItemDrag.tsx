import * as React from "react";
import { observer } from "mobx-react-lite";
import { useDrag } from "react-dnd";

import { useStore } from "../store";

import {Coins, Cookies, ItemType, ItemTypes, PositionType, Toys} from "../constants";
import { ITEM_DND_TYPE } from "../constants";
import {ItemDragWrapper, NumberWrapper} from "../styles/styles";
import {Dispatch, useEffect, useState} from "react";
import Item from "../components/Item";

type ItemDragProps = {
    item: ItemType
    position: PositionType
    number: string|number
};

const ItemDrag: React.FC<ItemDragProps> = ({item, position, number}: ItemDragProps) => {
    const store = useStore();


    const chooseImage = (background: number)  => {
        switch (background) {
            case 0: return Cookies
            case 1: return Coins
            case 2: return Toys
        }
    }
    let Items = chooseImage(store.background)

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


    return (
        <div>
            <ItemDragWrapper
                ref={dragRef}
                position={position}
                style={{
                    backgroundImage: `url("/images/${Items[item.id]}")`
                }}
            >
                <NumberWrapper data-text={number} correctionY={store.background === 2}>{number}</NumberWrapper>
            </ItemDragWrapper>

        </div>
    );
};

export default observer(ItemDrag);