import { IChatTab, IMessage } from "../../common/interface";

export const SET_MESSAGE = "SET_MESSAGE";
export const SET_WEBSOCKET_CONNECT = "SET_WEBSOCKET_CONNECT";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const ADD_TAB = "ADD_TAB";
export const REMOVE_TAB = "REMOVE_TAB";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGE_IS_SEND = "SET_MESSAGE_IS_SEND";

const defaultStore = {
  tabs: [] as Array<IChatTab>,
  messages: [] as Array<IMessage>,
  socket: null,
  activeChat: false, //признак того, что чат активен, т.е. можно кому то писать
};

const chatReducer = (state = defaultStore, action: any) => {
  let copyState = {
    ...state,
    tabs: [...state.tabs],
    messages: [...state.messages],
  };

  switch (action.type) {
    case SET_WEBSOCKET_CONNECT:
      return { ...state, socket: action.socket };

    case SET_ACTIVE_CHAT:
      return { ...state, activeChat: true };

    case ADD_TAB:
      let newTabs: IChatTab = {
        key: action.key,
        name: action.name,
        active: true,
      };

      let idx = copyState.tabs.findIndex((tab: IChatTab) => {
        return tab.key === action.key.toString();
      });

      if (idx === -1) {
        copyState.tabs.push(newTabs);
      }

      return copyState;

    case REMOVE_TAB:
      return {
        ...state,
        tabs: [
          ...state.tabs.filter((tab: any) => {
            return tab.key !== action.key;
          }),
        ],
      };

    case SET_ACTIVE_TAB:
      copyState.tabs.forEach((tab) => {
        tab.active = false;
      });
      console.log(SET_ACTIVE_TAB);

      let tab = copyState.tabs.find((tab: IChatTab) => tab.key === action.key);

      if (tab !== undefined) {
        tab.active = true;
        copyState.messages.forEach((message: IMessage) => {
          if (tab !== undefined) {
            if (message.from === parseInt(tab.key)) {
              message.is_send = 1;
            }
          }
        });
      }

      return copyState;

    case ADD_MESSAGE:
      copyState.messages.push(action.message);
      return copyState;

    case SET_MESSAGE_IS_SEND:
      copyState.messages.forEach((message: IMessage) => {
        if (action.messages.includes(message)) {
          message.is_send = 1;
        }
      });

      return copyState;
  }

  return { ...state };
};

export const setWebsocketConnectAC = (socket: WebSocket) => ({
  type: SET_WEBSOCKET_CONNECT,
  socket: socket,
});

export const setActiveChatAC = () => ({
  type: SET_ACTIVE_CHAT,
});

export const addTabAC = (key: string, name: string) => ({
  type: ADD_TAB,
  key: key,
  name: name,
});

export const removeTabAC = (key: string) => ({
  type: REMOVE_TAB,
  key: key,
});

export const setActiveTabAC = (key: string | undefined) => ({
  type: SET_ACTIVE_TAB,
  key: key,
});

export const addMessageAC = (message: IMessage) => ({
  type: ADD_MESSAGE,
  message: message,
});

export const setMessageIsSend = (messages: Array<IMessage>) => ({
  type: SET_MESSAGE_IS_SEND,
  messages: messages,
});

export default chatReducer;
