import 'antd/dist/antd.css';
import { Routing } from 'components/general/routing';
import { SidePanel } from 'components/general/side-panel';
import React from 'react';
import { Header } from './components/general/header';
import { AuthContext } from "./context/AuthContext";
import { useAuth } from './hooks/useAuth';
import AuthPage from "./pages/authPage";
import './styles.scss';

function App() {
  const { login, logout, token, userId, email } = useAuth();
  const isAuthentificated = !!token;

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




