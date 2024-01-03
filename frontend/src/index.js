import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "react-alice-carousel/lib/alice-carousel.css";
import {PublisherProvider} from "./PublisherContext";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <PublisherProvider>
      <App />
    </PublisherProvider>
    
  </React.StrictMode>
);
