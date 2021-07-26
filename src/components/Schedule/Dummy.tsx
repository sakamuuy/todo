import { VFC } from 'react'
import { Draggable } from "react-beautiful-dnd"
import { Col } from './index'

type Props = {
  id: string,
  index: number,
}

const Dummy: VFC<Props> = (props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => {
        return (
          <Col ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}></Col>
        )
      }}
    </Draggable>
  );
};

export default Dummy;