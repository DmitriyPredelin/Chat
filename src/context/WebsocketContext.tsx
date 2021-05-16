import { wsURL } from "API/API"
import { createContext, useContext } from "react"

const socket: any = new WebSocket(wsURL);
const WebSocketContext = createContext(socket)

export const WebSocketProvider = (props: any) => {
    return (
        <WebSocketContext.Provider value={socket}>
            {props.children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext)