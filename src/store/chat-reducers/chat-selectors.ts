import { IChannel, IChatTab, IMessage, IUser } from "common/interface";

export const getChannels = (state: any) => {
  const channels: Array<IChannel> = state.channels.channels;
  return channels;
};

export const getFriends = (state: any) => {
  const friends: Array<IUser> = state.friends.friends;
  return friends;
};

export const getFriendsLoading = (state: any) => {
  return state.friends.loading;
};

export const getActiveFriend = (state: any) => {
  return state.friends.friends.find((friend: IUser) => friend.active);
};

export const getChatTabs = (state: any) => {
  return state.chat.tabs;
};

export const getActiveTabsKey = (state: any) => {
  if (state.chat.tabs.length > 0) {
    let activeTab: IChatTab = state.chat.tabs.find(
      (tab: IChatTab) => tab.active === true
    );

    if (activeTab !== undefined) {
      return activeTab.key;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const getDriwerFriend = (state: any) => {
  let idDriwerFriend: number = state.friends.drawerFriend;
  if (idDriwerFriend === -1) {
    return undefined;
  }

  const friend: IUser = state.friends.friends.find(
    (friend: IUser) => friend.id === idDriwerFriend
  );
  return friend;
};

export const getMessageFromTab = (id: any) => (state: any) => {
  const messages: Array<IMessage> = state.chat.messages.filter(
    (mes: IMessage) => mes.to_user === id || mes.from === id
  );
  /*let currentTab: IChatTab = state.chat.tabs.find((tab: IChatTab) => {
      return tab.key === id;
    });
  */
  return messages;
};

export const getMessages = (id: number) => (state: any) => {
  const messages: Array<IMessage> = state.chat.messages.filter(
    (mes: IMessage) => mes.to_user === id || mes.from === id
  );

  return messages;
};

export const getUndeliveredMessage = (state: any) => {
  let friends: Array<IUser> = state.friends.friends;
  let activeTabKey: string | undefined = getActiveTabsKey(state);
  let countUndelivered: Array<{
    id: number;
    count: number;
  }> = [];

  if (friends.length > 0) {
    countUndelivered = friends.map((friend: IUser) => {
      if (activeTabKey) {
        if (parseInt(activeTabKey) === friend.id) {
          return { id: friend.id, count: 0 };
        }
      }

      let friendMessages: Array<IMessage> = state.chat.messages.filter(
        (mes: IMessage) => mes.is_send === 0 && mes.from === friend.id
      );

      return { id: friend.id, count: friendMessages.length };
    });
  }
  return countUndelivered;
};
