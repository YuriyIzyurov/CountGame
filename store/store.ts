import { makeAutoObservable } from 'mobx';
import React, {createContext, useContext} from 'react';
import { enableStaticRendering } from "mobx-react-lite";
import {correctPositions, ItemsEnum, PositionType, ShelvesEnum} from "../constants";

type ShelfItemType = ItemsEnum | null;
type ShelfItemsListType = ShelfItemType[];


export class BottlesGameStore {
    draggedPosition: PositionType | null = null; // начальная позиция drag-элемента в момент перетаскивания
    positions: Record<ShelvesEnum, ShelfItemsListType>; // содержимое ячеек на полках
    correctNumbers: (number|string)[] | null = null;
    currentNumbers: (number|string)[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.currentNumbers = new Array(correctPositions.length).fill(null)
    }

    shuffle(): void { // перемешиваем бутылки
        this.positions = {
            [ShelvesEnum.top]: [...correctPositions].sort(
                () => Math.random() - 0.5
            ),
            [ShelvesEnum.bottom]: new Array(correctPositions.length).fill(null),
        };
        //this.isOneAtBottomCorrect && this.shuffle(); // перемешиваем еще раз, если хотя бы одна стоит на нужной позиции
    }

    getRandomNumbers(symbols: (number | string)[]): void {
        this.correctNumbers = symbols
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
    hydrate(data) {
        if (!data) return;
       //использовать, если буду фетчить дату с сервера
    };
}
