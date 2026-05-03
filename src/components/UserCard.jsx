import { useNavigate } from 'react-router-dom'

function UserCard({ user, onDelete }) {
  const navigate = useNavigate()

  return (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{user.id}</td>
      <td style={{ padding: '12px 16px', fontWeight: '500' }}>{user.firstName}</td>
      <td style={{ padding: '12px 16px' }}>{user.lastName}</td>
      <td style={{ padding: '12px 16px', color: '#2563eb' }}>{user.email}</td>
      <td style={{ padding: '12px 16px' }}>{user.phone}</td>
      <td style={{ padding: '12px 16px' }}>
        <button
          onClick={() => navigate(`/edit-user/${user.id}`)}
          style={{
            backgroundColor: '#f59e0b', color: 'white',
            padding: '6px 12px', borderRadius: '6px',
            border: 'none', cursor: 'pointer',
            fontSize: '12px', marginRight: '8px'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          style={{
            backgroundColor: '#ef4444', color: 'white',
            padding: '6px 12px', borderRadius: '6px',
            border: 'none', cursor: 'pointer', fontSize: '12px'
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default UserCard