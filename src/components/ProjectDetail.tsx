import { DragDropContext } from "react-beautiful-dnd"
import Schedule from "./Schedule"
import TagList from "./TagList"
import firebase from 'firebase'
import { VFC } from 'react'
import { useParams } from 'react-router'

type Props = {
  user: firebase.User
}

type ParamsType = {
  projectId: string
}

const ProjectDetail: VFC<Props> = (props) => {
  const { projectId } = useParams<ParamsType>();

  return (
    <DragDropContext onDragEnd={() => console.log('end')}>
      <Schedule></Schedule>
      <TagList uid={props.user.uid} projectId={projectId}></TagList>
    </DragDropContext>
  )
}

export default ProjectDetail