import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMatrixAC, resetMatrixAC } from "store/see-battle-reducers/see-battle-reducer";
import { getMatrix, getMatrixInit } from "store/see-battle-reducers/see-battle-selector";
import { ICell } from "../../common/interface";
import { SeeBattleCell } from "./see-battle-cell";

interface ICellRowProps  {
    row : ICell[],
    setDown : React.Dispatch<React.SetStateAction<boolean>>,
    down : boolean,
    affil : number
}

interface ISeaBattleWindowProps  {
    affil : number
}

const CellRow = ({row, setDown, down, affil} : ICellRowProps) => {
    return <>
        {row.map((cell: ICell) => {
            return <SeeBattleCell key={cell.id} cell={cell} setDown={setDown} down={down} affil={affil}/>
        })}
    </>;
}

export const SeaBattleWindow = ({affil} : ISeaBattleWindowProps) => {
    const dispatch = useDispatch();
    const [down, setDown] = useState(false);
    let matrix = [];
    

    useEffect(() => {
        dispatch(initMatrixAC(affil));
    }, [])

    matrix = useSelector(getMatrix(affil));
    const matrixIsInit = useSelector(getMatrixInit);

    const clickReset = () => {
        setDown(false);
        dispatch(resetMatrixAC(affil));
        dispatch(initMatrixAC(affil));
    }

    if (!matrixIsInit) {
        return <></>
    }

    return (
        <div className="sea-battle__window">
            <div className="sea-battle__marine" onMouseLeave={() => setDown(false)}>
                {matrix.map((row: ICell[], index: number) => {
                    return <CellRow key={index} row={row} setDown={setDown} down={down} affil={affil}/>
                })}
            </div>
            <button onClick={clickReset}>Очистить</button>
        </div>
    )
}