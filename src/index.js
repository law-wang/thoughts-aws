import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"

import Amplify from "@aws-amplify/core"
import { AuthModeStrategyType } from 'aws-amplify'
import awsconfig from './aws-exports'

import Main from './components/Main'
import './style.css'

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Router>
    <Main />
  </Router>
)
