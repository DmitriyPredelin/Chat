import 'antd/dist/antd.css';
import { Routing } from 'components/general/routing';
import { SidePanel } from 'components/general/side-panel';
import { Header } from './components/general/header';
import { useAuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/authPage";
import './styles.scss';

function App() {
  const { isAuth } = useAuthProvider();

  return (
    <>
      {!isAuth ? <AuthPage /> :
        <>
          <Header />
          <div className="container">
            <SidePanel />
            <Routing />
          </div>
        </>
      }
    </>
  );
}

export default App;




