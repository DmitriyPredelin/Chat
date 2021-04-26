export const ChatMessage = (props: any) => {
    const message = props.message;

    return (
        <>
            <div className="message-single">
                <img src="" alt=""/>
                <div>{message.text}</div>
            </div>
            
        </>

    )
}