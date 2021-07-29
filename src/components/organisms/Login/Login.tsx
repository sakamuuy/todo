import styled from 'styled-components'
import { colors } from '../../colors'

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
`

const LoginButton = styled.button`
  font-size: 16px;
  background: ${colors.secondaryPink};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

  &:active {
    opacity: 0.3;
  }
`

export type Props = {
  doLogin: () => void
}

export function Presentation({ doLogin }: Props) {
  return (
    <Box>
      <div style={{ textAlign: 'center' }}>
        <LoginButton onClick={doLogin}>Login</LoginButton>
        <p>with your Google account.</p>
      </div>
    </Box>
  )
}
