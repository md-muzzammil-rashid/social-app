import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './Components/Context/UserContext';
import { ChatContextProvider } from './Components/Context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ChatContextProvider>
    <App />
    </ChatContextProvider>
  </UserContextProvider>
);
