import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Amplify, { AuthModeStrategyType } from 'aws-amplify'
import awsconfig from './aws-exports'

import Main from './components/Main'
import Auth from './components/Auth'
import './style.css'

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
