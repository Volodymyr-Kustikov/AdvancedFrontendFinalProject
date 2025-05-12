//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import './index.css';
import App from './App/App';
import { createStore } from "redux";
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const defaultState = {
  month: new Date().getMonth(),
}

const action = {type:"", number:0, status:true };
//@ts-ignore
const reducer = (state = defaultState, action) => {
  switch(action.type){
    case "INCREMENT":
      return {...state, month: state.month === 11 ? 0 : state.month + 1}
    case "DECREMENT":
      console.log(state.month)
      return {...state, month: state.month <= 0 ? 11 : state.month - 1}
    default: 
      return state

  }

}

const store = createStore(reducer)
const root = ReactDOM.createRoot(rootElement);
root.render(
  
  <React.StrictMode>
    <Provider store={store}>

      <App />
    </Provider>
  </React.StrictMode>
);
