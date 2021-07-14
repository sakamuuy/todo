import styled from "styled-components"
import Tag from './Tag'
import { colors } from './colors'

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
    text: 'todo'
  },
  {
    text: 'todoadsfoadi'
  },
  {
    text: 'todgasgo'
  },
  {
    text: 'toewaegado'
  },
  {
    text: 'togsadgasfgasfasfdo'
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
    <StyledList>
      {mockData.map((d,i) => <Tag key={i} text={d.text} />)}
    </StyledList>
  );
};

export default TagList