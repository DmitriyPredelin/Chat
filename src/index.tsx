import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./store/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { WebSocketProvider } from 'context/WebsocketContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <WebSocketProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WebSocketProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
