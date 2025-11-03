import { Routes, Route, Link } from 'react-router-dom'
import User from './pages/user/user.jsx'
import Admin from './pages/admin/admin.jsx'
import ArtifactManagement from './pages/admin/ArtifactManagement.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/artifacts" element={<ArtifactManagement />} />
    </Routes>
  )
}

export default App;

