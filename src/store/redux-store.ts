import { applyMiddleware, combineReducers, createStore } from "redux";
import channelReducer from "./chat-reducers/channel-reducer";
import friendReducer from "./chat-reducers/friend-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga} from "../store/sagas";
import thunk from "redux-thunk";
import chatReducer from "./chat-reducers/chat-reducer";
import profileReducer from "./profile-reducers/profile-reducer";
import seeBattleReducer from "./see-battle-reducers/see-battle-reducer";


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
