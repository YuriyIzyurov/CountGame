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
        image: "/images/"
    },
    [ItemsEnum.second]: {
        id: ItemsEnum.second,
        image: "/images/"
    },
    [ItemsEnum.third]: {
        id: ItemsEnum.third,
        image: "/images/"
    },
    [ItemsEnum.fourth]: {
        id: ItemsEnum.fourth,
        image: "/images/"
    },
    [ItemsEnum.fifth]: {
        id: ItemsEnum.fifth,
        image: "/images/"
    }
};
export enum Backgrounds {
    cookie,
    coin,
    winter
}
export enum Cookies {
    'cookie_1.svg',
    'cookie_2.svg',
    'cookie_3.svg',
    'cookie_4.svg',
    'cookie_5.svg',
}
export enum Coins {
    'coin_1.svg',
    'coin_2.svg',
    'coin_3.svg',
    'coin_4.svg',
    'coin_5.svg',
}
export enum Toys {
    'toy_1.svg',
    'toy_2.svg',
    'toy_3.svg',
    'toy_4.svg',
    'toy_5.svg',
}
export const ItemTypes = {
    ITEM: 'item'
}
