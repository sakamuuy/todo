import { useContext, useEffect, useState } from 'react'
import { db } from '../../../utils/firebaseUils'
import { Project } from '../../../schema'
import { UserContext } from '../../../App'

export function useProjectList() {
  const user = useContext(UserContext)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (!user) return;

    db.collection('users')
      .doc(user.uid)
      .collection('projects')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const projectList: Project[] = []
        querySnapshot.forEach((snapshot) => {
          const data = {
            id: snapshot.id,
            ...snapshot.data(),
          } as Project
          projectList.push(data)
        })
        setProjects(projectList)
      })
  }, [user?.uid])

  return {
    projects,
  }
}