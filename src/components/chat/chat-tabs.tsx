import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTabsKey, getChatTabs, getWebSocketConnection } from '../../store/selectors';
import { addMessageAC, removeTabAC, setActiveTabAC, SET_WEBSOCKET_CONNECT } from '../../store/chat-reducer';
import { ChatPanel } from "./chat-panel"
import { IChatTab, IConnect, IMessage } from '../../common/interface';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const ChatTabs = (props: any) => {

    const auth = useContext(AuthContext);

    //сокет соединение
    const dispatch = useDispatch();
    const socket: WebSocket = useSelector(getWebSocketConnection);

    if (!socket) {
        dispatch({ type: SET_WEBSOCKET_CONNECT });
    }

    //ключ активного таба
    const activeTabKey = useSelector(getActiveTabsKey);

    //установка сообщений в стейт
    const setMessage = (e: any) => {
        const incomMessage: IMessage = JSON.parse(e.data);
        let isSend: number = 0;

        if (activeTabKey && parseInt(activeTabKey) === incomMessage.from) {
            isSend = 1;
        }


        const newMessage: IMessage = {
            id: 1,
            text: incomMessage.text,
            from: incomMessage.from,
            fromName: incomMessage.fromName,
            to_user: incomMessage.to_user,
            to_channel: 0,
            is_send: isSend,
            type: 'text',
            timeStamp: Date.now(),
            author_src: incomMessage.author_src
        }
        console.log(incomMessage);
        dispatch(addMessageAC(newMessage));
        //return setItems((prevItems: Array<IMessage>) => [...prevItems, JSON.parse(e.data)]);
    }

    //установка сокет соединения
    const setConnection = () => {
        console.log('setConnection');

        let newConnect: IConnect = {
            userId: auth.userId,
            type: 'connect'
        }
        wsSend(newConnect);
    }

    //подписки сокета
    useEffect(() => {
        console.log('useEffect auth');

        if (socket !== null) {
            socket.addEventListener("open", setConnection)
            socket.addEventListener("message", setMessage);
        }

        return () => {
            socket.removeEventListener("message", setMessage, false);
            socket.removeEventListener("open", setConnection, false);
        }
    }, [auth])

    useEffect(() => {
        console.log('useEffect activeTabKey');
    }, [activeTabKey])

    //процедура отправки
    const wsSend = function (data: {}) {
        if (socket !== null) {
            if (!socket.readyState) {
                setTimeout(function () {
                    wsSend(data);
                }, 100);
            } else {
                console.log(JSON.stringify(data));
                socket.send(JSON.stringify(data));
            }
        }
    };

    const { TabPane } = Tabs;
    const tabs = useSelector(getChatTabs);

    //процедура смены таба
    const changeTab = (activeKey: string | undefined) => {
        dispatch(setActiveTabAC(activeKey));
    }

    //закрытие таба
    const editTab = (targetKey: any, action: any) => {
        if (action === "remove") {
            dispatch(removeTabAC(targetKey));
        }
    }

    return (
        <Tabs
            hideAdd
            onChange={changeTab}
            activeKey={activeTabKey}
            type="editable-card"
            onEdit={editTab}
            tabPosition="top"
            tabBarGutter={0}
            animated={{ inkBar: false, tabPane: false }}
            style={{ height: "100%" }}
        >
            {tabs.map((tab: IChatTab) => (
                <TabPane  tab={tab.name} key={tab.key}>
                    <ChatPanel  wsSend={wsSend} tabKey={parseInt(tab.key)} />
                </TabPane>
            ))}
        </Tabs>
    )

}