// ✅ src/pages/user/artifact.jsx
import { useOCR } from "./OCRContext";

export default function Artifact() {
  const { ocrText } = useOCR();
  return (
    <div style={{ color: "white", padding: 20 }}>
      <h2>Extracted Text</h2>
      <pre style={{ background: "#222", padding: 12, borderRadius: 8 }}>
        {ocrText || "No text yet..."}
      </pre>
    </div>
  );
}

