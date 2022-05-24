import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
    <App instance={msalInstance} />,
  document.getElementById('root')
);

