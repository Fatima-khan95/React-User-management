import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'

function AddUser() {
  const navigate = useNavigate()

  // POST - Add new user
  async function handleSubmit(formData) {
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      // Give unique id and save to localStorage
      const newUser = { ...formData, id: Date.now() }
      const saved = JSON.parse(localStorage.getItem('addedUsers') || '[]')
      saved.push(newUser)
      localStorage.setItem('addedUsers', JSON.stringify(saved))

    } catch (error) {
      console.log('Failed to add user')
    }
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>User Management System</h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 16px' }}>

        {/* Back Button */}
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
            Add New User
          </h2>

          {/* UserForm component */}
          <UserForm onSubmit={handleSubmit} buttonText="Add User" />
        </div>
      </div>
    </div>
  )
}

export default AddUser