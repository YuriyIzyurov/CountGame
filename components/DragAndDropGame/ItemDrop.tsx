import * as React from "react";
import { observer } from "mobx-react-lite";
import { useDrop } from "react-dnd";
import {  useStore } from "../../store";
import {ItemGlyphType, PositionType, ItemTypes} from "../../constants";
import { ItemDropWrapper } from "../../styles/styles";


type ItemDropProps = {
    position: PositionType
    audio: HTMLAudioElement
    isEmpty?: boolean
    quantity?: number
};

const ItemDrop: React.FC<ItemDropProps> = ({position, audio, isEmpty, quantity}) => {
    const store = useStore();


    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item, monitor) => {
            const glyph = item as ItemGlyphType;
            store.onDrop(glyph.id, glyph.number, position);
            audio.play()
        }
    });

    const dropRef = (drop as unknown) as React.RefObject<HTMLDivElement>;

    if(isEmpty) return null
    return <ItemDropWrapper position={position} ref={dropRef} quantity={quantity}/>;
};

export default observer(ItemDrop);