import styled from "styled-components";
import { colors } from './colors';
import { doLogin } from '../utils/auth';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
`;

const LoginButton = styled.button`
  font-size: 16px;
  background: ${colors.secondaryPink};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

  &:active {
    opacity: 0.3;
  }
`;

// const Text = styled.p`
//   font-size: 12px;
//   color: #888;
//   text-align: center;
// `;

const Login = () => {
  return (
    <Box>
      <div style={{ textAlign: 'center'}}>
        <LoginButton onClick={doLogin}>Login</LoginButton>
        <p>with your Google account.</p>
      </div>
    </Box>
  )
}

export default Login;