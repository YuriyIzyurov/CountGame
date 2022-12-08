import styled from "styled-components";
import { PositionType } from "../constants";


export const SHELF_GAP_V = 15; // ▀↕️▄ вертикальный отступ между полками
const SHELF_START_H = 8.1; // горизонтальный отступ между началом полки и первой ячейкой
const DROP_WIDTH = 9.8; // ширина ячейки на полке
const DROP_HEIGHT = 11; // высота ячейки на полке
const DRAG_SIZE = 9.8; // ширина/высота draggable штуки
const GAP = 8; // расстояние между драг элементами


const getShelfItemPositionStyle = ([top, left]: PositionType) => `
	top: ${DROP_HEIGHT * 3.87}rem;
	left: ${left * (DROP_WIDTH + 0.2) + SHELF_START_H}rem;
`;
const getButtonPosition = (position: number[], size: number[]) => `
    width: ${size[0]}px;
    height: ${size[1]}px;
    top: ${position[0]}px;
    left: ${position[1]}px;
    font-size: ${size[2]}px;
`;
const getTopShelfItemPositionsStyle = ([top, left]: PositionType, background: string = null, quantity: number | null) => {
    let coordinates
    let shelfGapY = 0
    let shelfGapX = 0
    let quantityOffset = 0
    let flowerGAP = background === 'flower'
    switch (left) {
        case 0: coordinates = [9, left * (DROP_WIDTH + 2) + (flowerGAP ? 8.5 : GAP)]
            break
        case 1: coordinates = [2, left * (DROP_WIDTH + 2.7) + (flowerGAP ? 6.8 : GAP)]
            break
        case 2: coordinates = [12, left * (DROP_WIDTH + 1.8) + (flowerGAP ? 6.5 : GAP)]
            break
        case 3: coordinates = [2, left * (DROP_WIDTH + 1.8) + (flowerGAP ? 3 : GAP)]
            break
        case 4: coordinates = [9, left * (DROP_WIDTH + 1.8) + (flowerGAP ? -4 : GAP)]
    }
    if(background) {
        if(background === 'winter')  shelfGapY = -3, shelfGapX = 5
        else if(background === 'flower') shelfGapY = 8, shelfGapX = 7
            else shelfGapY = 9.8
    }
    if(quantity)
        quantityOffset =
            quantity === 2 ? 14
                : quantity === 3 ? 9
                    : quantity === 4 ? 3
                        : 0

    return `
        top: ${coordinates[0] + shelfGapY}rem;
        left: ${coordinates[1] + shelfGapX + quantityOffset}rem;
    `
}
const getSectionOptions = (width: number, justifyContent: string) => `
    width: ${width}px;
    justify-content: ${justifyContent}
`;
export const DNDItem = styled.div<{
    position: PositionType
    background: string | null
    quantity?: number | null
}>`
  ${({ position, background = null, quantity }) => {
      return position[0] === 0 ? getShelfItemPositionStyle(position) : getTopShelfItemPositionsStyle(position, background, quantity)
  }}
  position: absolute;
`;
export const Btn = styled.button<{position: number[], size: number[]}>`
  ${({ position, size }) => {
      return getButtonPosition(position, size)
  }}
`
const Slider = styled.div`
  position: absolute;
  display: flex;
  cursor: pointer;
  height: 20px;
  background: transparent;
`
export const ItemDragWrapper = styled(DNDItem)`
  width: ${DRAG_SIZE}rem;
  height: ${DRAG_SIZE}rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  z-index: 3; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemDropWrapper = styled(DNDItem)`
  width: ${DROP_WIDTH}rem;
  height: ${DROP_HEIGHT}rem;
  z-index: 2; 
