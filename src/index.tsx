import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./store/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
