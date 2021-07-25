import { VFC } from 'react'
import { Draggable } from "react-beautiful-dnd"
import styled from 'styled-components'

type Props = {
  id: string,
  index: number,
  children: React.ReactChild
}

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
  font-size: 10px;
  font-weight: 700;
  color: #666;
  height: 24px;
`;

const Dummy: VFC<Props> = (props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => {
        return (
          <Col ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {props.children? props.children : null}
          </Col>
        )
      }}
    </Draggable>
  );
};

export default Dummy;