import React from 'react'
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react'
// import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react' 
import { Link } from 'react-router-dom'

import '../style.css'

function Auth({ signOut, user }) {
  return (
    <div>
      {/* <h1>Hello!</h1> */}
      {/* <AmplifyAuthenticator>
        <AmplifySignIn slot="sign-in">
          <div slot="secondary-footer-content"></div>
        </AmplifySignIn>
      </AmplifyAuthenticator> */}
      <Authenticator hideSignUp>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      {/* <AmplifyAuthenticator>
        <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
      </AmplifyAuthenticator>
      <Link to='/'>home</Link>
      <button onClick={signOut}>Sign out</button> */}
    </div>
  )
}

export default Auth
