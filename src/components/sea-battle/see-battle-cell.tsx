import { CellType, ICell, IShot } from "common/interface";
import { wsSend } from "components/general/common";
import { useDispatch } from "react-redux";
import { setCellClickAC, setDblCellClickAC } from "store/sea-battle-reducers/sea-battle-reducer";

interface ISeeBattleCellProps {
    setDown: React.Dispatch<React.SetStateAction<boolean>>,
    down: boolean,
    affil: number,
    cell: ICell,
    setstate: React.Dispatch<React.SetStateAction<string>>,
    socket: WebSocket,
    shotCells: React.MutableRefObject<string[]>
}

export const SeeBattleCell = ({ setDown, down, affil, cell, setstate, socket, shotCells }: ISeeBattleCellProps) => {
    const classNames = require("classnames");
    const dispatch = useDispatch();

    let style: string = classNames(
        "sea-battle__cell",
        { "mine": affil === 1 },
        { "enemy": affil === 2 },
        { "ship": cell.type === CellType.ship },
        { "non-clicked": cell.type === CellType.empty },
        { "miss": cell.type === CellType.miss },
        { "shot": cell.type === CellType.shot }
    );

    if (cell.type === CellType.shot) {
        if (!shotCells.current.includes(cell.id)) {
            let newMessage: IShot = {
                cellId: cell.id,
                from: 1,
                to_user: 1,
                type: "kill"
            }
            wsSend(socket, newMessage);
            shotCells.current.push(cell.id);
        }
    }

    const toDoClick = () => {
        dispatch(setCellClickAC(cell, affil));

        //если это правая матрица - стреляем
        if (affil === 2) {
            let newMessage: IShot = {
                cellId: cell.id,
                from: 1,
                to_user: 1,
                type: "shot"
            }
            wsSend(socket, newMessage);
        }
    }

    const moveCell = () => {
        if (down && affil === 1) {
            toDoClick();
            setstate(cell.id);
        }
    }

    const mouseDown = () => {
        setDown(true);
        toDoClick();
    }

    const mouseDblClick = () => {
        dispatch(setDblCellClickAC(cell, affil));
    }



    return (
        <div key={cell.id} className={style} onDoubleClick={mouseDblClick} onMouseOver={moveCell} onMouseDown={mouseDown} onMouseUp={() => setDown(false)}>

        </div>
    )
}