import { Presentation } from './LoginButton'

export function LoginButton({onclick}: {onclick: () => void}) {
  return (
    <Presentation onclick={onclick} />
  )
}