`;
export const ShelfWrapper = styled(DNDItem)<{background: string, quantity: number, isEmpty: boolean, shelfNumber: number}>`
  ${({background, isEmpty, shelfNumber}) => {
    if(isEmpty) return null
    let flowerWidth
    let flowerHeight
    if(background === 'flower') {
      switch (shelfNumber) {
        case 1: flowerWidth = 8, flowerHeight = 22.7 
          break
        case 2: flowerWidth = 4.7, flowerHeight = 29.7
          break
        case 3: flowerWidth = 4.5, flowerHeight = 19.7
          break
        case 4: flowerWidth = 2.85, flowerHeight = 29.7
          break
        case 5: flowerWidth = 7.35, flowerHeight = 22.7
      } 
    }
    const shelfParams =  
            background === 'winter' ? ['branchShelf', 7, 5.8]
                    : background === 'flower' ? [`flower_shelf-${shelfNumber}`, flowerWidth , flowerHeight] 
                            : ['shelf', 9.2, 1.95]
    return `
    background-image: url(/shelfs/${shelfParams[0]}.svg);
    width: ${shelfParams[1]}rem;
    height: ${shelfParams[2]}rem;
    z-index: 4;
    `
  } }
`;
export const NumberWrapper = styled.div<{correctionY: boolean}>`
  position: absolute;
  color: white;
  padding-bottom: ${({correctionY}) => .25 + (correctionY && -0.25)}em;
  padding-top: ${({correctionY}) => correctionY && .5}em;
  font-size: 65px;
  z-index: 1;
  &:before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    right: 0;
    -webkit-text-stroke: .17em #242546;
    z-index: -1;
  }
`;

export const WinWindowWrapper = styled.div`
  width: 100%;
  min-height: 900px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  backdrop-filter: blur(4px);
  position: absolute;
  z-index: 5; 
`
export const Button = styled(Btn)<{background: string, color: string}>`
  position: absolute;
  border-radius: 21px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  font-weight: bold;
`

export const ContentWrapper = styled.div<{width: number, height: number}>`
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`
export const ItemsCount = styled(Slider)`
  top: 147px;
  left: 164px;
  width: 368px;
`
export const PickCircle = styled.span`
  width: 21px;
  height: 21px;
  background-color: #383e76;
  border-radius: 50%;
`
export const ChooseSection = styled.div<{ width: number, justifyContent: string }>`
    display: flex;
    ${({ width, justifyContent }) => getSectionOptions(width, justifyContent)};
`
export const Values = styled(Slider)`
  top: 315px;
  left: 84px;
  width: 532px;
`
export const GameBackground = styled.div<{ background: string}>`
  background: url(${({background}) => background}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DropBoard = styled.img`
  align-self: flex-end;
  width: 1060px;
`
export const ValuesDirection = styled.img`
  height: 69px;
  width: 358px;
  margin-bottom: 10px;
  z-index: 5;
`
export const ChooseField = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 144px;
  left: 76px;
  width: 546px;
`
export const CustomCheckbox = styled.div`
    position: relative;
    input {
      -webkit-appearance: none;
      appearance: none;
      position: absolute;
      &:checked + label:before {
        border-color: #ffd748;
      }
      &:checked + label:after {
        opacity: 1;
      }
    }
    label {
      padding-left: 35px;
      font: bold 1.5rem "Arial", sans-serif;
      color: #423f45;
      cursor: pointer;
      &:before {
        content: '';
        display: block;
        width: 25px;
        height: 25px;
        border: 2px solid #423f45;
        border-radius: 5px;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        transition: background .1s linear, border .1s linear;
      }
      &:after {
        opacity: 0;
        content: '';
        display: block;
        width: 33px;
        height: 33px;
        background: url('/images/check.svg') no-repeat;
        background-size:  33px 33px;
        position: absolute;
        top: -2px;
        left: 1px;
        z-index: 2;
        transition: opacity .1s linear;
      }
    }
`
export const CustomSelect = styled.div`
  position: relative;
  &:after {
    content: '';
    display: block;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #000 transparent transparent transparent;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    margin-top: -3px;
    z-index: 1;
  }
  select {
    cursor: pointer;
    background: none;
    padding: 0.25rem 2.5rem 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;
    font: bold 1.5rem "Arial", sans-serif;
    color: #423f45;
    &:focus {
      outline: 0;
      border-color: #ffd748;
    }
   }
`
export const ErrorMessage = styled.div`
    position: absolute;
    color: red;
    font: bold 1.2rem "Arial", sans-serif;
    bottom: 117px;
    left: 273px;
`