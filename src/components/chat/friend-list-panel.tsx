import { Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { addTabAC, setActiveChatAC, setActiveTabAC } from "../../store/chat-reducers/chat-reducer";
import { getFriendsLoading, getUndeliveredMessage } from "../../store/chat-reducers/chat-selectors";
import { setActiveFriendAC, setDriwerFriendAC } from "../../store/chat-reducers/friend-reducer";
import { FriendItem } from "./friend-item";

export const FriendListPanel = (props: any) => {

    const friends = props.panelList;
    const setProfileVisible = props.setProfileVisible;
    const loading = useSelector(getFriendsLoading);
 
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
                return (
                    <FriendItem friend={friend} count={record.count} showDriwer={showDriwer} setActiveFriend={setActiveFriend} expanded={props.expanded}/>
                )
            })}

        </div>
    )
}

 /*<Badge backGround={"#52c41a"} position={"rightBot"}/>*/
/*<div className={friendOnlineStatus}></div>*/


/* <List.Item className="friend" key={friend.id} onClick={() => setActiveFriend(friend.id, friend.name)}>
                        <List.Item.Meta
                            avatar={
                                <>
                                    <Avatar src={friend.src} className="friend__avatar" size={48} />
                                    <Badge backGround={"#FF4D4F"} position={"rightTop"} value={record.count.toString()}/>
                                   
                                </>
                            }
                            title={friend.name}
                        />
                        <CaretRightOutlined style={{ marginRight: '0px' }} onClick={() => showDriwer(friend.id)} />
                    </List.Item>*/