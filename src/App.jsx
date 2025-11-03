import { Routes, Route, Link } from 'react-router-dom'
import User from './pages/user/user.jsx'
import Admin from './pages/admin/admin.jsx'
import Artifact from './pages/user/artifact.jsx'
import { OCRProvider } from './pages/user/OCRContext.jsx'

function App() {
  return (
    <OCRProvider>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>OCR</Link>
        <Link to="/artifact">Artifact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/artifact" element={<Artifact />} />
      </Routes>
    </OCRProvider>
  );
}

export default App;

