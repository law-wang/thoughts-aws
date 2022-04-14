import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

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
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
