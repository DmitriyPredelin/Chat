import { useDispatch, useSelector } from "react-redux";
import { getChatTabs, getFriendsLoading, getUndeliveredMessage } from "../../store/selectors";
import { Avatar, Spin, List, Badge } from 'antd';
import { setActiveFriendAC, setDriwerFriendAC } from "../../store/friend-reducer";
import { addTabAC, setActiveChatAC, setActiveTabAC } from "../../store/chat-reducer";
import { IChatTab, IUser } from "../../common/interface";
import { UserOutlined } from "@ant-design/icons";

export const FriendListPanel = (props: any) => {
    const friends = props.panelList;
    const setProfileVisible = props.setProfileVisible;
    const loading = useSelector(getFriendsLoading);
    const tabs: Array<IChatTab> = useSelector(getChatTabs);

    const dispatch = useDispatch();
    const setActiveFriend = (friendId: number, friendName: string) => {

        //установим активного друга
        dispatch(setActiveFriendAC(friendId));

        //установим признак активного чата 
        dispatch(setActiveChatAC);

        //добавим вкладку в чат
        if (tabs.findIndex((tab: IChatTab) => {
            return tab.key === friendId.toString()
        }) === -1) {
            dispatch(addTabAC(friendId.toString(), friendName));
            dispatch(setActiveTabAC(friendId.toString()))
        }
    }

    const arRecordIdCountUndelivered: Array<{
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
                let record: { id: number, count: number } | undefined = arRecordIdCountUndelivered.find((record: { id: number; count: number; }) => {
                    if (record.id === friend.id) {
                        return record
                    }
                })

                return (
                    <List.Item className="friend" key={friend.id} onClick={() => setActiveFriend(friend.id, friend.name)}>
                        <div className="friend__online-status"></div>
                        <List.Item.Meta
                            avatar={
                                <Badge count={record?.count} size="small" showZero={false}>
                                    <Avatar src={friend.src} className="friend__avatar" size={48} />
                                </Badge>
                            }
                            title={friend.name}
                        />
                        <UserOutlined onClick={() => showDriwer(friend.id)} />
                    </List.Item>
                )
            })}
        </div>
    )
}