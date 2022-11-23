export enum ItemsEnum {
    first,
    second,
    third,
    fourth,
    fifth
}
export enum ShelvesEnum {
    bottom,
    top
}
export type PositionType = [ShelvesEnum, ItemsEnum];
export type ItemType = {
    id: ItemsEnum
    image: string
}
export const correctPositions = [
    ItemsEnum.first,
    ItemsEnum.second,
    ItemsEnum.third,
    ItemsEnum.fourth,
    ItemsEnum.fifth
];
export const ITEM_DND_TYPE = "ITEM_DND_TYPE";
/*export type ItemGlyphType = {
    type: string;
    item: ItemType;
};*/
export type ItemGlyphType = {
    id: number
    number: number
}

export const items: Record<ItemsEnum, ItemType> = {
    [ItemsEnum.first]: {
        id: ItemsEnum.first,
        image: "/images/coockie_1.svg"
    },
    [ItemsEnum.second]: {
        id: ItemsEnum.second,
        image: "/images/coockie_3.svg"
    },
    [ItemsEnum.third]: {
        id: ItemsEnum.third,
        image: "/images/coockie_5.svg"
    },
    [ItemsEnum.fourth]: {
        id: ItemsEnum.fourth,
        image: "/images/coockie_2.svg"
    },
    [ItemsEnum.fifth]: {
        id: ItemsEnum.fifth,
        image: "/images/coockie_3.svg"
    }
};
export const ItemTypes = {
    ITEM: 'item'
}
