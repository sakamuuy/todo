import { doLogin } from '../../../utils/auth'
import { Props } from './Login'

export function useLogin(): Props {
  return {
    doLogin,
  }
}
