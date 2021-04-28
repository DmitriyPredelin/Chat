import { CaretDownOutlined, FacebookOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from "antd";
import { useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { getActiveFriend } from '../../store/chat-reducers/chat-selectors';


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

export const FriendInfoPanel = (props: any) => {
    let friend: IUser = useSelector(getActiveFriend);

    if (!friend) {
        return <></>
    }

    return (
        <>
            <img className="friend-profile__img" src={friend.src} alt="" />
            <div className="friend-profile__content">
                <div className="friend-profile__content-top">
                    <div className="friend-profile__friend-name">{friend.name} </div>
                    <div className="friend-profile__friend-status">{friend.user_status} </div>
                    <div className="friend-profile__social-panel">
                        <Button ghost type="primary" shape="circle" icon={<FacebookOutlined />}></Button>
                    </div>
                    <div className="friend-profile__message-button">
                        <Button className="friend-profile__message-button_send" block type="primary">Cообщение</Button>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button type="primary" >
                                <CaretDownOutlined />
                            </Button>
                        </Dropdown>

                    </div>
                    <div className="friend-profile__info">
                        <div>Email</div>
                        <div className="friend-profile__friend-name">{friend.email} </div>
                        <div>Skype</div>
                        <div className="friend-profile__friend-name">{friend.skype || "не указан"} </div>
                    </div>
                </div>

            </div>

        </>
    )
}


/*<div className="friend-profile__content-bot">
                    {expand ?
                        <CaretLeftOutlined onClick={clickExpanderIcon} /> :
                        <CaretRightOutlined onClick={clickExpanderIcon} />}
                </div>*/