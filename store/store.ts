import { makeAutoObservable } from 'mobx';
import {Backgrounds, correctPositions, ItemsEnum, PositionType, ShelvesEnum} from "../constants";

type ShelfItemType = ItemsEnum | null;
type ShelfItemsListType = ShelfItemType[];


export class NumbersGameStore {
    draggedPosition: PositionType | null = null; // начальная позиция drag-элемента в момент перетаскивания
    positions: Record<ShelvesEnum, ShelfItemsListType>; // содержимое ячеек на полках
    correctNumbers: (number|string)[] | null = null;
    currentNumbers: (number|string)[] | null = null;
    increase: boolean | null = null;
    background: Backgrounds | null = null;
    quantity: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    shuffle(): void { // перемешиваем штучки
        this.positions = {
            [ShelvesEnum.top]: [...correctPositions].slice(0,this.quantity).sort(
                () => Math.random() - 0.5
            ),
            [ShelvesEnum.bottom]: new Array(5).fill(null),
        };
        this.currentNumbers = [...correctPositions].fill(null)
    }

    getRandomNumbers(symbols: (number | string)[]): void {
        this.correctNumbers = symbols
    };


    onDrag(position: PositionType): void {
        this.draggedPosition = position;
        if(position[0] === 0) this.currentNumbers[this.draggedPosition[1]] = null;
    }

    onDrop(itemId: number, currentNumber: number, position: PositionType): void {
        const itemAtDrop = this.getItem(position); // проверяем штучку в drop-ячейке
        if (itemAtDrop || !this.draggedPosition || this.isCorrect) {
            return;
        }
        this.setItem(this.draggedPosition, null); // удаляем штучку из drag-ячейки, в которой она находилась в момент начала перетаскивания
        this.setItem(position, itemId); // сохраняем штучку в drop-ячейку
        if(position[0] === 0) {
            this.currentNumbers[position[1]] = currentNumber
        };
    }

    getItem(position: PositionType): ShelfItemType {
        const [shelfIndex, columnIndex] = position;
        return this.positions[shelfIndex][columnIndex];
    }

    setItem(position: PositionType, item: ShelfItemType): void {
        const [shelfIndex, columnIndex] = position;
        this.positions[shelfIndex][columnIndex] = item;
    }

    setDirection(isInc: boolean) {
        this.increase = isInc
    }
    setBackground(background: Backgrounds) {
        this.background = background
    }
    setQuantity(number: number) {
        this.quantity = number
    }
    refreshCurrentNumbers() {
        this.currentNumbers = new Array(correctPositions.length).fill(null)
    }
    get positionKeys(): string[] {
        return Object.keys(this.positions);
    }

    getShelf(shelf: string): ShelfItemsListType {
        return this.positions[shelf];
    }
    get isCorrect(): boolean { // проверяем правильные позиции
        return (
            JSON.stringify(this.correctNumbers) ===
            JSON.stringify(Object.values(this.currentNumbers).filter(item => item))
        );
    }

    hydrate(data) {
        if (!data) return;
       //использовать, если буду фетчить дату с сервера
    };
}
