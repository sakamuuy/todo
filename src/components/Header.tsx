import styled from 'styled-components';
import { colors } from './colors';
import { doLogin } from '../utils/auth';
import { VFC } from 'react';
import firebase from 'firebase'

const StyledHeader = styled.header`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.div`
  color: ${colors.pink};
  font-size: 24px;
`;

const LoginButton = styled.button`
  font-size: 12px;
  background: ${colors.secondaryPink};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

  &:active {
    opacity: 0.3;
  }
`;

type Props = {
  user: firebase.User | null
}

const Header: VFC<Props> = (props) => {

  return (
    <StyledHeader>
      <Logo>
        Scheduled-TODO
      </Logo>
      {!props.user?
      (<LoginButton onClick={doLogin}>
        Login
      </LoginButton>):<></>}
    </StyledHeader>
  )
};

export default Header;