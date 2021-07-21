import { useEffect, useState } from 'react'
import Header from './components/Header';
import TagList from './components/TagList';
import Schedule from './components/Schedule';
import { DragDropContext } from 'react-beautiful-dnd';
import { startObserveAuth } from './utils/auth';
import Login from './components/Login';
import { db } from './utils/firebaseUils';
import firebase from 'firebase'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

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
            <Route path="/" exact>
              <ProjectList user={user} />
            </Route>
            <Route path="/projects/:projectId">
              <DragDropContext onDragEnd={() => console.log('end')}>
                <Schedule></Schedule>
                <TagList></TagList>
              </DragDropContext>
            </Route>
            <Route path="/add">
              <ProjectForm user={user} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
