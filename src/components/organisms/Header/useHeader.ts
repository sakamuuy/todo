import { doLogin } from '../../../utils/auth'
import { Props } from './Header'

export function useHeader(): Props {
  return {
    doLogin,
  }
}
