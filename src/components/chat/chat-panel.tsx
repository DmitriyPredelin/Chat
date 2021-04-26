import { Avatar, List } from 'antd';
import { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMessage } from '../../common/interface';
import { AuthContext } from '../../context/AuthContext';
import { getMessages } from '../../store/selectors';

export const ChatPanel = (props: any) => {
    const wsSend = props.wsSend;
    const tabKey : number = props.tabKey;
    const textValueRef = useRef<HTMLTextAreaElement>(null)
    const auth = useContext(AuthContext);

    const data : Array<IMessage> = useSelector(getMessages(tabKey));
    const dispatch = useDispatch();
    //dispatch(setMessageIsSend(data));


    const send = () => {
        if (textValueRef && textValueRef.current) {
            let sendText: string = textValueRef.current.value;

            let newMessage: IMessage = {
                id: 0,
                text: sendText,
                from: auth.userId,
                fromName : '',
                to_user: tabKey,
                to_channel: 0,
                is_send: 0,
                type: 'text',
                timeStamp: Date.now(),
                author_src: ""
            }
            console.log(newMessage);
            
            wsSend(newMessage);
            textValueRef.current.value ='';
        }
    }


    return (
        <div className="chat-panel">
            <List
                itemLayout="horizontal"
                dataSource={data}
                style={{height : "100%"}}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size="large" src={item.author_src}/>}
                            title={<a href="https://ant.design">{item.fromName}</a>}
                            description={item.text}
                        />
                    </List.Item>
                )}
            />
            <textarea ref={textValueRef} />
            <br />
            <button onClick={send}>Отправить</button>
            
        </div>
    )

}