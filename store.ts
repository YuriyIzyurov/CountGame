import { makeAutoObservable } from 'mobx';
import React, {createContext, useContext} from 'react';
import {correctPositions, ItemsEnum, PositionType, ShelvesEnum} from "./constants";

type ShelfItemType = ItemsEnum | null;
type ShelfItemsListType = ShelfItemType[];


export class BottlesGameStore {
    draggedPosition: PositionType | null = null; // начальная позиция drag-элемента в момент перетаскивания
    positions: Record<ShelvesEnum, ShelfItemsListType>; // содержимое ячеек на полках
    correctNumbers: number[] | null = null;
    currentNumbers: number[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.shuffle();
        this.getRandomNumbers();
    }

    shuffle(): void { // перемешиваем бутылки
        this.positions = {
            [ShelvesEnum.top]: [...correctPositions].sort(
                () => Math.random() - 0.5
            ),
            [ShelvesEnum.bottom]: new Array(correctPositions.length).fill(null),
        };
        this.currentNumbers = new Array(correctPositions.length).fill(null)
        //this.isOneAtBottomCorrect && this.shuffle(); // перемешиваем еще раз, если хотя бы одна стоит на нужной позиции
    }
    getRandomNumbers(): void {
        this.correctNumbers = new Array(correctPositions.length)
            .fill(null)
            .map(() =>  Math.floor(Math.random() * 100) + 1)
            .sort((a, b) => a - b)

        console.log('correct --->',this.correctNumbers)
    };

   /* get isOneAtBottomCorrect(): boolean {
        return correctPositions.some(
            (bottleId, columnIndex) =>
                bottleId === this.positions[ShelvesEnum.bottom][columnIndex]
        );
    }*/

    onDrag(position: PositionType): void {
        this.draggedPosition = position;
        if(position[0] === 0) this.currentNumbers[this.draggedPosition[1]] = null;
    }

    onDrop(itemId: number, currentNumber: number, position: PositionType): void {
        const itemAtDrop = this.getItem(position); // проверяем бутылку в drop-ячейке
        if (itemAtDrop || !this.draggedPosition || this.isCorrect) {
            return;
        }
        this.setItem(this.draggedPosition, null); // удаляем бутылку из drag-ячейки, в которой она находилась в момент начала перетаскивания
        this.setItem(position, itemId); // сохраняем бутылку в drop-ячейку
        if(position[0] === 0) {
            this.currentNumbers[position[1]] = currentNumber
        };
        console.log('current numbers --->',this.currentNumbers)
    }

    getItem(position: PositionType): ShelfItemType {
        const [shelfIndex, columnIndex] = position;
        return this.positions[shelfIndex][columnIndex];
    }

    setItem(position: PositionType, item: ShelfItemType): void {
        const [shelfIndex, columnIndex] = position;
        this.positions[shelfIndex][columnIndex] = item;
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
            JSON.stringify(this.currentNumbers) // элегантный способ 🤨
        );
    }

    get isUncorrect(): boolean { // проверяем, что верхняя полка заполнена, но позиции не верны
        return (
            !this.isCorrect &&
            this.positions[ShelvesEnum.bottom].every((position) => position !== null)
        );
    }
}
export const BottlesGameContext = createContext<BottlesGameStore | null>(null);

export const useStore = <T>(context: React.Context<T | null>): T => {
    const data = useContext(context);
    if (!data) {
        throw new Error("Using store outside of context");
    }
    return data;
};