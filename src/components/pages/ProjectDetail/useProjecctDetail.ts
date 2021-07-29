import { db } from "../../../utils/firebaseUils";
import { Todo, UnsubscribedTodo, SubscribedTodo } from "../../../schema";

export const fetchTodoList = ({uid, projectId}: {uid: string; projectId: string}) => {
  return db.collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('todos')
    .get()
}

export const onUpdateTodoList = (uid: string, projectId: string) => {
  const fetchedTodos: Todo[] = [];

  fetchTodoList({
    uid: uid,
    projectId: projectId
  })
  .then((snapshot) => {
    snapshot.docs.forEach(doc => {
      fetchedTodos.push({
        id: doc.id,
        ...doc.data()
      } as Todo)
    })
    
    const unsubuscribeds: UnsubscribedTodo[] = [];
    const subscribeds: SubscribedTodo[] = []
    fetchedTodos.forEach(t => {
      if (!t.isSubscribed) {
        return unsubuscribeds.push(t)
      }
      return subscribeds.push(t)
    })

    // setUnsubuscribedTodos(unsubuscribeds)
    // setSubuscribedTodos(subscribeds)
  })
}