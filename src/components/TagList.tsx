import styled from "styled-components"
import Tag from './Tag'
import { colors } from './colors'
import { Droppable } from "react-beautiful-dnd";
import { db } from "../utils/firebaseUils";
import { useEffect, useState, VFC } from 'react'
import { Todo } from '../schema'

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
  projectId: string
}

const TagList: VFC<Props> = (props) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchTodoList = () => {
    return db.collection('users')
      .doc(props.uid)
      .collection('projects')
      .doc(props.projectId)
      .collection('todos')
      .get()
  }

  useEffect(() => {
    const fetchedTodos: Todo[] = [];
    
    fetchTodoList()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          fetchedTodos.push({
            id: doc.id,
            ...doc.data()
          } as Todo)
        })

        setTodoList(fetchedTodos)
      })
  },[props.uid, props.projectId])

  const addTodo = async() => {
    const todos = [...todoList];
    // todo: Modalize
    const name = window.prompt();
    const newTodo = await db.collection('users')
      .doc(props.uid)
      .collection('projects')
      .doc(props.projectId)
      .collection('todos')
      .add({
        name,
      });
    newTodo.get().then((snapshot) => {
      const todo = snapshot.data();
      todos.push({
        id: snapshot.id,
        ...todo,
      } as Todo)
      setTodoList(todos);
    })
  }

  const onUpdateTodoList = () => {
    const fetchedTodos: Todo[] = [];
    
    fetchTodoList()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          fetchedTodos.push({
            id: doc.id,
            ...doc.data()
          } as Todo)
        })

        setTodoList(fetchedTodos)
      })
  }

  return (
    <>
      <Droppable droppableId="todolist">
        {(provided) => (
          <>
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((d,i) => (
                <Tag 
                  key={i} 
                  id={d.id} 
                  text={d.name} 
                  index={i} 
                  uid={props.uid}
                  projectId={props.projectId}
                  onUpdateTodo={onUpdateTodoList} />
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