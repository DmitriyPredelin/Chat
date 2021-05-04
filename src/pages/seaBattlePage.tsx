import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWebSocketConnection } from "store/chat-reducers/chat-selectors";
import { initMatrixAC, sendShotAC } from "store/sea-battle-reducers/sea-battle-reducer";
import { SeaBattleWindow } from "../components/sea-battle/sea-battle-window";

export const SeaBattlePage = () => {
    const dispatch = useDispatch();
    const socket: WebSocket = useSelector(getWebSocketConnection);

    useEffect(() => {
        //проинициализируем обе матрицы
        dispatch(initMatrixAC(1));
        dispatch(initMatrixAC(2));
    })

    //установка сообщений в стейт
    const sendShot = (e: any) => {
        dispatch(sendShotAC(JSON.parse(e.data)));
    }

    //подписки сокета
    useEffect(() => {
        if (socket && socket !== null) {
            socket.addEventListener("message", sendShot);

            return () => {
                socket.addEventListener("message", sendShot);
            }
        }
    }, [socket])


    return (
        <div className="sea-battle_main">
            <SeaBattleWindow affil={1} socket={socket} />
            <SeaBattleWindow affil={2} socket={socket} />
        </div>
    )
}