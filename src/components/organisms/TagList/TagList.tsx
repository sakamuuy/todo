import styled from 'styled-components'
import { TodoTag } from '../../molecules/TodoTag'
import { colors } from '../../colors'
import { Droppable } from 'react-beautiful-dnd'
import { db } from '../../../utils/firebaseUils'
import { useEffect, useState, VFC } from 'react'
import { UnsubscribedTodo } from '../../../schema'
import { fetchTodoList } from '../../pages/ProjectDetail/ProjectDetail'

const StyledList = styled.div`
  display: flex;
  // position: fixed;
  // bottom: 0;
  flex-wrap: wrap;
  align-items: start;
  padding: 8px 8px 16px;
  border-top: 1px solid #eee;
  background: ${colors.lightgreen};
  height: 220px;
  overflow-y: scroll;

  & > div {
    margin: 8px 8px 0;
  }
`

const AddButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  background: ${colors.blue};
  padding: 8px 16px;
  color: #fff;
  font-weight: 700;
`

export type Props = {
  addTodo: (projectId: string) => void
}

export function Presentation(props: Props & { projectId: string; todoList: UnsubscribedTodo[] }) {

  return (
    <>
      <Droppable droppableId="todolist">
        {(provided) => (
          <>
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {props.todoList.map((d, i) => (
                <TodoTag
                  projectId={props.projectId}
                  id={d.id}
                  text={d.name}
                  index={i}
                />
              ))}
            </StyledList>
            {provided.placeholder}
          </>
        )}
      </Droppable>
      <AddButton onClick={() => props.addTodo(props.projectId)}>Add</AddButton>
    </>
  )
}
