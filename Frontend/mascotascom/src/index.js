import React from 'react';
import ReactDOM from 'react-dom/client';
import Pprincipal from './Pprincipal';
import store from './store' ;
import { Provider } from 'react-redux';
import './App.css' ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Pprincipal/>
  </Provider>
);


