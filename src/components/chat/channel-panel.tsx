import { useDispatch } from "react-redux";
import { setActiveChannelAC } from "../../store/channel-reducer";
import { Button } from 'antd';
import {EditTwoTone} from '@ant-design/icons';

export const ChannelPanel = (props: any) => {

    const classNames = require("classnames");
    const channels = props.panelList;

    const dispatch = useDispatch();
    const setActiveChannel = (channelId: number) => {
        dispatch(setActiveChannelAC(channelId));
    }

    return (
        <div className={props.expandedStyles} >
            {channels.map((channel: any) => {
                let channelClass: string = classNames(
                    "channel",
                    { "active": channel.active }
                );

                return (
                    <Button type="text" key={channel.id} className={channelClass} onClick={() => setActiveChannel(channel.id)}>
                        <div className="channel__name">{channel.name}</div>
                        <span className="fa fa-pencil" aria-hidden="true"></span>
                    </Button>
                )
            })}
        </div>
    )

}