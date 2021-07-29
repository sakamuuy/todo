import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd"
import Schedule from "./Schedule"
import TagList from "./TagList"
import firebase from 'firebase'
import { useEffect, VFC, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../utils/firebaseUils'
import { SubscribedTodo, Todo, UnsubscribedTodo } from '../schema'

type Props = {
  user: firebase.User
}

type ParamsType = {
  projectId: string
}

export const fetchTodoList = ({uid, projectId}: {uid: string; projectId: string}) => {
  return db.collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('todos')
    .get()
}

const ProjectDetail: VFC<Props> = (props) => {
  const { projectId } = useParams<ParamsType>();
  const [unsubuscribedTodos, setUnsubuscribedTodos] = useState<UnsubscribedTodo[]>([])
  const [subscribedTodos, setSubuscribedTodos] = useState<SubscribedTodo[]>([])
  
  useEffect(() => {
    const fetchedTodos: Todo[] = [];

    fetchTodoList({
      uid: props.user.uid,
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

      setUnsubuscribedTodos(unsubuscribeds)
      setSubuscribedTodos(subscribeds)
    })
  },[props.user.uid, projectId])

  const updateTodoSchedule = (result: DropResult, provided: ResponderProvided ) => {
    console.log(result, provided)
    const todoRef = db.collection('users')
      .doc(props.user.uid)
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc(result.draggableId)
    todoRef.get().then((snapshot) => {
      todoRef.set({
        ...snapshot.data(),
        startDay: result.destination?.droppableId,
        startTime: result.destination?.index
      })
    })
  }

  const onUpdateTodoList = () => {
    const fetchedTodos: Todo[] = [];

    fetchTodoList({
      uid: props.user.uid,
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

      setUnsubuscribedTodos(unsubuscribeds)
      setSubuscribedTodos(subscribeds)
    })
  }


  return (
    <DragDropContext onDragEnd={updateTodoSchedule}>
      <Schedule 
        todoList={subscribedTodos}
      />
      <TagList 
        uid={props.user.uid} 
        projectId={projectId} 
        todoList={unsubuscribedTodos}
        onUpdateTodoList={onUpdateTodoList} />
    </DragDropContext>
  )
}

export default ProjectDetail