import { db } from "../utils/firebaseUils"
import firebase from 'firebase'
import { VFC, useState, FormEvent } from "react";


type Props = {
  user: firebase.User,
}

const ProjectForm: VFC<Props> = (props) => {
  const [title, setTitle] = useState<string>('');

  const createProject = (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      return alert('未入力')
    }

    db.collection('users')
      .doc(props.user.uid)
      .collection('projects')
      .add({
        title,
        updatedAt: new Date()
      })
      .then((docRef) => {
        console.log(docRef)
        window.location.href = `/projects/${docRef.id}`
      })
      .catch((err) => {
        alert('作成失敗')
      })
  };

  return (
    <form onSubmit={createProject}>
      <label>
        タイトル
        <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} ></input>
      </label>
      <button type="submit">
        作成
      </button>
    </form>
  )
}

export default ProjectForm;