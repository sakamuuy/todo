import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'
import { db } from '../utils/firebaseUils';
import firebase from 'firebase'
import { Todo } from '../schema'

type Props = {
  id: string,
  text: string,
  index: number,
  uid: string,
  projectId: string
}

const StyledTag = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  color: #666;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;
  position: relative;
`;

const Menu = styled.ul`
  position: absolute;
  top: -32px;
  right: -180px;
  width: 160px;
  // height: 24px;
  background: #fff;
  z-index: 5;

  &>li {
    padding: 12px;
  }
`;

const Tag: VFC<Props> = (props: Props) => {
  const [todoRef, setTodoRef] = useState<firebase.firestore.DocumentReference<Todo>>();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    const ref = db.collection('users')
      .doc(props.uid)
      .collection('projects')
      .doc(props.projectId)
      .collection('todos')
      .doc(props.id)
    setTodoRef(ref as firebase.firestore.DocumentReference<Todo>)
  }, [props.uid, props.projectId, props.id]);

  const onTagClick = () => {
    setIsOpenMenu(!isOpenMenu);
  } 

  const editTag = () => {
    if (!todoRef) {
      throw Error('has no tag ref.')
    }

    const newName = window.prompt();

    if (!newName) {
      return alert('required')
    }
    todoRef.get().then((snapshot) => {
      const d = snapshot.data()
      todoRef.set({
        ...d,
        name: newName
      } as Todo)
    })
  }

  const deleteTag = () => {

  }

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <StyledTag 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          onClick={onTagClick}
          >
          # {props.text}
          {isOpenMenu? (
            <Menu>
              <li onClick={editTag} >edit</li>
              <li>delete</li>
            </Menu>
          ) : null}
        </StyledTag>
      )}
    </Draggable>
  );
};

export default Tag