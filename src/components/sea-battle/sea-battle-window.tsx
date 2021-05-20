import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMatrixAC, resetMatrixAC } from "store/sea-battle-reducers/sea-battle-reducer";
import { getMatrix, getMatrixInit } from "store/sea-battle-reducers/see-battle-selector";
import { ICell } from "../../common/interface";
import { SeeBattleCell } from "./see-battle-cell";
import { Spin } from 'antd';

type ISeaBattleWindowProps = {
    affil: number
}

export const SeaBattleWindow: React.FC<ISeaBattleWindowProps> = ({ affil }) => {
    const dispatch = useDispatch();
    const [down, setDown] = useState(false);
    const [state, setstate] = useState("");
    const shotCells = useRef<Array<string>>([]);
    
    const [countInShip, setCountInShip] = useState(0);
    const shipsArray = useRef<Array<number>>([]);


    let matrix = useSelector(getMatrix(affil));
    const matrixIsInit = useSelector(getMatrixInit);

    const clickReset = () => {
        setDown(false);
        dispatch(resetMatrixAC(affil));
        dispatch(initMatrixAC(affil));
    }

    const checkMarine = () => {
        const standardValues = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        
        if (shipsArray.current.sort().join() == standardValues.join()) {
            console.log('ALL OK')
            shipsArray.current = [];
        } else {
            console.log('FAIL')
        }
    }

    const startGame = () => {
        checkMarine();
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
                            shotCells={shotCells}
                            countInShip={countInShip}
                            setCountInShip={setCountInShip}
                            shipsArray={shipsArray}
                            />
                    })
                })}
            </div>
            <button onClick={clickReset}>Очистить</button>
            <button onClick={startGame}>Готово!</button>
        </div>
    )
}