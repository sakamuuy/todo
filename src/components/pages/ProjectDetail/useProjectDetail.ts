import {
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import { db } from '../../../utils/firebaseUils'
import { Todo, UnsubscribedTodo, SubscribedTodo } from '../../../schema'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../App'
import { useParams } from 'react-router-dom'
import { Props } from './ProjectDetail'

export const fetchTodoList = ({
  uid,
  projectId,
}: {
  uid: string
  projectId: string
}) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('todos')
    .get()
}

export function useProjectDetail(): Props {
  const user = useContext(UserContext)
  const { projectId } = useParams<{projectId: string}>()
  const [unsubuscribedTodos, setUnsubuscribedTodos] = useState<UnsubscribedTodo[]>([])
  const [subscribedTodos, setSubuscribedTodos] = useState<SubscribedTodo[]>([])

  useEffect(() => {
    if (!user) return;

    const fetchedTodos: Todo[] = []
    fetchTodoList({
      uid: user.uid,
      projectId: projectId,
    })
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedTodos.push({
          id: doc.id,
          ...doc.data(),
        } as Todo)
      })

      const unsubuscribeds: UnsubscribedTodo[] = []
      const subscribeds: SubscribedTodo[] = []
      fetchedTodos.forEach((t) => {
        if (!t.isSubscribed) {
          return unsubuscribeds.push(t)
        }
        return subscribeds.push(t)
      })

      setUnsubuscribedTodos(unsubuscribeds)
      setSubuscribedTodos(subscribeds)
    })
  }, [user?.uid, projectId])

  const updateTodoSchedule = (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    if (!user) return;
    console.log(result, provided)
    const todoRef = db
      .collection('users')
      .doc(user.uid)
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc(result.draggableId)
    todoRef.get().then((snapshot) => {
      todoRef.set({
        ...snapshot.data(),
        startDay: result.destination?.droppableId,
        startTime: result.destination?.index,
      })
    })
  }

  const updateTodoList = () => {
    if (!user) return;

    const fetchedTodos: Todo[] = []
    fetchTodoList({
      uid: user.uid,
      projectId: projectId,
    }).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedTodos.push({
          id: doc.id,
          ...doc.data(),
        } as Todo)
      })
  
      const unsubuscribeds: UnsubscribedTodo[] = []
      const subscribeds: SubscribedTodo[] = []
      fetchedTodos.forEach((t) => {
        if (!t.isSubscribed) {
          return unsubuscribeds.push(t)
        }
        return subscribeds.push(t)
      })
  
      setUnsubuscribedTodos(unsubuscribeds)
      setSubuscribedTodos(subscribeds)
    })
  }

  return {
    subscribedTodos,
    unsubuscribedTodos,
    updateTodoSchedule,
    updateTodoList,
    projectId
  }
}
