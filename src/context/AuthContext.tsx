import { wsURL } from "API/API";
import { IConnect, storageName } from "common/interface";
import { wsSend } from "components/general/common";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_WEBSOCKET_CONNECT } from "store/chat-reducers/chat-reducer";

function emptyFunction(t: any, id: any, email: any) { };
function emptyFunction2() { };

const AuthContext = createContext({
  token: null,
  userId: 0,
  login: emptyFunction,
  logout: emptyFunction2,
  isAuth: false,
  email: null
});

interface IChildrenProps {
  children: React.ReactNode;
}


export const AuthProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState(null);
  const history = useHistory();

  const dispatch = useDispatch();
  //установка сокет соединения
  const setConnection = (userId: number, socket: WebSocket | undefined) => {
    let newConnect: IConnect = {
      userId: userId,
      type: "connect",
    };
    wsSend(socket, newConnect);
  };

  const login = useCallback((jwtToken, id, email) => {
    setToken(jwtToken);
    setUserId(id);
    setEmail(email);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(0);
    localStorage.removeItem(storageName);
    history.push("/auth");
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageName) !== null) {
      const data = JSON.parse(localStorage.getItem(storageName) ?? "");
      login(data.token, data.userId, data.email);
    }
  }, [login]);

  useEffect(() => {
    if (userId > 0) {
      const socket = new WebSocket(wsURL);
      if (socket) {
        socket.addEventListener("open", () => setConnection(userId, socket));
        dispatch({ type: SET_WEBSOCKET_CONNECT, socket: socket });
        return () => {
          socket.removeEventListener(
            "open",
            () => setConnection(userId, socket),
            false
          );
        };
      }
    }
  }, [userId]);


  const isAuth = !!token;
  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuth, email }}>
      {children}
    </AuthContext.Provider >
  )
}

export const useAuthProvider = () => useContext(AuthContext)
