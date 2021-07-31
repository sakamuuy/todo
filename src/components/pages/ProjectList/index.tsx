import { Presentation } from "./ProjectList";
import { useProjectList } from "./useProjectList";

export function ProjectList() {
  const props = useProjectList()

  return (
    <Presentation {...props}/>
  )
}