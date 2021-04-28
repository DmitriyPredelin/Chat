import { CellType, ICell } from "common/interface";
import { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { setCellClickAC } from "store/see-battle-reducers/see-battle-reducer";

export const SeeBattleCell = (props: any) => {
    const classNames = require("classnames");
    const [click, setClick] = useState(false);

    //const [up, setUp] = useState(false);
    const setDown = props.setDown;
    const down = props.down;
    const cell: ICell = props.cell;
    const dispatch = useDispatch();

    let style: string = classNames(
        "sea-battle__cell",
        { "clicked": cell.type === CellType.ship },
        { "non-clicked": cell.type === CellType.empty }
    );


    const moveCell = (e: any) => {
        if (down) {
            setClick(true);
            dispatch(setCellClickAC(CellType.ship, cell.row, cell.col));
        }
    }

    const clickCell = (e: any) => {
        setClick(true);
        dispatch(setCellClickAC(CellType.ship, cell.row, cell.col));
    }


    /*onClick={clickCell} */
    return (
        <div key={cell.id} className={style} onClick={clickCell} onMouseMove={moveCell} onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)}>

        </div>
    )
}