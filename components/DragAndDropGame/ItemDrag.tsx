import * as React from "react";
import { observer } from "mobx-react-lite";
import { useDrag } from "react-dnd";
import {Coins, Cookies, Flowers, ItemType, ItemTypes, PositionType, Toys} from "../../constants";
import { useStore } from "../../store";
import { ItemDragWrapper, NumberWrapper } from "../../styles/styles";


type ItemDragProps = {
    item: ItemType
    position: PositionType
    number: string|number
    quantity: number
};

const ItemDrag: React.FC<ItemDragProps> = ({item, position, number, quantity}: ItemDragProps) => {
    const store = useStore();


    const chooseImage = (background: number)  => {
        switch (background) {
            case 0: return Cookies
            case 1: return Coins
            case 2: return Toys
            case 3: return Flowers
        }
    }
    let Items = chooseImage(store.background)

    const [{isDragging}, drag] = useDrag(() => ({
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
                quantity={quantity}
                style={{
                    backgroundImage: `url("DragDropGame/images/${Items[item.id]}")`
                }}
            >
                <NumberWrapper data-text={number} correctionY={store.background === 2}>
                    {number}
                </NumberWrapper>
            </ItemDragWrapper>

        </div>
    );
};

export default observer(ItemDrag);