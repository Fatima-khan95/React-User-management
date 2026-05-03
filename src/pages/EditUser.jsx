import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserForm from '../components/UserForm'

function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [id])

  async function fetchUser() {
    setLoading(true)
    const userId = Number(id)

    // Check localStorage first
    const addedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]')
    const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '[]')

    const updatedUser = updatedUsers.find(u => u.id === userId)
    const localUser = addedUsers.find(u => u.id === userId)

    if (updatedUser) {
      setUserData(updatedUser)
      setLoading(false)
      return
    }

    if (localUser) {
      setUserData(localUser)
      setLoading(false)
      return
    }

    // If not in localStorage fetch from API
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`)
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.log('Failed to fetch user')
    }
    setLoading(false)
  }

  async function handleSubmit(formData) {
    const userId = Number(id)

    // Save updated user in localStorage
    const updatedUser = { ...formData, id: userId }
    const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '[]')
    const filtered = updatedUsers.filter(u => u.id !== userId)
    filtered.push(updatedUser)
    localStorage.setItem('updatedUsers', JSON.stringify(filtered))

    // Try API in background
    try {
      await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.log('API update failed')
    }

    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>User Management System</h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 16px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent', border: 'none',
            color: '#2563eb', cursor: 'pointer',
            fontSize: '14px', marginBottom: '16px'
          }}
        >
          ← Back to Users
        </button>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#374151' }}>
            Edit User
          </h2>

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
            <UserForm
              onSubmit={handleSubmit}
              buttonText="Update User"
              initialData={userData}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUser