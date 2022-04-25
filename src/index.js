import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { Provider } from 'react-redux';
import { loadProductFromStorage, saveProductToStorage } from './services';

const root = ReactDOM.createRoot(document.getElementById('root'));

//subscribe to store for changes and sync data with local storage
store.subscribe(() =>{
  saveProductToStorage(
    store.getState()
  )
})

root.render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
