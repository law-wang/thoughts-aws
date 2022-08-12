import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

import '../style.css';

function Auth() {
  return (
    <div className="login">
      <Authenticator hideSignUp>
        {({ signOut, user }) => (
          <main>
            <h1>Welcome, user {user.username}!</h1>
            <button onClick={signOut}>Sign out</button>
            <div>
              <a href="/create">Create</a>
            </div>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default Auth;
