// Import React to enable JSX syntax and React component features
import React from 'react';
// Import ReactDOM for rendering the React component tree into the DOM
import ReactDOM from 'react-dom/client';
// Import the main App component
import App from './App';
// Import the global CSS file for styling
import './index.css';

// Render the App component into the root DOM element
// React.StrictMode is a wrapper component that helps with highlighting potential problems in an application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
