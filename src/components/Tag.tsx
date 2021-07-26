import { useState, VFC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  id: string,
  text: string,
  index: number
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
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const onTagClick = () => {
    setIsOpenMenu(!isOpenMenu);
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
              <li>edit</li>
              <li>delete</li>
            </Menu>
          ) : null}
        </StyledTag>
      )}
    </Draggable>
  );
};

export default Tag