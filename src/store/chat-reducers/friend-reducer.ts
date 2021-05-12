import { IUser } from "../../common/interface";

export const SET_FRIENDS = "SET_FRIENDS";
export const SET_FRIENDS_SAGA = "SET_FRIENDS_SAGA";
export const SET_ACTIVE_FRIEND = "SET_ACTIVE_FRIEND";
export const SET_DRIWER_FRIEND = "SET_DRIWER_FRIEND";
export const SET_ONLINE_FRIENDS = "SET_ONLINE_FRIENDS";

const defaultStore = {
  friends: [] as Array<IUser>,
  loading: true,
  drawerFriend: -1,
};

const friendReducer = (state = defaultStore, action: any) => {
  let copyState = { ...state, friends: [...state.friends] };
  switch (action.type) {
    case SET_FRIENDS:
      return { ...state, friends: action.friends, loading: false };

    case SET_ACTIVE_FRIEND:
      copyState.friends.forEach((friend: IUser) => {
        friend.active = false;
      });
      let friend = copyState.friends.find(
        (x: IUser) => x.id === action.friendId
      );
      if (friend !== undefined) {
        friend.active = true;
      }
      return copyState;

    case SET_DRIWER_FRIEND:
      return { ...state, drawerFriend: action.drawerFriendId };

    case SET_ONLINE_FRIENDS:
      copyState.friends.forEach((friend: IUser) => {
        if (action.friendIds.includes(friend.id)) {
          if (action.position === "on") {
            friend.isOnline = true;
          } else {
            friend.isOnline = false;
          }
        }
      });

      /*let friendOnline = copyState.friends.find(
        (friend: IUser) => friend.id === action.friendId
      );
      if (friendOnline !== undefined) {
        if (action.position === 'on') {
          friendOnline.isOnline = true;
        } else {
          friendOnline.isOnline = false;
        }
        console.log(friendOnline);
        
      }*/
      return copyState;
    /* copyState.friends.forEach((friend: IUser) => {
        friend.isOnline = action.friendsIds.includes(friend.id) ? true : false;
      });*/

    //return copyState;
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

export const setOnlineFriendAC = (
  friendId: Array<number>,
  position: string
) => ({
  type: SET_ONLINE_FRIENDS,
  friendIds: friendId,
  position: position,
});

export default friendReducer;
