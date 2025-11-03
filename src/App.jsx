import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import User from './pages/user/user.jsx';
import Admin from './pages/admin/admin.jsx';
import Artifact from './pages/user/artifact.jsx';   // ✅ default import, NOT { Artifact }
import { OCRProvider } from "./pages/user/OCRContext";

function App() {
  return (
    <OCRProvider>
      <Router>   {/* ✅ REQUIRED */}
        <nav style={{ padding: 10 }}>
          <Link to="/" style={{ marginRight: 10 }}>OCR</Link>
          <Link to="/artifact" style={{ marginRight: 10 }}>Artifact</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/artifact" element={<Artifact />} />
        </Routes>
      </Router>
    </OCRProvider>
  );
}

export default App;
