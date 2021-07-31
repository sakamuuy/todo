import { Project } from '../../../schema'
import { Link } from 'react-router-dom'

export type Props = {
  projects: Project[]
}

export function Presentation(props: Props) {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>プロジェクト名</th>
            <th>最終更新日</th>
            <th>
              <button>
                <Link to={`/add`}>新規追加</Link>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.projects.map((p) => {
            return (
              <tr
                key={p.id}
                style={{
                  border: '1px solid #333',
                  marginLeft: '16px',
                  display: 'block',
                }}
              >
                <td style={{ padding: '8px' }}>
                  <Link to={`/projects/${p.id}`}>{p.title}</Link>
                </td>
                <td>{/* {p.updatedAt} */}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {props.projects.length ? <></> : <div>未登録</div>}
    </div>
  )
}
