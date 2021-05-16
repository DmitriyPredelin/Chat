import { wsURL } from "API/API";
import { wsSend } from "components/general/common";
import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { IConnect, storageName } from "../common/interface";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState(null);
  const history = useHistory();

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

  return { login, logout, token, userId, email };
};
