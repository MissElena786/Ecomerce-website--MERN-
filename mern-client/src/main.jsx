import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>

  <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>

  </Provider>
)
