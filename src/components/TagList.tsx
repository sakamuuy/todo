import styled from "styled-components"
import Tag from './molecules/TodoTag/TodoTag'
import { colors } from './colors'
import { Droppable } from "react-beautiful-dnd";
import { db } from "../utils/firebaseUils";
import { useEffect, useState, VFC } from 'react'
import { UnsubscribedTodo } from '../schema'
import { fetchTodoList } from './ProjectDetail'

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

  &>div {
    margin: 8px 8px 0;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  background: ${colors.blue};
  padding: 8px 16px;
  color: #fff;
  font-weight: 700;
`;

type Props = {
  uid: string,
  projectId: string,
  todoList: UnsubscribedTodo[],
  onUpdateTodoList: () => void
}

const TagList: VFC<Props> = (props) => {
  // const [todoList, setTodoList] = useState<Todo[]>([]);

  // useEffect(() => {
  //   const fetchedTodos: Todo[] = [];
    
  //   fetchTodoList({uid: props.uid, projectId: props.projectId})
  //     .then((snapshot) => {
  //       snapshot.docs.forEach(doc => {
  //         fetchedTodos.push({
  //           id: doc.id,
  //           ...doc.data()
  //         } as Todo)
  //       })

  //       setTodoList(fetchedTodos)
  //     })
  // },[props.uid, props.projectId])

  const addTodo = async() => {
    const todos = [...props.todoList];
    // todo: Modalize
    const name = window.prompt();
    const newTodo = await db.collection('users')
      .doc(props.uid)
      .collection('projects')
      .doc(props.projectId)
      .collection('todos')
      .add({
        name,
      })
    props.onUpdateTodoList();
  }

  return (
    <>
      <Droppable droppableId="todolist">
        {(provided) => (
          <>
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {props.todoList.map((d,i) => (
                <Tag 
                  key={i} 
                  id={d.id} 
                  text={d.name} 
                  index={i} 
                  uid={props.uid}
                  projectId={props.projectId}
                  onUpdateTodo={props.onUpdateTodoList} />
              ))}
            </StyledList>
            {provided.placeholder}
          </>
        )}
      </Droppable>
      <AddButton onClick={addTodo}>Add</AddButton>
    </>
  );
};

export default TagList