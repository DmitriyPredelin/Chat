import { CaretDownOutlined, FacebookOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { IUser } from '../../common/interface';
import { getDriwerFriend } from '../../store/chat-reducers/chat-selectors';


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
                Позвать рисовать</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.yandex.ru">
                Удалить из друзей</a>
        </Menu.Item>
    </Menu>
)

export type UserInfoItem = {
    title: string;
    content: string;
}

export type DrawerPanelProps = {
    onCloseProfile: () => void,
    profileVisible: boolean
}

const FriendInfoItem: React.FC<UserInfoItem> = ({ title, content }) => {
    return (
        <>
            <div>{title}</div>
            <div className="friend-profile__friend-item">{content} </div>
        </>
    )
}

export const DrawerPanel: React.FC<DrawerPanelProps> = ({ onCloseProfile, profileVisible }) => {
    const driwerFriend: IUser | undefined = useSelector(getDriwerFriend);
    const sendMessage = () => {

    }

    if (!driwerFriend) {
        return <></>
    }
    return (
        <Drawer
            title="Профиль"
            placement="right"
            closable={true}
            onClose={onCloseProfile}
            visible={profileVisible}
            getContainer={false}
            style={{ position: 'absolute', overflow: "hidden" }}
        >
            <img className="friend-profile__img" src={driwerFriend.src} alt="" />
            <div className="friend-profile__content">
                <div className="friend-profile__content-top">
                    <div className="friend-profile__friend-name">{driwerFriend.name} </div>
                    <div className="friend-profile__friend-status">{driwerFriend.user_status} </div>
                    <div className="friend-profile__social-panel">
                        <Button ghost type="primary" shape="circle" icon={<FacebookOutlined />}></Button>
                    </div>
                    <div className="friend-profile__message-button">
                        <Button className="friend-profile__message-button_send" type="primary" onClick={sendMessage}>Cообщение</Button>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button type="primary" >
                                <CaretDownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="friend-profile__info">
                        <FriendInfoItem title="Email" content={driwerFriend.email} />
                        <FriendInfoItem title="Skype" content={driwerFriend.skype || "не указан"} />
                    </div>
                </div>
            </div>
        </Drawer>
    )
}