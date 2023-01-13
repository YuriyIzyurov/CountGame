import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { observer } from "mobx-react-lite";
import Playground from "../components/DragAndDropGame/Playground";


const Board = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Playground />
        </DndProvider>
    );
};

export default observer(Board);