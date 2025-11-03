import { Routes, Route } from 'react-router-dom'
import User from './pages/user/user.jsx'
import Admin from './pages/admin/admin.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
