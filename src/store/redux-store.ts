import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { rootSaga } from "../store/sagas";
import channelReducer from "./chat-reducers/channel-reducer";
import chatReducer from "./chat-reducers/chat-reducer";
import friendReducer from "./chat-reducers/friend-reducer";
import profileReducer from "./profile-reducers/profile-reducer";
import seeBattleReducer from "./sea-battle-reducers/sea-battle-reducer";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  channels: channelReducer,
  friends : friendReducer,
  chat : chatReducer,
  profile : profileReducer,
  seeBattle : seeBattleReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
