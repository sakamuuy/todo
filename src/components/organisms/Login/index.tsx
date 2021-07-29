import { Presentation } from './Login'
import { useLogin } from './useLogin'

export function Login() {
  const { doLogin } = useLogin();

  return (
    <Presentation doLogin={doLogin} />
  )
}