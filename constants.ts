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

export type ItemGlyphType = {
    id: number
    number: number
}

export const items: Record<ItemsEnum, ItemType> = {
    [ItemsEnum.first]: {
        id: ItemsEnum.first,
        image: "DragDropGame/images/"
    },
    [ItemsEnum.second]: {
        id: ItemsEnum.second,
        image: "DragDropGame/images/"
    },
    [ItemsEnum.third]: {
        id: ItemsEnum.third,
        image: "DragDropGame/images/"
    },
    [ItemsEnum.fourth]: {
        id: ItemsEnum.fourth,
        image: "DragDropGame/images/"
    },
    [ItemsEnum.fifth]: {
        id: ItemsEnum.fifth,
        image: "DragDropGame/images/"
    }
};
export enum Backgrounds {
    cookie,
    coin,
    winter,
    flower
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
export enum Flowers {
    'flower_1.svg',
    'flower_2.svg',
    'flower_3.svg',
    'flower_4.svg',
    'flower_5.svg',
}
export const ItemTypes = {
    ITEM: 'item'
}
export const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

export const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);
