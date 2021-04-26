import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { storageName } from "../common/interface";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState(null);
  const history = useHistory();
  let socket : any;

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
    history.push('/auth');
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageName) !== null) {
      const data = JSON.parse(localStorage.getItem(storageName) ?? "");

      login(data.token, data.userId, data.email);
    }
  }, [login]);

  return { login, logout, token, userId, email };
};
