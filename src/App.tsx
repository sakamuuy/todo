import { createContext, useEffect, useState } from 'react'
import { Header } from './components/organisms/Header'
import { startObserveAuth } from './utils/auth';
import { Login } from './components/organisms/Login';
import { db } from './utils/firebaseUils';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import {ProjectList} from './components/pages/ProjectList';
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
              <Route path="/" exact component={ProjectList} />
              <Route path="/projects/:projectId" component={ProjectDetail} />
              <Route path="/add" component={ProjectForm} />
            </Switch>
          </Router>
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </div>
  );
}
