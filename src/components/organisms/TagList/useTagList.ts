import { Props } from './TagList'
import { db } from '../../../utils/firebaseUils'
import { useContext } from 'react'
import { UserContext } from '../../../App'

export function useTagList(onUpdateTodoList: () => void): Props {

  const user = useContext(UserContext)

  const addTodo = (projectId: string) => {
    // todo: Modalize
    const name = window.prompt()
    db.collection('users')
      .doc(user?.uid)
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .add({
        name,
      })
      .then(() => {
        onUpdateTodoList()
      })
  }

  return {
    addTodo,
  }
}