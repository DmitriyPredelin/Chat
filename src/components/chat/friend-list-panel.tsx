import { CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, Spin } from 'antd';
import { wsSend } from "components/general/common";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { addTabAC, setActiveChatAC, setActiveTabAC } from "../../store/chat-reducers/chat-reducer";
import { getFriendsLoading, getUndeliveredMessage, getWebSocketConnection } from "../../store/chat-reducers/chat-selectors";
import { setActiveFriendAC, setDriwerFriendAC } from "../../store/chat-reducers/friend-reducer";

export const FriendListPanel = (props: any) => {
    const auth = useContext(AuthContext)
    const friends = props.panelList;
    const setProfileVisible = props.setProfileVisible;
    const loading = useSelector(getFriendsLoading);
    const classNames = require("classnames");
    const socket: WebSocket = useSelector(getWebSocketConnection);

    const dispatch = useDispatch();
    const setActiveFriend = (friendId: number, friendName: string) => {
        //установим активного друга
        dispatch(setActiveFriendAC(friendId));

        //установим признак активного чата 
        dispatch(setActiveChatAC);

        //добавим вкладку в чат
        dispatch(addTabAC(friendId.toString(), friendName));
        dispatch(setActiveTabAC(friendId.toString()))
    }

    const arRecordUndelivered: Array<{
        id: number;
        count: number;
    }> = useSelector(getUndeliveredMessage);

    const timer = useRef<any>();

    useEffect(() => {
        timer.current = setInterval(() => {
            let newMessage = {
                id: auth.userId,
                type: "online_friend"
            }
            console.log(newMessage);
            wsSend(socket, newMessage);
        }, 3000)
        return () => {
            clearInterval(timer.current)
        }

    }, [auth]);

    let height = "0px";
    if (props.expanded) {
        height = "400px"
    }

    const showDriwer = (driwerFriendId: number) => {
        dispatch(setDriwerFriendAC(driwerFriendId));
        setProfileVisible(true);
    }

    if (loading) {
        return <Spin size="large" />
    }

    return (
        <div className={props.expandedStyles} style={{ height: height }}>
            { friends.map((friend: IUser) => {
                let record: { id: number, count: number } | undefined = arRecordUndelivered.find((record: { id: number; count: number; }) => {
                    if (record.id === friend.id) {
                        return record
                    }
                })
                if (!record) {
                    record = {
                        id: friend.id,
                        count: 0
                    }
                }

                let friendOnlineStatus: string = classNames(
                    { "friend__online-status": friend.isOnline },
                    { "friend__offline-status": !friend.isOnline }
                );

                return (

                    <List.Item className="friend" key={friend.id} onClick={() => setActiveFriend(friend.id, friend.name)}>
                        <div className={friendOnlineStatus}></div>
                        <List.Item.Meta
                            avatar={
                                <Badge count={record.count} size="small" showZero={false}>
                                    <Avatar src={friend.src} className="friend__avatar" size={48} />
                                </Badge>
                            }
                            title={friend.name}
                        />
                        <CaretRightOutlined style={{ marginRight: '0px' }} onClick={() => showDriwer(friend.id)} />
                    </List.Item>
                )
            })}

        </div>
    )
}