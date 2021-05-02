import { IConnect, IMessage, IShot } from "common/interface";
import { wsSend } from "components/general/common";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageAC, SET_WEBSOCKET_CONNECT } from "store/chat-reducers/chat-reducer";
import { getWebSocketConnection } from "store/chat-reducers/chat-selectors";
import { sendShotAC, initMatrixAC } from "store/sea-battle-reducers/sea-battle-reducer";
import { SeaBattleWindow } from "../components/sea-battle/sea-battle-window";

export const SeaBattlePage = () => {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    const socket: WebSocket = useSelector(getWebSocketConnection);

    if (!socket) {
        dispatch({ type: SET_WEBSOCKET_CONNECT });
    }


    useEffect(() => {
        //проинициализируем обе матрицы
        dispatch(initMatrixAC(1));
        dispatch(initMatrixAC(2));
    }, [])

    //установка сокет соединения
    const setConnection = () => {
        console.log('setConnection');

        let newConnect: IConnect = {
            userId: auth.userId,
            type: 'connect'
        }
        wsSend(socket, newConnect);
    }

    //установка сообщений в стейт
    const sendShot = (e: any) => {
        dispatch(sendShotAC(JSON.parse(e.data)));
    }

    const recieveShot = (e: any) => {
       //console.log(JSON.parse(e.data));
       //dispatch(recieveShotAC(JSON.parse(e.data)));
    }

    //подписки сокета
    useEffect(() => {
        console.log('useEffect auth');
        if (socket !== null) {
            socket.addEventListener("open", setConnection);
            socket.addEventListener("message", sendShot);
            socket.addEventListener("message", recieveShot);
        }
        return () => {
            socket.removeEventListener("open", setConnection, false);
            socket.addEventListener("message", sendShot);
            socket.addEventListener("message", recieveShot);
        }
    }, [auth])


    return (
        <div className="sea-battle_main">
            <SeaBattleWindow affil={1} socket={socket} />
            <SeaBattleWindow affil={2} socket={socket} />
        </div>
    )
}