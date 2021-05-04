import 'antd/dist/antd.css';
import { wsURL } from 'API/API';
import { IConnect } from 'common/interface';
import { wsSend } from 'components/general/common';
import { Routing } from 'components/general/routing';
import { SidePanel } from 'components/general/side-panel';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_WEBSOCKET_CONNECT } from 'store/chat-reducers/chat-reducer';
import { Header } from './components/general/header';
import { AuthContext } from "./context/AuthContext";
import { useAuth } from './hooks/useAuth';
import AuthPage from "./pages/authPage";
import './styles.scss';

function App() {
  const { login, logout, token, userId, email } = useAuth();
  const isAuthentificated = !!token;

  const dispatch = useDispatch();

  /*const socket: WebSocket = useSelector(getWebSocketConnection);

  if (!socket) {
    dispatch({ type: SET_WEBSOCKET_CONNECT });
  }*/

  //установка сокет соединения
  const setConnection = (userId: number, socket: WebSocket) => {
    console.log('setConnection');

    let newConnect: IConnect = {
      userId: userId,
      type: 'connect'
    }
    wsSend(socket, newConnect);
  }

  console.log(userId);

  useEffect(() => {
    if (isAuthentificated && userId !== 0) {
      console.log('CONNECT SOC');

      const socket: WebSocket = new WebSocket(wsURL);
      dispatch({ type: SET_WEBSOCKET_CONNECT, socket: socket });

      console.log('useEffect auth');
      socket.addEventListener("open", () => setConnection(userId, socket))

      return () => {
        socket.removeEventListener("open", () => setConnection(userId, socket), false);
      }
    }
  }, [userId])



  if (!isAuthentificated) {
    return (
      <AuthContext.Provider value={{ token, userId, login, logout, isAuthentificated, email }}>
        <AuthPage />
      </AuthContext.Provider >
    )
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthentificated, email }}>
      <Header />
      <div className="container">
        <SidePanel logout={logout} />
        <Routing isAuthentificated={isAuthentificated} />
      </div >
    </AuthContext.Provider>
  );
}




export default App;




