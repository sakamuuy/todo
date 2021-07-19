import firebase from 'firebase'
import { useState, VFC } from 'react'
import { db } from '../utils/firebaseUils'
import { Project } from '../schema'

type Props = {
  user: firebase.User
}

type ProjectSnapShot = firebase.firestore.QueryDocumentSnapshot<Project>[];

const ProjectList: VFC<Props> = (props) => {

  const [projects, setProjects] = useState<ProjectSnapShot[]>();

  db.collection('users')
    .doc(props.user.uid)
    .collection('projects')
    .get()
    .then((data) => {
      console.log(data)
      const projects = data.docs;

      // setProjects(data.docs as ProjectSnapShot);
    });

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
          </tr>
        </thead>
        <tbody>
          {projects? <div>risuto</div> : <div>プロジェクト未登録</div>}
          <tr>
            <td>

            </td>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList