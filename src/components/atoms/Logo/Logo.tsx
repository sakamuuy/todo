import styled from 'styled-components'
import { colors } from '../../colors'

export function Presentation() {
  const Logo = styled.div`
    color: ${colors.pink};
    font-size: 24px;
  `

  return <Logo>Scheduled-TODO</Logo>
}
