import styled from "styled-components"
import Tag from './Tag'
import { colors } from './colors'
import { Droppable } from "react-beautiful-dnd";

const StyledList = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
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

const mockData = [
  {
    text: 'todo1'
  },
  {
    text: 'todoadsfoadi2'
  },
  {
    text: 'todgasgo3'
  },
  {
    text: 'toewaegado4'
  },
  {
    text: 'togsadgasfgasfasfdo5'
  },
  {
    text: 'todgdgao'
  },
  {
    text: 'toagdsgasdgasdo'
  },
  {
    text: 'todolast'
  },
  {
    text: 'todgdgao'
  },
  {
    text: 'toagdsgasdgasdo'
  },
  {
    text: 'todolast'
  },
  {
    text: 'todgdgao'
  },
  {
    text: 'toagdsgasdgasdo'
  },
  {
    text: 'todolast'
  },
  {
    text: 'todgdgao'
  },
  {
    text: 'toagdsgasdgasdo'
  },
  {
    text: 'todolast'
  }
];

const TagList = () => {
  return (
    <Droppable droppableId="todolist">
      {(provided) => (
        <>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {mockData.map((d,i) => <Tag key={i} id={d.text} text={d.text} index={i} />)}
          </StyledList>
          {provided.placeholder}
        </>
      )}
    </Droppable>
  );
};

export default TagList