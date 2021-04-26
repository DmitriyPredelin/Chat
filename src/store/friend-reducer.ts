import { IUser } from "../common/interface";

export const SET_FRIENDS = "SET_FRIENDS";
export const SET_FRIENDS_SAGA = "SET_FRIENDS_SAGA";
export const SET_ACTIVE_FRIEND = "SET_ACTIVE_FRIEND";
export const SET_DRIWER_FRIEND = "SET_DRIWER_FRIEND";

const defaultStore = {
  friends: [
    {
      id: 1,
      name: "",
      src: "",
      email: "",
      skype: "",
      active: false,
    },
  ],
  loading: true,
  drawerFriend: -1,
};

const friendReducer = (state = defaultStore, action: any) => {
  let copyState = { ...state, friends: [...state.friends] };

  switch (action.type) {
    case SET_FRIENDS:
      return { ...state, friends: action.friends, loading: false };

    case SET_ACTIVE_FRIEND:
      copyState.friends.forEach((friend) => {
        friend.active = false;
      });
      let friend = copyState.friends.find((x: any) => x.id === action.friendId);
      if (friend !== undefined) {
        friend.active = true;
      }
      return copyState;

    case SET_DRIWER_FRIEND : 
      return { ...state, drawerFriend: action.drawerFriendId }; 
  }

  return { ...state };
};

export const setFriendsAC = (friends: Array<IUser>) => ({
  type: SET_FRIENDS,
  friends: friends,
});

export const setActiveFriendAC = (friendId: number) => ({
  type: SET_ACTIVE_FRIEND,
  friendId: friendId,
});

export const setDriwerFriendAC = (drawerFriendId: number) => ({
  type: SET_DRIWER_FRIEND,
  drawerFriendId: drawerFriendId,
});

export default friendReducer;
