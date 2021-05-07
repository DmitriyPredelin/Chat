import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMatrixAC, resetMatrixAC } from "store/sea-battle-reducers/sea-battle-reducer";
import { getMatrix, getMatrixInit } from "store/sea-battle-reducers/see-battle-selector";
import { ICell } from "../../common/interface";
import { SeeBattleCell } from "./see-battle-cell";
import { Spin } from 'antd';

type ISeaBattleWindowProps = {
    affil: number,
    socket: WebSocket
}
export const SeaBattleWindow: React.FC<ISeaBattleWindowProps> = ({ affil, socket }) => {
    const dispatch = useDispatch();
    const [down, setDown] = useState(false);
    const [state, setstate] = useState("");
    const shotCells = useRef<Array<string>>([]);


    let matrix = useSelector(getMatrix(affil));
    const matrixIsInit = useSelector(getMatrixInit);

    const clickReset = () => {
        setDown(false);
        dispatch(resetMatrixAC(affil));
        dispatch(initMatrixAC(affil));
    }

    if (!matrixIsInit) {
        return <Spin size="large" />
    }

    return (
        <div className="sea-battle__window">
            <div className="sea-battle__marine unselectable" onMouseLeave={() => setDown(false)}>
                {matrix.map((row: ICell[]) => {
                    return row.map((cell: ICell) => {
                        return <SeeBattleCell
                            key={cell.id}
                            cell={cell}
                            setDown={setDown}
                            down={down}
                            affil={affil}
                            setstate={setstate}
                            socket={socket}
                            shotCells={shotCells} />
                    })
                })}
            </div>
            <button onClick={clickReset}>Очистить</button>
        </div>
    )
}