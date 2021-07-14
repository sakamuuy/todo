import { VFC } from 'react';
import styled from 'styled-components';

type Props = {
  text: string,
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
    <StyledTag>
      # {props.text}
    </StyledTag>
  );
};

export default Tag