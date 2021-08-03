import {DragDropContext, DropResult, ResponderProvided} from 'react-beautiful-dnd'
import Schedule from '../../organisms/Schedule'
import {TagList} from '../../organisms/TagList'
import { SubscribedTodo, UnsubscribedTodo } from '../../../schema'

export type Props = {
  updateTodoSchedule: (result: DropResult, provided: ResponderProvided) => void
  subscribedTodos: SubscribedTodo[]
  unsubuscribedTodos: UnsubscribedTodo[]
  updateTodoList: () => void
  projectId: string
}

export function Presentation(props: Props) {

  return (
    <DragDropContext onDragEnd={props.updateTodoSchedule}>
      <Schedule todoList={props.subscribedTodos} />
      <TagList
        projectId={props.projectId}
        todoList={props.unsubuscribedTodos}
        onUpdateTodoList={props.updateTodoList}
      />
    </DragDropContext>
  )
}
