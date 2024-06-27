import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/navbar.css';
import App from './App';
import { TeamsContextProvider } from './context/TeamContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TeamsContextProvider>
      <App />
    </TeamsContextProvider>
  </React.StrictMode>
);

