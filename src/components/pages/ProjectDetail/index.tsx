import { Presentation } from './ProjectDetail'
import { useProjectDetail } from './useProjectDetail'

export function ProjectDetail() {
  const props = useProjectDetail()

  return (
    <Presentation {...props} />
  )
}