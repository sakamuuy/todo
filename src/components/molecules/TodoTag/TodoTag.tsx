import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'
import { db } from '../../../utils/firebaseUils';
import firebase from 'firebase'
import { Todo } from '../../../schema'

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

export type Props = {
  id: string;
  projectId: string;
  todoRef: firebase.firestore.DocumentReference<Todo> | undefined;
  isOpenMenu: boolean;
  onTagClick: (isOpenMenu: boolean) => void;
  onUpdateTodo: () => void;
  editTag: (todoRef: firebase.firestore.DocumentReference<Todo> | undefined, cb: () => void) => void;
  deleteTag: (todoRef: firebase.firestore.DocumentReference<Todo> | undefined, cb: () => void) => void;
}

export function Presentation(props: Props & { text: string; index: number;}) {

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <StyledTag 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          onClick={() => props.onTagClick(props.isOpenMenu)}
          >
          # {props.text}
          {props.isOpenMenu? (
            <Menu>
              <li onClick={() => props.editTag(props.todoRef, props.onUpdateTodo)} >edit</li>
              <li onClick={() => props.deleteTag(props.todoRef, props.onUpdateTodo)}>delete</li>
            </Menu>
          ) : null}
        </StyledTag>
      )}
    </Draggable>
  );
};
