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
const fireStore = new FStore().getDB();


const App = () => {

  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    startObserveAuth({
      onSignIn: (user) => setUser(user),
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
