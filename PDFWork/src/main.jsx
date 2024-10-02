import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Check this path
import './index.css'; // Ensure the CSS file is also correctly linked

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
