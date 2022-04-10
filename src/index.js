import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"

import Amplify, { AuthModeStrategyType } from 'aws-amplify'
import awsconfig from './aws-exports'

import Main from './components/Main'
import './style.css'


Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('root')
)
