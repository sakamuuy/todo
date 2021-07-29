import styled from 'styled-components';
import firebase from 'firebase';
import { Logo } from '../../atoms/Logo';
import { LoginButton } from '../../atoms/LoginButton';

const StyledHeader = styled.header`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid #eee;
`;

export type Props = {
  doLogin: () => void
}

export function Presentation(props: Props & { user: firebase.User | null}) {
  return (
    <StyledHeader>
      <Logo />
      {!props.user? <LoginButton onclick={props.doLogin} /> :<></>}
    </StyledHeader>
  )
}
