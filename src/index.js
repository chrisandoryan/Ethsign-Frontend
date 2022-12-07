import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from "metamask-react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@tremor/react/dist/esm/tremor.css';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (403 === error.response.status || 401 === error.response.status) {
      localStorage.removeItem("token");
    } else {
      return Promise.reject(error)
    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
