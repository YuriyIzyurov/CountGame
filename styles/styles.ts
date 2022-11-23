import styled from "styled-components";
import { PositionType } from "../constants";


export const SHELF_GAP_V = 15; // ▀↕️▄ вертикальный отступ между полками
const SHELF_START_H = 15; // горизонтальный отступ между началом полки и первой ячейкой
const DROP_WIDTH = 9.8; // ширина ячейки на полке
const DROP_HEIGHT = 11; // высота ячейки на полке
const DRAG_SIZE = 9.8; // ширина/высота draggable бутылки


const getShelfItemPositionStyle = ([top, left]: PositionType) => `
	top: ${DROP_HEIGHT * 2.8}rem;
	left: ${left * DROP_WIDTH + SHELF_START_H}rem;
`;
const getButtonPosition = (position: number[], size: number[]) => `
    width: ${size[0]}px;
    height: ${size[1]}px;
    top: ${position[0]}px;
    left: ${position[1]}px;
    font-size: ${size[2]}px;
`;
const getTopShelfItemPositionsStyle = ([top, left]: PositionType, shelf: boolean = null) => {
    let coordinates
    let shelfGap = 0
    switch (left) {
        case 0: coordinates = [6, left * (DROP_WIDTH + 2) + 8]
            break
        case 1: coordinates = [-1, left * (DROP_WIDTH + 2.7) + 8]
            break
        case 2: coordinates = [9, left * (DROP_WIDTH + 1.8) + 8]
            break
        case 3: coordinates = [-1, left * (DROP_WIDTH + 1.8) + 8]
            break
        case 4: coordinates = [6, left * (DROP_WIDTH + 1.8) + 8]
    }
    if(shelf) shelfGap = 9.8
    return `
        top: ${coordinates[0] + shelfGap}rem;
        left: ${coordinates[1]}rem;
    `
}
const getSectionOptions = (width: number, justifyContent: string) => `
    width: ${width}px;
    justify-content: ${justifyContent}
`;
export const DNDItem = styled.div<{
    position: PositionType;
    shelf: boolean | null;
}>`
  ${({ position, shelf = null }) => {
      return position[0] === 0 ? getShelfItemPositionStyle(position) : getTopShelfItemPositionsStyle(position, shelf)
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
export const ItemDragWrapper = styled(DNDItem)<{isDragging: boolean}>`
  z-index: 1;
  width: ${DRAG_SIZE}rem;
  height: ${DRAG_SIZE}rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  /* В момент перетаскиывания скрываем элемент */
  visibility: ${(props) => (props.isDragging ? "hidden" : "visible")};
`;

export const ItemDropWrapper = styled(DNDItem)`
  width: ${DROP_WIDTH}rem;
  height: ${DROP_HEIGHT}rem;
`;
export const ShelfWrapper = styled(DNDItem)`
  width: 9.2rem;
  height: 1.95rem;
`;
export const NumberWrapper = styled.div`
  position: absolute;
  color: white;
  padding-left: .2em;
  font-size: 65px;
  z-index: 1;
  top: 30px;
  left: 30px;
  &:before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    right: 0;
    padding-left: .2em;
    -webkit-text-stroke: .17em #242546;
    z-index: -1;
  }
`;
export const Title = styled.div`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  z-index: 1;
  position: relative;
  top: 2rem;
`;
export const WinWindow = styled.img`
  width: 900px;
`
export const WinWindowWrapper = styled.div`
  width: 1130px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  backdrop-filter: blur(4px);
  position: absolute;
  z-index: 2;
`
export const Button = styled(Btn)`
  position: absolute;
  border-radius: 21px;
  cursor: pointer;
  border: none;
  background-color: #2bd600;
  color: white;
  font-weight: bold;
`
export const SettingsWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  background: url('/background-stars.jpg') no-repeat center center;
  background-size: cover;
  width: 1130px;
  height: 100vh;
`
export const ItemsCount = styled(Slider)`
  top: 285px;
  left: 380px;
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
  top: 453px;
  left: 299px;
  width: 532px;
`