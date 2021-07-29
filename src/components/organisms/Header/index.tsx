import { Presentation } from './Header'
import { useHeader } from './useHeader'
import { UserContext } from '../../../App'

export function Header() {
  const { doLogin } = useHeader()

  return (
    <UserContext.Consumer>
      {(value) => <Presentation user={value} doLogin={doLogin} />}
    </UserContext.Consumer>
  )
}
