import * as React from "react";
import { observer } from "mobx-react-lite";
import { useDrop } from "react-dnd";

import {  useStore } from "../store";

import {ItemGlyphType, PositionType, ITEM_DND_TYPE, ItemTypes} from "../constants";
import { ItemDropWrapper } from "../styles/styles";
import {Dispatch} from "react";

type ItemDropProps = {
    position: PositionType;
};

const ItemDrop: React.FC<ItemDropProps> = ({position}: ItemDropProps) => {
    const store = useStore();

    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item, monitor) => {
            const glyph = item as ItemGlyphType;
            store.onDrop(glyph.id, glyph.number, position);
        }
    });

    const dropRef = (drop as unknown) as React.RefObject<HTMLDivElement>;

    return <ItemDropWrapper position={position} ref={dropRef} />;
};

export default observer(ItemDrop);