import { Routes, Route } from 'react-router-dom'
import Users from './pages/Users'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
    </Routes>
  )
}

export default App