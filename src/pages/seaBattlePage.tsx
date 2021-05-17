import { useWebSocket } from "context/WebsocketContext";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMatrixAC, sendShotAC } from "store/sea-battle-reducers/sea-battle-reducer";
import { getMatrixInit } from "store/sea-battle-reducers/see-battle-selector";
import { SeaBattleWindow } from "../components/sea-battle/sea-battle-window";

export const SeaBattlePage = () => {

    const socket = useWebSocket();
    const dispatch = useDispatch();
    
    const isInit = useSelector(getMatrixInit);

    useEffect(() => {
        if (!isInit) {
            //проинициализируем обе матрицы
            dispatch(initMatrixAC(1));
            dispatch(initMatrixAC(2));
        }

    }, [socket])

    const sendShot = useCallback((e: any) => {
        if (JSON.parse(e.data).type !== "status") {
            dispatch(sendShotAC(JSON.parse(e.data)));
        }
    }, [])

    //подписки сокета
    useEffect(() => {
        if (socket && socket !== null) {
            //установка сообщений в стейт
            socket.addEventListener("message", sendShot);

            return () => {
                socket.addEventListener("message", sendShot);
            }
        }
    }, [socket])

    return (
        <div className="sea-battle_main">
            <SeaBattleWindow affil={1} />
            <SeaBattleWindow affil={2} />
        </div>
    )
}