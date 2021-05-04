import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChannelPanel } from "../components/chat/channel-panel";
import { ChatTabs } from '../components/chat/chat-tabs';
import { DrawerPanel } from '../components/chat/drawer';
import { FriendListPanel } from "../components/chat/friend-list-panel";
import { WrapperPanel } from '../components/wrapper/wrapper-panel';
import { AuthContext } from "../context/AuthContext";
import { setChannelsSagaAC } from '../store/chat-reducers/channel-reducer';
import { getChannels, getFriends } from "../store/chat-reducers/chat-selectors";
import { SET_FRIENDS_SAGA } from '../store/chat-reducers/friend-reducer';


export const ChatPage = () => {

    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    //видимость профиля друга
    const [profileVisible, setProfileVisible] = useState(false)

    useEffect(() => {
        //установка списка каналов в стейт
        dispatch(setChannelsSagaAC);

        //установка списка друзей в стейт
        dispatch({ type: SET_FRIENDS_SAGA, profileId: auth.userId });
    }, [auth]);

    const onCloseProfile = () => {
        setProfileVisible(false)
    }

    return (
        <>
            <div className="nav-right">
                <WrapperPanel titleText={"КАНАЛЫ"} selector={getChannels}>
                    <ChannelPanel />
                </WrapperPanel>
                <WrapperPanel titleText={"ДРУЗЬЯ"} selector={getFriends}>
                    <FriendListPanel setProfileVisible={setProfileVisible} />
                </WrapperPanel>
            </div>
            <div className="center-area">
                <ChatTabs />
            </div>
            <DrawerPanel onCloseProfile={onCloseProfile} profileVisible={profileVisible} />
        </>
    )
}

