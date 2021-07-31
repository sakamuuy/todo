import { createContext, useEffect, useState } from 'react'
import { Header } from './components/organisms/Header'
import { startObserveAuth } from './utils/auth';
import { Login } from './components/organisms/Login';
import { db } from './utils/firebaseUils';
import firebase from 'firebase'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import {ProjectDetail} from './components/pages/ProjectDetail';
import { User } from './schema'

export const UserContext = createContext<User | null>(null);

export function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    startObserveAuth({
      onSignIn: async (user) => {

        await db.collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(doc.data());
            } else {
              console.log('add user');
              db.collection('users').doc(user.uid).set({
                name: user.displayName
              });
            }
          })
        
        setUser({
          uid: user.uid,
          name: user.displayName? user.displayName : `${new Date()}_user`
        })
      },
      onSignOut: (user) => setUser(user)
    });
  }, [])

  return (
    <div style={{height: '100%'}}>
      <UserContext.Provider value={user}>
        <Header/>
        {user? (
          <Router>
            <Switch>
              <Route path="/" exact render={() => <ProjectList user={user} />} />
              <Route path="/projects/:projectId" render={() => <ProjectDetail user={user} />} />
              <Route path="/add" render={() => <ProjectForm user={user} />} />
            </Switch>
          </Router>
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </div>
  );
}
