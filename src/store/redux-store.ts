import { applyMiddleware, combineReducers, createStore } from "redux";
import channelReducer from "./channel-reducer";
import friendReducer from "./friend-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga} from "../store/sagas";
import thunk from "redux-thunk";
import chatReducer from "./chat-reducer";
import profileReducer from "./profile-reducer";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  channels: channelReducer,
  friends : friendReducer,
  chat : chatReducer,
  profile : profileReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
