import { Presentation } from './TodoTag'
import { useTodoTag } from './useTodoTag'

export function TodoTag(
  pProjectId: string,
  pId: string,
  pText: string,
  pIndex: number
) {
  const props = useTodoTag({ projectId: pProjectId, id: pId })

  return <Presentation text={pText} index={pIndex} {...props} />
}
