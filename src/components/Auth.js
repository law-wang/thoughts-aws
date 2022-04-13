import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react'

import '../style.css'

function Auth() {
  return (
    <div>
      <Authenticator hideSignUp>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  )
}

export default Auth
