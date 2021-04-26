import { all, call, put, takeEvery } from "redux-saga/effects";
import { API } from "../API/API";
import { SET_CHANNELS_SAGA, setChannelsAC } from "./channel-reducer";
import { setFriendsAC, SET_FRIENDS_SAGA } from "./friend-reducer";
import { setProfileAC, SET_PROFILE_SAGA } from "./profile-reducer";

//корневая
export function* rootSaga() {
  yield all([watcherChannels(), watcherFriends(), watcherProfile()]);
}

//каналы
function* workerChannels(): any {
  const data = yield call(() => API.getChannels());
  yield put(setChannelsAC(data));
}

function* watcherChannels(): any {
  yield takeEvery(SET_CHANNELS_SAGA, workerChannels);
}

//друзья
function* workerFriends(args : any): any {
  const profileId = args.profileId;
  const data = yield call(() => API.getFriends(profileId));
  yield put(setFriendsAC(data));
}

function* watcherFriends(): any {
  yield takeEvery(SET_FRIENDS_SAGA, workerFriends);
}

//профиль
function* workerProfile(args : any): any {
  const profileId = args.profileId;
  const data = yield call(() => API.getProfile(profileId));
  yield put(setProfileAC(data));
}

function* watcherProfile(): any {
  yield takeEvery(SET_PROFILE_SAGA, workerProfile);
}
