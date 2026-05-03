import { useState, useEffect } from 'react'

function UserForm({ onSubmit, buttonText, initialData }) {

  // useState - controls all form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  // useEffect - if editing, prefill form with existing user data
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName:  initialData.lastName  || '',
        email:     initialData.email     || '',
        phone:     initialData.phone     || ''
      })
    }
  }, [initialData])

  // Runs every time user types in any input
  function handleChange(e) {
    setFormData({
      ...formData,                     // keep all existing values
      [e.target.name]: e.target.value  // update only the changed field
    })
  }

  // Runs when form is submitted
  function handleSubmit(e) {
    e.preventDefault()    // stop page from refreshing
    onSubmit(formData)    // send data to AddUser or EditUser
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    marginTop: '4px'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4b5563'
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        <div>
          <label style={labelStyle}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            style={inputStyle}
            required
          />
        </div>

      </div>

      <button
        type="submit"
        style={{
          marginTop: '20px',
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px'
        }}
      >
        {buttonText}
      </button>
    </form>
  )
}

export default UserForm