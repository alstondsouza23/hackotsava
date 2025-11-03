import { Routes, Route } from 'react-router-dom'
import User from './pages/user/user.jsx'
import Admin from './pages/admin/admin.jsx'

function App() {
  return (
    <div>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>OCR</Link>
        <Link to="/artifact">Artifact</Link>
      </nav>
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/admin" element={<Admin />}/>
      <Route path='/artifact' element={<OCRProvider/>}/>
    </Routes>
    </div>
  )
}

export default App
