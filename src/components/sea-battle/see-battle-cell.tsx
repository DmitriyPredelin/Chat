import { CellType, ICell, IShot } from "common/interface";
import { wsSend } from "components/general/common";
import { useWebSocket } from "context/WebsocketContext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCellClickAC, setDblCellClickAC } from "store/sea-battle-reducers/sea-battle-reducer";

interface ISeeBattleCellProps {
    setDown: React.Dispatch<React.SetStateAction<boolean>>,
    down: boolean,
    affil: number,
    cell: ICell,
    setstate: React.Dispatch<React.SetStateAction<string>>,
    shotCells: React.MutableRefObject<string[]>,
    countInShip: number,
    setCountInShip: React.Dispatch<React.SetStateAction<number>>,
    shipsArray : React.MutableRefObject<number[]>
}

export const SeeBattleCell = ({ setDown, down, affil, cell, setstate, shotCells, countInShip, setCountInShip, shipsArray }: ISeeBattleCellProps) => {
    const classNames = require("classnames");
    const dispatch = useDispatch();
    const socket = useWebSocket();

    let style: string = classNames(
        "sea-battle__cell",
        { "dash": cell.type === CellType.near },
        { "mine": affil === 1 },
        { "enemy": affil === 2 },
        { "ship": cell.type === CellType.ship },
        { "empty": cell.type === CellType.empty },
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
        dispatch(setCellClickAC(cell, affil, down));

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
            setCountInShip(prev => prev + 1);
            toDoClick();
            setstate(cell.id);
        }
    }

    const mouseDown = () => {
        setDown(true);
        toDoClick();
        setCountInShip(prev => prev + 1);
    }

    const mouseDblClick = () => {
        //dispatch(setDblCellClickAC(cell, affil));
    }


    const mouseUp = () => {
        setDown(false);
        //console.log(countInShip);
        shipsArray.current.push(countInShip);
        setCountInShip(0);
    }



    return (
        <div key={cell.id} className={style} onDoubleClick={mouseDblClick} onMouseOver={moveCell} onMouseDown={mouseDown} onMouseUp={mouseUp}>

        </div>
    )
}