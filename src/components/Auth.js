import { withAuthenticator } from 'aws-amplify'
import React from 'react'
import { Link } from 'react-router-dom'

import '../style.css'

function Auth() {
  return (
    <div>
      <h1>Hello!</h1>
      <Link to='/'>home</Link>
    </div>
  )
}

export default withAuthenticator(Auth)
