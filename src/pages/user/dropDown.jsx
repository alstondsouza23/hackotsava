import { useState } from "react";

export default function Dropdown({ title, content, audioButton }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: "100%", marginBottom: "12px" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "12px 14px",
          background: "#222",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <span style={{ fontWeight: "bold" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div
          style={{
            marginTop: "6px",
            background: "#333",
            color: "white",
            padding: "12px 14px",
            borderRadius: "8px",
          }}
        >
          {content}
          {audioButton && (
            <div style={{ marginTop: "12px" }}>
              {audioButton}
            </div>
          )}
        </div>
      )}
    </div>
  );
}