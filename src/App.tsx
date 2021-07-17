import { createContext, useEffect, useState } from 'react'
import Header from './components/Header';
import TagList from './components/TagList';
import Schedule from './components/Schedule';
import { DragDropContext } from 'react-beautiful-dnd';
import { getLoginUser, startObserveAuth } from './utils/auth';
import Login from './components/Login';
import { initializeFirebase, FStore } from './utils/firebaseUils';
import firebase from 'firebase'

initializeFirebase();
const db = new FStore().getDB();


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
        <DragDropContext onDragEnd={() => console.log('end')}>
          <Schedule></Schedule>
          <TagList></TagList>
        </DragDropContext>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
