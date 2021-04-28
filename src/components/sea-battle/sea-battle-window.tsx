import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMatrixAC, INIT_MATRIX, resetMatrixAC, RESET_MATRIX } from "store/see-battle-reducers/see-battle-reducer";
import { getMatrix, getMatrixInit } from "store/see-battle-reducers/see-battle-selector";
import { ICell } from "../../common/interface";
import { SeeBattleCell } from "./see-battle-cell";


const CellRow = (props: any) => {

    let row: ICell[] = props.row;
    let setDown = props.setDown;
    let ret = row.map((cell: ICell) => {
        return <SeeBattleCell key={cell.id} cell={cell} setDown={setDown} down={props.down}/>
    })
    return <>{ret}</>;
}

export const SeaBattleWindow = () => {
    const dispatch = useDispatch();
    const [down, setDown] = useState(false);
    const [reset, setReset] = useState(false);

    const matrixIsInit = useSelector(getMatrixInit);
    
    useEffect(() => {
        if (!matrixIsInit) {
            dispatch({type: INIT_MATRIX});
        }
    }, [])

    const matrix = useSelector(getMatrix);
    

    const clickReset = () => {
        setDown(false);
        dispatch({type: RESET_MATRIX});
        dispatch({type: INIT_MATRIX});
    }

    if (!matrixIsInit) {
        return <></>
    }



    return (
        <div className="sea-battle__window">
            <div className="sea-battle__marine" onMouseLeave={() => setDown(false)}>
                {matrix.map((row: ICell[], index: number) => {
                    return <CellRow key={index} row={row} setDown={setDown} down={down}/>
                })}
            </div>
            <button onClick={clickReset}>Очистить</button>
        </div>
    )
}