import React, { useEffect, useState } from "react";
import Dropdown from "./dropDown";
import { useOCR } from "./OCRContext";

// Sample JSON data - replace with import or fetch as needed
const artifactJson = [
  {
    title: "Mauryan Lion Capital",
    shortDescription: "National emblem of India, symbol of Mauryan imperial authority.",
    story: "The Lion Capital was originally atop an Ashoka pillar dating back to 250 BC.",
    recommendations: "Located in the Mauryan Collection, please handle with care."
  },
  {
    title: "Amaravati Stupa Relief",
    shortDescription: "Detailed Buddhist reliefs from an important stupa site.",
    story: "These ancient stone carvings depict Jataka tales explaining Buddha's past lives.",
    recommendations: "On display in the Amaravati Gallery."
  }
];

// Helper function to normalize text for comparison
const normalizeText = (text) => {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
};

// Helper function to check if texts are similar enough
const isSimilar = (text1, text2) => {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);
  
  // Exact match
  if (norm1 === norm2) return true;
  
  // Check if one contains the other (handles plural/singular)
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  // Check word-by-word match (at least 70% of words match)
  const words1 = norm1.split(' ');
  const words2 = norm2.split(' ');
  const matchingWords = words1.filter(word => 
    words2.some(w => w.includes(word) || word.includes(w))
  );
  
  return matchingWords.length / Math.max(words1.length, words2.length) >= 0.7;
};

// Audio Button Component
const AudioButton = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    if (!text || text === "No artifact detected yet." || 
        text.startsWith("Scan an artifact")) {
      return; // Don't speak placeholder text
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <button
      onClick={isSpeaking ? stopSpeaking : speak}
      style={{
        padding: "8px 12px",
        marginLeft: "10px",
        backgroundColor: isSpeaking ? "#dc3545" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        transition: "background-color 0.3s"
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = isSpeaking ? "#c82333" : "#0056b3";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = isSpeaking ? "#dc3545" : "#007bff";
      }}
    >
      {isSpeaking ? (
        <>
          <span>⏹</span>
        </>
      ) : (
        <>
          <span>🔊</span>
        </>
      )}
    </button>
  );
};

// Enhanced Dropdown with Audio Button
const DropdownWithAudio = ({ title, content }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <div style={{ flex: 1 }}>
        <Dropdown title={title} content={content} />
        <AudioButton text={content} />
      </div>
      
    </div>
  );
};

export default function Artifact() {
  const { ocrText } = useOCR();
  const [matchedArtifact, setMatchedArtifact] = useState(null);

  useEffect(() => {
    if (!ocrText) {
      setMatchedArtifact(null);
      return;
    }

    // Find artifact with similar matching title
    const found = artifactJson.find(artifact => 
      isSimilar(artifact.title, ocrText)
    );
    
    console.log("Match found:", found ? found.title : "None");
    setMatchedArtifact(found || null);
  }, [ocrText]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DropdownWithAudio 
        title="Artifact Name" 
        content={matchedArtifact?.title || "No artifact detected yet."}
        style={{display:"flex",justifyContent:"center"}} 
      />
      <DropdownWithAudio 
        title="Short Story Description" 
        content={matchedArtifact?.shortDescription || "Scan an artifact to see details."} 
      />
      <DropdownWithAudio 
        title="Story Behind the Artifact" 
        content={matchedArtifact?.story || "Scan an artifact to see its story."} 
      />
      <DropdownWithAudio 
        title="Recommendation" 
        content={matchedArtifact?.recommendations || "Scan an artifact to see recommendations."} 
      />
    </div>
  );
}