import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd"
import Schedule from "./Schedule"
import TagList from "./TagList"
import firebase from 'firebase'
import { VFC } from 'react'
import { useParams } from 'react-router'
import { db } from '../utils/firebaseUils'

type Props = {
  user: firebase.User
}

type ParamsType = {
  projectId: string
}

const ProjectDetail: VFC<Props> = (props) => {
  const { projectId } = useParams<ParamsType>();

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

  return (
    <DragDropContext onDragEnd={updateTodoSchedule}>
      <Schedule></Schedule>
      <TagList uid={props.user.uid} projectId={projectId}></TagList>
    </DragDropContext>
  )
}

export default ProjectDetail