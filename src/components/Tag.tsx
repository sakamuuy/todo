import { VFC } from 'react';
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
`;

const Tag: VFC<Props> = (props: Props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <StyledTag ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          # {props.text}
        </StyledTag>
      )}
    </Draggable>
  );
};

export default Tag