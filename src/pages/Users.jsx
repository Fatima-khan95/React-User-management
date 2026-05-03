import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from '../components/UserCard'

function Users() {

  // useState - stores the list of users
  const [users, setUsers] = useState([])

  // useState - tracks if data is loading
  const [loading, setLoading] = useState(true)

  // useNavigate - lets us go to another page
  const navigate = useNavigate()

  // useEffect - runs automatically when page opens
  useEffect(() => {
    fetchUsers()
  }, [])

  // GET - fetch all users from API
async function fetchUsers() {
  setLoading(true)
  try {
    const response = await fetch('https://dummyjson.com/users')
    const data = await response.json()

    // Get locally added users
    let localUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]')

    // Get locally updated users
    const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '[]')

    // Apply updates to locally added users
    localUsers = localUsers.map(user => {
      const updated = updatedUsers.find(u => u.id === user.id)
      return updated ? updated : user
    })

    // Apply updates to API users
    const mergedApiUsers = data.users.map(user => {
      const updated = updatedUsers.find(u => u.id === user.id)
      return updated ? updated : user
    })

    // Combine all
    setUsers([...localUsers, ...mergedApiUsers])

  } catch (error) {
    console.log('Failed to load users')
  }
  setLoading(false)
}
  // DELETE - remove a user
  async function deleteUser(id) {
    if (!confirm('Are you sure?')) return
    try {
      await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE'
      })
      setUsers(users.filter(user => user.id !== id))
    } catch (error) {
      console.log('Failed to delete')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>User Management System</h1>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>All Users</h2>
          <button
            onClick={() => navigate('/add-user')}
            style={{
              backgroundColor: '#2563eb', color: 'white',
              padding: '10px 20px', borderRadius: '8px',
              border: 'none', cursor: 'pointer', fontWeight: '600'
            }}
          >
            + Add New User
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div style={{
              width: '40px', height: '40px',
              border: '4px solid #bfdbfe',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          /* Table */
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#2563eb', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>First Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Last Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onDelete={deleteUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users