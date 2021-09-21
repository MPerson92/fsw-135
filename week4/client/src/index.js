import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import User from './components/User'


ReactDOM.render(
  <BrowserRouter>
    <User>
      <App/>
    </User>
  </BrowserRouter>, 
  document.getElementById('root')
)


