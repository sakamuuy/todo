import firebase from 'firebase'
import { useEffect, useState, VFC } from 'react'
import { db } from '../utils/firebaseUils'
import { Project } from '../schema'
import { Link } from 'react-router-dom'

type Props = {
  user: firebase.User
}

const ProjectList: VFC<Props> = (props) => {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    db.collection('users')
      .doc(props.user.uid)
      .collection('projects')
      .get()
      .then((querySnapshot) => {
        const projectList: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Project
          projectList.push(data);
        });
        setProjects([])
      });
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              プロジェクト名
            </th>
            <th>
              最終更新日
            </th>
            <th>
              <button>
                <Link to={`/add`}>新規追加</Link>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

            </td>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
      {projects.length? <></> : <div>未登録</div>}
    </div>
  );
}

export default ProjectList