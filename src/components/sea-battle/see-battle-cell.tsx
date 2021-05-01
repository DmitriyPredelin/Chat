import { CellType, ICell } from "common/interface";
import { useDispatch } from "react-redux";
import { setCellClickAC } from "store/see-battle-reducers/see-battle-reducer";

export const SeeBattleCell = (props: any) => {
    const classNames = require("classnames");

    const setDown = props.setDown;
    const down = props.down;
    const cell: ICell = props.cell;
    const affil = props.affil
    const dispatch = useDispatch();

    let style: string = classNames(
        "sea-battle__cell",
        "unselectable",
        { "clicked": cell.type === CellType.ship },
        { "non-clicked": cell.type === CellType.empty }
    );
    
    const toDoClick = () => {
        dispatch(setCellClickAC(cell, affil));
    }

    const moveCell = (e: any) => {
        if (down) {
            toDoClick();
        }
    }

    const mouseDown = (e: any) => {
        setDown(true)
        toDoClick();
    }

    const mouseDblClick = (e: any) => {
        toDoClick();
    }


    return (
        <div key={cell.id} className={style} /*onDoubleClick={mouseDblClick}*/ onMouseOver={moveCell} onMouseDown={mouseDown} onMouseUp={() => setDown(false)}>

        </div>
    )
}