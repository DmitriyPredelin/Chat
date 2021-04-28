import { IUser } from "../../common/interface";

export const SET_PROFILE = "SET_PROFILE";
export const SET_PROFILE_SAGA = "SET_PROFILE_SAGA";

const defaultStore: IUser = {
  id: 0,
  name: "",
  src: "",
  email: "",
  skype: "",
  user_status: "",
  active: false,
  nickname : ""
};

const profileReducer = (state = defaultStore, action: any) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, ...action.user };
  }

  return { ...state };
};

export const setProfileSagaAC = {
  type: SET_PROFILE_SAGA,
};

export const setProfileAC = (user: IUser) => ({
  type: SET_PROFILE,
  user: user,
});

export default profileReducer;
