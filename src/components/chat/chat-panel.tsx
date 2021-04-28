import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, List } from 'antd';
import { Message } from "components/general/message";
import { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMessage } from '../../common/interface';
import { AuthContext } from '../../context/AuthContext';
import { getMessages } from "../../store/chat-reducers/chat-selectors";


export const ChatPanel = (props: any) => {
    const wsSend = props.wsSend;
    const tabKey: number = props.tabKey;
    const textValueRef = useRef<HTMLTextAreaElement>(null)
    const auth = useContext(AuthContext);

    const classNames = require("classnames");
    const data: Array<IMessage> = useSelector(getMessages(tabKey));

    const send = () => {
        if (textValueRef && textValueRef.current && textValueRef.current.value) {
            let sendText: string = textValueRef.current.value;

            let newMessage: IMessage = {
                id: 0,
                text: sendText,
                from: auth.userId,
                fromName: '',
                to_user: tabKey,
                to_channel: 0,
                is_send: 0,
                type: 'text',
                timeStamp: Date.now(),
                author_src: ""
            }
            console.log(newMessage);

            wsSend(newMessage);
            Message('sdf');
            textValueRef.current.value = '';
        }
    }

    const keyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            send();
            return false;
        }
    }

    return (
        <>
            <div className="chat-panel">
                <div className="chat-panel__field">
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={message => {
                            let messageClass: string = classNames(
                                { "main": message.from === auth.userId },
                                { "other": message.from !== auth.userId }
                            );
                            return <List.Item className={messageClass} >
                                <List.Item.Meta
                                    className="chat-message"
                                    avatar={<Avatar size="large" src={message.author_src} />}
                                    title={<a href="https://ant.design">{message.fromName}<span></span></a>}
                                    description={message.text}
                                />
                            </List.Item>
                        }}
                    />
                </div>
            </div>
            <div className="chat-panel__btn-panel">
                <PaperClipOutlined className="chat-panel__paper-clip btn-panel__icon" />
                <textarea rows={1} className="chat-panel__input-field " ref={textValueRef} placeholder="Введите ваше сообщение" onKeyPress={keyPressHandler} />
                <button className="material-icons-outlined btn-panel__icon_smile btn-panel__icon">sentiment_satisfied</button>
                <SendOutlined className="chat-panel__send-btn btn-panel__icon" onClick={send} />
            </div>
        </>
    )
}