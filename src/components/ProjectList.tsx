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
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const projectList: Project[] = [];
        querySnapshot.forEach((snapshot) => {
          const data = { 
            id: snapshot.id,
            ...snapshot.data()
          } as Project
          projectList.push(data);
        });
        setProjects(projectList)
      });
  }, [props.user.uid])

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
          {projects.map((p) => {
            return (
              <tr key={p.id} style={{'border': '1px solid #333', 'marginLeft': '16px', 'display': 'block'}}>
                  <td style={{'padding': '8px', }}>
                  <Link to={`/projects/${p.id}`}>{p.title}</Link>
                  </td>
                  <td>
                    {/* {p.updatedAt} */}
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {projects.length? <></> : <div>未登録</div>}
    </div>
  );
}

export default ProjectList