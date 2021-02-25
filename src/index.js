import React from 'react';
import ReactDOM from 'react-dom';

import RouterView from './router/lib/index.jsx'

import store from './redux/store'
import { Provider } from "react-redux";

import './config/rem'
import "./assets/iconfont/iconfont.css";
import './index.css';
ReactDOM.render(
  <Provider store={store}>
    <RouterView />
  </Provider>
   ,
  document.getElementById('root')
);


