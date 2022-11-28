import {useEffect, useState} from "react";
import styles from '../styles/Board.module.scss'
import Coockie1 from "../components/ComponentsSVG/Coockie1";
import Coockie2 from "../components/ComponentsSVG/Coockie2";
import Coockie3 from "../components/ComponentsSVG/Coockie3";
import Coockie5 from "../components/ComponentsSVG/Coockie5";
import Item from "../components/Item";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {items, ShelvesEnum} from "../constants";
import ItemDrop from "../components/ItemDrop";
import ItemDrag from "../components/ItemDrag";
import { observer } from "mobx-react-lite";
import Playground from "../components/Playground";


const Board = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Playground />
        </DndProvider>
    );
};

export default observer(Board);