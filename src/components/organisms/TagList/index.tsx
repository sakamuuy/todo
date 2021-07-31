import { UnsubscribedTodo } from "../../../schema";
import { Presentation } from "./TagList";
import { useTagList } from "./useTagList";

export function TagList({onUpdateTodoList, todoList, projectId}:{onUpdateTodoList: () => void, todoList: UnsubscribedTodo[], projectId: string}) {
  const props = useTagList(onUpdateTodoList);

  return (
    <Presentation {...props} todoList={todoList} projectId={projectId} />
  )
}