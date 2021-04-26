import { useSelector } from "react-redux";
import { IUser } from "../../common/interface";
import { getActiveFriend } from "../../store/selectors";
import { FacebookOutlined, CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Drawer } from "antd";
import { wsURL } from "../../API/API";
import { useState } from "react";



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
    const { clickExpanderIcon, expand } = props;
    let friend: IUser = useSelector(getActiveFriend);

    const sendMessage = () => {
        /*const ws = new WebSocket(wsURL);
        ws.onopen = () => {
            console.log("Подключение установлено");
        }*/
    }


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
                        <Button className="friend-profile__message-button_send" block type="primary" onClick={sendMessage}>Cообщение</Button>
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