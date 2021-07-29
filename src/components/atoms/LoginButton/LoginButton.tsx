import styled from 'styled-components'
import { colors } from '../../colors'

const LoginButton = styled.button`
  font-size: 12px;
  background: ${colors.secondaryPink};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

  &:active {
    opacity: 0.3;
  }
`

export function Presentation({ onclick }: { onclick: () => void }) {
  return <LoginButton onClick={onclick}>Login</LoginButton>
}
