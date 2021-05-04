import { CalendarOutlined, FormatPainterOutlined, LogoutOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import { SeeBarkIcon } from "../sea-battle/nav-icon";

export const SidePanel = (props: any) => {
    return (
        <div className="nav-left">
            <div className="button-panel_main">
                <NavLink to="/chat">
                    <Tooltip placement="left" overlay="Чат" mouseEnterDelay={0.5}>
                        <MessageOutlined className="button-panel__icons" />
                    </Tooltip>
                </NavLink>
                <NavLink to="/calendar">
                    <Tooltip placement="left"overlay="Календарь" mouseEnterDelay={0.5}>
                        <CalendarOutlined className="button-panel__icons" />
                    </Tooltip>
                </NavLink>
                <NavLink to="/paint">
                    <Tooltip placement="left"overlay="Рисовать" mouseEnterDelay={0.5}>
                        <FormatPainterOutlined className="button-panel__icons" />
                    </Tooltip>
                </NavLink>
                <NavLink to="sea_battle">
                    <SeeBarkIcon />
                </NavLink>
            </div>
            <div className="button-panel_additional">
                <NavLink to="/profile">
                    <Tooltip placement="left"overlay="Профиль" mouseEnterDelay={0.5}>
                        <UserOutlined className="button-panel__icons" />
                    </Tooltip>
                </NavLink>
                <Tooltip placement="left"overlay="Выйти из чатика" mouseEnterDelay={0.5}>
                    <LogoutOutlined className="button-panel__icons" onClick={props.logout} />
                </Tooltip>
            </div>
        </div >
    )
}