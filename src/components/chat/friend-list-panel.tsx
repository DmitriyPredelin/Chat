import { CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { addTabAC, setActiveChatAC, setActiveTabAC } from "../../store/chat-reducers/chat-reducer";
import { setActiveFriendAC, setDriwerFriendAC } from "../../store/chat-reducers/friend-reducer";
import { getFriendsLoading, getUndeliveredMessage } from "../../store/chat-reducers/chat-selectors";

export const FriendListPanel = (props: any) => {
    const friends = props.panelList;
    const setProfileVisible = props.setProfileVisible;
    const loading = useSelector(getFriendsLoading);

    const dispatch = useDispatch();
    const setActiveFriend = (friendId: number, friendName: string) => {
        console.log('setActiveFriend');

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

    if (loading) {
        return <Spin size="large" />
    }

    let height = "0px";
    if (props.expanded) {
        height = "400px"
    }

    const showDriwer = (driwerFriendId: number) => {
        dispatch(setDriwerFriendAC(driwerFriendId));
        setProfileVisible(true);
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

                return (
                    <List.Item className="friend" key={friend.id} onClick={() => setActiveFriend(friend.id, friend.name)}>
                        <div className="friend__online-status"></div>
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