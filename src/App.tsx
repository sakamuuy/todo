import { useEffect, useState } from 'react'
import Header from './components/Header';
import { startObserveAuth } from './utils/auth';
import Login from './components/Login';
import { db } from './utils/firebaseUils';
import firebase from 'firebase'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectDetail from './components/ProjectDetail';

const App = () => {

  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    startObserveAuth({
      onSignIn: (user) => {
        setUser(user)

        const userCollection = db.collection('users')

        userCollection
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(doc.data());
            } else {
              console.log('add user');
              userCollection.doc(user.uid).set({
                name: user.displayName
              });
            }
          })

      },
      onSignOut: (user) => setUser(user)
    });
  }, [])

  return (
    <div style={{height: '100%'}}>
      <Header user={user} />
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
    </div>
  );
}

export default App;
