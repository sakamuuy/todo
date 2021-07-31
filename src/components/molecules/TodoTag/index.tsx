import { Presentation } from './TodoTag'
import { useTodoTag } from './useTodoTag'

type Props = {
  projectId: string
  id: string
  text: string
  index: number
}

export function TodoTag({projectId, id, text, index}: Props) {
  const props = useTodoTag({ projectId: projectId, id: id })

  return <Presentation text={text} index={index} {...props} />
}
