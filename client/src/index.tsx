import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './context/ErrorBoundary'
import "./styles/index.scss";
import App from './App';
import 'font-awesome/css/font-awesome.min.css';



ReactDOM.render(
  <BrowserRouter>
  <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
);


