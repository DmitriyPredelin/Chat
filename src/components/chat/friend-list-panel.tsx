import { CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { addTabAC, setActiveChatAC, setActiveTabAC } from "../../store/chat-reducers/chat-reducer";
import { getFriendsLoading, getUndeliveredMessage } from "../../store/chat-reducers/chat-selectors";
import { setActiveFriendAC, setDriwerFriendAC } from "../../store/chat-reducers/friend-reducer";

type FriendListPanelProps = {
    friends: [],
    setProfileVisible: React.Dispatch<React.SetStateAction<boolean>>,
    expanded: boolean,
    expandedStyles: string
}


export const FriendListPanel = (props: any) => {

    const friends = props.panelList;
    const setProfileVisible = props.setProfileVisible;
    const loading = useSelector(getFriendsLoading);
    const classNames = require("classnames");

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
                let record: { id: number, count: number } | undefined = arRecordUndelivered.find((rec: { id: number; count: number }) => {
                    return rec.id === friend.id
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
                        <List.Item.Meta
                            avatar={
                                <Badge count={record.count} size="small" showZero={false} >
                                    <Avatar src={friend.src} className="friend__avatar" size={48} />
                                    <span className={friendOnlineStatus}></span>
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

/*<div className={friendOnlineStatus}></div>*/