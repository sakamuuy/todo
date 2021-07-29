import { useEffect, useState, useContext } from 'react'
import firebase from 'firebase'
import { Todo } from '../../../schema'
import { UserContext } from '../../../App'
import { db } from '../../../utils/firebaseUils'
import { Props } from './TodoTag'

export function useTodoTag({
  projectId,
  id,
}: {
  projectId: string
  id: string
}): Props {
  const [todoRef, setTodoRef] =
    useState<firebase.firestore.DocumentReference<Todo>>()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const user = useContext(UserContext)

  useEffect(() => {
    if (!user) return
    const todoRef = db
      .collection('users')
      .doc(user.uid)
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc(id)
    setTodoRef(todoRef as firebase.firestore.DocumentReference<Todo>)
  }, [user!.uid, projectId, id])

  return {
    id,
    projectId,
    todoRef,
    isOpenMenu,
    onTagClick: (isOpenMenu: boolean) => setIsOpenMenu(!isOpenMenu),
    onUpdateTodo: () => {},
    editTag(
      todoRef: firebase.firestore.DocumentReference<Todo> | undefined,
      cb: () => void
    ) {
      if (!todoRef) {
        throw new Error('has no tag ref.')
      }

      const newName = window.prompt()

      if (!newName) {
        return alert('required')
      }

      todoRef.get().then(async (snapshot) => {
        const d = snapshot.data()

        await todoRef?.set({
          ...d,
          name: newName,
        } as Todo)

        cb()
      })
    },
    deleteTag(
      todoRef: firebase.firestore.DocumentReference<Todo> | undefined,
      cb: () => void
    ) {
      todoRef?.delete().then(cb)
    },
  }
}
