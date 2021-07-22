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
  align-items: center;
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

  useEffect(() => {
    const todoList: Todo[] = [];
    db.collection('users')
      .doc(props.uid)
      .collection('projects')
      .doc(props.projectId)
      .collection('todos')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          todoList.push({
            id: doc.id,
            ...doc.data()
          } as Todo)
        })

        console.log(todoList)
      })
  },[props.uid, props.projectId])

  const addTodo = async() => {
    const tmp = [...todoList];
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

    tmp.push((await newTodo.get()).data() as Todo);
    setTodoList(tmp);
  }

  return (
    <>
      <Droppable droppableId="todolist">
        {(provided) => (
          <>
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((d,i) => <Tag key={i} id={d.name} text={d.name} index={i} />)}
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