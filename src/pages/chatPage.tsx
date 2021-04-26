import { FriendListPanel } from "../components/chat/friend-list-panel";
import { ChannelPanel } from "../components/chat/channel-panel";
import { WrapperPanel } from '../components/wrapper/wrapper-panel';
import { getChannels, getFriends } from '../store/selectors';
import { useDispatch } from 'react-redux';
import { setChannelsSagaAC } from '../store/channel-reducer';
import { useEffect, useState, useContext } from 'react';
import { SET_FRIENDS_SAGA } from '../store/friend-reducer';
import { ChatTabs } from '../components/chat/chat-tabs';
import { DrawerPanel } from '../components/chat/drawer'
import { AuthContext } from "../context/AuthContext";


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