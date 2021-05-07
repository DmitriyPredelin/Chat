import { Tabs } from 'antd';
import { Dispatch, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineFriendAC } from 'store/chat-reducers/friend-reducer';
import { IChatTab, IMessage } from '../../common/interface';
import { addMessageAC, removeTabAC, setActiveTabAC } from '../../store/chat-reducers/chat-reducer';
import { getActiveTabsKey, getChatTabs, getWebSocketConnection } from "../../store/chat-reducers/chat-selectors";
import { ChatPanel } from "./chat-panel";

export const ChatTabs = () => {

    //сокет соединение
    const dispatch: Dispatch<{}> = useDispatch();
    const socket: WebSocket = useSelector(getWebSocketConnection);

    //ключ активного таба
    const activeTabKey: string | undefined = useSelector(getActiveTabsKey);

    //установка сообщений в стейт
    const setMessage = (e: any) => {
        const incomMessage: IMessage = JSON.parse(e.data);
        let isSend: number = 0;

        switch (incomMessage.type) {
            case "text":
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
                dispatch(addMessageAC(newMessage));
                break;

            case "online_friend":
                //console.log(JSON.parse(e.data));
                dispatch(setOnlineFriendAC(JSON.parse(e.data).userId));
        }
    }

    const timer = useRef<any>();

    //подписки сокета
    useEffect(() => {
        if (socket && socket !== null) {
            socket.addEventListener("message", setMessage);
            /*timer.current = setInterval(() => {
                let newMessage = {
                    id: auth.userId,
                    type: "online_friend"
                }
                console.log(newMessage);
                wsSend(socket, newMessage);
            }, 3000);*/
            return () => {
                clearInterval(timer.current)
                socket.removeEventListener("message", setMessage, false);
            }
        }

    }, [socket])

    useEffect(() => { }, [activeTabKey])

    const { TabPane } = Tabs;
    const tabs = useSelector(getChatTabs);

    //процедура смены таба
    const changeTab = (activeKey: string | undefined) => {
        dispatch(setActiveTabAC(activeKey));
    }

    //закрытие таба
    const editTab = (targetKey: any, action: "add" | "remove") => {
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
                <TabPane tab={tab.name} key={tab.key}>
                    <ChatPanel tabKey={parseInt(tab.key)} socket={socket} />
                </TabPane>
            ))}
        </Tabs>
    )

}