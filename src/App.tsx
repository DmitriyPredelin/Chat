import './styles.scss';
import 'antd/dist/antd.css';
import { AuthContext } from "./context/AuthContext";
import { MessageOutlined, CalendarOutlined, FormatPainterOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { ChatPage } from './pages/chatPage';
import { useAuth } from './hooks/useAuth';
import AuthPage from "./pages/authPage"
import { ProfilePage } from "./pages/profilerPage"
import { Header } from './components/general/header';
import { CalendarPage } from './pages/calendarPage'



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
        <div className="nav-left">
          <div className="button-panel_main">
            <NavLink to="/chat">
              <Tooltip overlay="Чат" mouseEnterDelay={0.5}>
                <MessageOutlined className="button-panel__icons" />
              </Tooltip>
            </NavLink>
            <NavLink to="/calendar">
              <Tooltip overlay="Календарь" mouseEnterDelay={0.5}>
                <CalendarOutlined className="button-panel__icons" />
              </Tooltip>
            </NavLink>
            <NavLink to="/paint">
              <Tooltip overlay="Рисовать" mouseEnterDelay={0.5}>
                <FormatPainterOutlined className="button-panel__icons" />
              </Tooltip>
            </NavLink>
          </div>
          <div className="button-panel_additional">
            <NavLink to="/profile">
              <Tooltip overlay="Настройки профиля" mouseEnterDelay={0.5}>
                <UserOutlined className="button-panel__icons" />
              </Tooltip>
            </NavLink>
            <Tooltip overlay="Выйти из чатика" mouseEnterDelay={0.5}>
              <LogoutOutlined className="button-panel__icons" onClick={logout} />
            </Tooltip>
          </div>
        </div >
        <Switch>
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/calendar">
            <CalendarPage />
          </Route>

          <Route exact path="/">
            {isAuthentificated ? <Redirect to="/chat" /> : <Redirect to="/auth" />}
          </Route>
        </Switch>
      </div >
    </AuthContext.Provider>
  );
}




export default App;




