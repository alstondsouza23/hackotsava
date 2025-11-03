import { Routes, Route, Link } from 'react-router-dom'
import User from './pages/user/user.jsx'
import Admin from './pages/admin/admin.jsx'
import ArtifactManagement from './pages/admin/ArtifactManagement.jsx'
import Artifact from './pages/user/artifact.jsx'
import { OCRProvider } from './pages/user/OCRContext.jsx'
import Half from './pages/user/half.jsx'
import MuseumFlowchart from './pages/user/flowchart.jsx'

function App() {
  return (
    <OCRProvider>
      <Routes>
        <Route path="/" element={<div><User /><Half/><Link to="/flowchart" style={{border: "1px solid black",
    padding: "0.5rem 0.75rem", // py-2 px-3
    backgroundColor: "#3b82f6", // blue-500
    color: "white",
    cursor: "pointer",display:"flex",justifyContent:"center",width:"20%", margin:"0 auto"}}>Flowchart</Link></div>} />
        <Route path="/" element={<User />} />
        <Route path="/admin/artifacts" element={<ArtifactManagement />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/artifact" element={<Artifact />} />
        <Route path="/flowchart" element={<MuseumFlowchart/>}/>
      </Routes>
    </OCRProvider>
  );
}

export default App;

