import { IUser } from "common/interface";
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge } from "./badge"


type FriendItemProps = {
    friend: IUser;
    count: number;
    showDriwer: (id: number) => void;
    setActiveFriend: (id: number, name: string) => void;
    expanded: boolean;
}

export const FriendItem: React.FC<FriendItemProps> = (props) => {
    const { friend, count, showDriwer, setActiveFriend, expanded } = props;

    return (
        <div key={friend.id} className="friend" onClick={() => setActiveFriend(friend.id, friend.name)}>
            <div className="friend__avatar-border">
                <img className="friend__avatar" src={friend.src} />
            </div>
            <Badge backGround={"#FF4D4F"} position={"rightTop"} value={count.toString()} hidden={!expanded} />
            {friend.isOnline ?
                <Badge backGround={"#52C41A"} position={"rightBot"} hidden={!expanded} /> :
                <></>}


            <div className="friend__name">{friend.name}</div>
            <CaretRightOutlined style={{ marginRight: '0px' }} onClick={() => showDriwer(friend.id)} />
        </div>
    )
}
