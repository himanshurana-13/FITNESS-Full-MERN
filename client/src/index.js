import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import SignIn from '../src/components/SignIn' ;
import SignUp from '../src/components/SignUp' ;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <SignIn /> 
    <SignUp />
  </React.StrictMode>
);


