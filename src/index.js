import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Authprovider } from './contexts/Authcontext';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Authprovider>
          <App />
        </Authprovider>
      </Provider>
  </React.StrictMode>
);

