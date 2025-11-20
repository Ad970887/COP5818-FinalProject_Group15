import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the App component using the filename that exists on disk
// Import the App component using the filename that exists on disk inside the container
// Import the App component with canonical casing
import App from './App';
import './index.css';

// Root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);