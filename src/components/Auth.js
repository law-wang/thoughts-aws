import { withAuthenticator } from '@aws-amplify/ui-react'
import React from 'react'
import { Link } from 'react-router-dom'

import '../style.css'

function Auth({ signOut, user }) {
  return (
    <div>
      <h1>Hello!</h1>
      <Link to='/'>home</Link>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default withAuthenticator(Auth)
