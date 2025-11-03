import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function MuseumFlowchart() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [artifactNodes, setArtifactNodes] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const workspaceRef = useRef(null);

  const mainNodes = [
    {
      id: 1,
      x: 100,
      y: 100,
      title: 'British Era Artifacts',
      subtitle: '1858-1947',
      color: { // bg-gradient-to-br from-blue-700 to-blue-900
        background: 'linear-gradient(to bottom right, #1d4ed8, #1e40af)', // approximate colors
      },
      icon: '🏰'
    },
    {
      id: 2,
      x: 800,
      y: 300,
      title: 'Mauryan Empire',
      subtitle: '322-185 BCE',
      color: { // bg-gradient-to-br from-emerald-600 to-emerald-800
        background: 'linear-gradient(to bottom right, #059669, #065f46)',
      },
      icon: '⚔️'
    },
    {
      id: 3,
      x: 400,
      y: 700,
      title: 'Harappan Civilization',
      subtitle: '3300-1300 BCE',
      color: { // bg-gradient-to-br from-amber-600 to-amber-800
        background: 'linear-gradient(to bottom right, #d97706, #854d0e)',
      },
      icon: '🏛️'
    }
  ];

  useEffect(() => {
    loadArtifacts();
  }, []);

  const loadArtifacts = async () => {
    try {
      const response = await fetch('/content/data.json');
      const artifacts = await response.json();

      const processedNodes = artifacts.map((artifact, index) => {
        const parentNo = parseInt(artifact.no);
        const parentNode = mainNodes.find(n => n.id === parentNo);
        if (!parentNode) return null;

        const offsetX = 350;
        const offsetY = index * 200 - 100;

        return {
          id: `artifact-${index}`,
          parentId: parentNo,
          x: parentNode.x + offsetX,
          y: parentNode.y + offsetY,
          artifactName: artifact['artifact Name'] || artifact.Title,
          title: artifact.Title,
          shortDescription: artifact['Short Description'],
          story: artifact.Story,
          recommendations: artifact.Recommendations
        };
      }).filter(Boolean);

      setArtifactNodes(processedNodes);
    } catch (error) {
      console.error('Error loading artifacts:', error);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(0.1, zoom + delta), 3);
    setZoom(newZoom);
  };

  const handleMouseDown = (e) => {
    if (e.target === workspaceRef.current || e.target.closest('.workspace-bg')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - pan.x,
        y: touch.clientY - pan.y
      });
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setLastTouchDistance(distance);
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (lastTouchDistance > 0) {
        const delta = (distance - lastTouchDistance) * 0.01;
        const newZoom = Math.min(Math.max(0.1, zoom + delta), 3);
        setZoom(newZoom);
      }

      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(0);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const drawConnection = (fromNode, toNode) => {
    const startX = fromNode.x + 140;
    const startY = fromNode.y + 80;
    const endX = toNode.x;
    const endY = toNode.y + 80;
    const midX = (startX + endX) / 2;
    return `M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`;
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#111827', // bg-gray-900
        overflow: 'hidden',
        position: 'relative',
        touchAction: 'none',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to right, #1f2937, #111827)', // from-gray-800 to-gray-900
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.7)',
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontSize: '1.125rem', // text-lg
            fontWeight: '700',
            color: 'white',
            margin: 0,
            marginBottom: '4px',
            // Responsive text size would normally require media queries or JS, so kept base size
          }}
        >
          Museum Flowchart
        </h1>
        <p
          style={{
            color: '#d1d5db', // text-gray-300
            fontSize: '0.75rem', // text-xs
            margin: 0,
            display: window.innerWidth >= 640 ? 'block' : 'none', // hidden sm:block
          }}
        >
          Interactive visualization of Indian historical artifacts
        </p>
        <div>
            <Link to="/"><div  style={{
    border: "1px solid black",
    padding: "0.5rem 0.75rem", // py-2 px-3
    backgroundColor: "#3b82f6", // blue-500
    color: "white",
    cursor: "pointer",
    width:"10%",
    borderRadius:"15px"
  }}>Back</div></Link>
        </div>
      </div>

      {/* Mobile Controls Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        style={{
          display: window.innerWidth >= 768 ? 'none' : 'block', // md:hidden
          position: 'absolute',
          top: '64px', // top-16
          right: '16px',
          zIndex: 30,
          backgroundColor: '#2563eb', // bg-blue-600
          borderRadius: '9999px',
          padding: '12px',
          color: 'white',
          boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.5)',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'} // hover:bg-blue-700
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
        aria-label="Toggle Controls"
      >
        <svg
          style={{ width: '24px', height: '24px' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          ></path>
        </svg>
      </button>

      {/* Controls - Desktop always visible, Mobile toggleable */}
      <div
        style={{
          position: 'absolute',
          top: window.innerWidth >= 768 ? '96px' : '64px', // md:top-24 : top-16
          left: '16px',
          zIndex: 10,
          backgroundColor: '#1f2937', // bg-gray-800
          borderRadius: '0.5rem',
          padding: window.innerWidth >= 768 ? '12px' : '8px', // md:p-3 : p-2
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.7)',
          border: '1px solid #374151', // border-gray-700
          transform: showControls ? 'translateX(0)' : window.innerWidth >= 768 ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <button
          onClick={() => setZoom(Math.min(zoom + 0.1, 3))}
          style={{
            padding: window.innerWidth >= 768 ? '8px 16px' : '8px 12px',
            backgroundColor: '#2563eb', // bg-blue-600
            color: 'white',
            borderRadius: '0.375rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Zoom +
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.1, 0.1))}
          style={{
            padding: window.innerWidth >= 768 ? '8px 16px' : '8px 12px',
            backgroundColor: '#2563eb', // bg-blue-600
            color: 'white',
            borderRadius: '0.375rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Zoom -
        </button>
        <button
          onClick={resetView}
          style={{
            padding: window.innerWidth >= 768 ? '8px 16px' : '8px 12px',
            backgroundColor: '#4b5563', // bg-gray-600
            color: 'white',
            borderRadius: '0.375rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#374151')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4b5563')}
        >
          Reset
        </button>
        <div
          style={{
            color: 'white',
            fontSize: '0.75rem',
            textAlign: 'center',
            marginTop: '4px',
            paddingTop: '8px',
            borderTop: '1px solid #374151'
          }}
        >
          {(zoom * 100).toFixed(0)}%
        </div>
      </div>

      {/* Workspace */}
      <div
        ref={workspaceRef}
        className="workspace-bg"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '100%',
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab',
          backgroundImage:
            `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          paddingTop: '60px',
          overflow: 'hidden',
          position: 'relative',
          touchAction: 'none'
        }}
      >
        {/* Canvas with nodes */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '3000px',
            height: '3000px',
            position: 'relative',
          }}
        >
          {/* SVG for connections */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {artifactNodes.map((artifactNode) => {
              const parentNode = mainNodes.find(n => n.id === artifactNode.parentId);
              if (!parentNode) return null;
              return (
                <path
                  key={artifactNode.id}
                  d={drawConnection(parentNode, artifactNode)}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>

          {/* Main nodes */}
          {mainNodes.map((node) => (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: '240px',
                minHeight: '140px',
                zIndex: 10,
                borderRadius: '0.75rem', // rounded-xl
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', // shadow-2xl
                padding: '16px', // p-4
                cursor: 'pointer',
                border: '2px solid rgba(255,255,255,0.2)',
                transition: 'box-shadow 0.3s ease',
                ...node.color,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 35px 60px -15px rgba(0, 0, 0, 0.4)'} // hover:shadow-3xl
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)'}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px', // md:gap-3 ~ 12px, using 8px here
                }}
              >
                <div
                  style={{
                    fontSize: '1.875rem', // text-3xl
                    lineHeight: 1,
                  }}
                >
                  {node.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1rem', // text-base
                      marginBottom: '4px',
                    }}
                  >
                    {node.title}
                  </h3>
                  <p
                    style={{
                      color: 'white',
                      fontSize: '0.75rem', // text-xs
                      opacity: 0.8,
                      fontWeight: '500',
                      marginBottom: '8px',
                    }}
                  >
                    {node.subtitle}
                  </p>
                  <div
                    style={{
                      color: 'white',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '0.375rem',
                      padding: '6px 8px',
                    }}
                  >
                    Main Collection
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Artifact nodes */}
          {artifactNodes.map((node) => (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: '280px',
                minHeight: '120px',
                zIndex: 20,
                borderRadius: '0.5rem', // rounded-lg
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)', // shadow-xl
                padding: '12px', // p-3
                cursor: 'pointer',
                border: '1px solid #4b5563', // border-gray-600 (#4b5563)
                background: 'linear-gradient(to bottom right, #374151, #1f2937)', // from-gray-700 to-gray-800 approximation
                color: '#d1d5db', // text-gray-300 for titles, adjusted below
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.4)'} // hover:shadow-2xl
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.3)'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1rem',
                    margin: 0,
                  }}
                >
                  {node.artifactName}
                </h4>
                <p
                  style={{
                    color: '#d1d5db',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    fontStyle: 'italic',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    margin: 0,
                  }}
                  title={node.title}
                >
                  {node.title}
                </p>
                <p
                  style={{
                    color: '#9ca3af', // text-gray-400
                    fontSize: '0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: window.innerWidth >= 768 ? '3' : '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0,
                  }}
                  title={node.shortDescription}
                >
                  {node.shortDescription}
                </p>
                <div
                  style={{
                    color: '#60a5fa', // text-blue-400
                    fontSize: '0.75rem',
                    marginTop: '4px',
                    fontWeight: '600',
                  }}
                >
                  Tap to view →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions - Responsive */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          backgroundColor: '#1f2937', // bg-gray-800
          borderRadius: '0.5rem',
          padding: window.innerWidth >= 768 ? '16px' : '12px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.7)',
          color: 'white',
          fontSize: window.innerWidth >= 768 ? '0.875rem' : '0.75rem',
          maxWidth: '320px',
          border: '1px solid #374151', // border-gray-700
        }}
      >
        <p
          style={{
            fontWeight: '600',
            marginBottom: '8px',
            color: '#3b82f6', // text-blue-400
          }}
        >
          Navigation:
        </p>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#d1d5db', // text-gray-300
            lineHeight: 1.5,
          }}
        >
          {window.innerWidth >= 768 && <li>• Scroll to zoom in/out</li>}
          {window.innerWidth < 768 && <li>• Pinch to zoom</li>}
          {window.innerWidth >= 768 && <li>• Click and drag to pan</li>}
          {window.innerWidth < 768 && <li>• Drag to pan around</li>}
          <li>• {window.innerWidth < 768 ? 'Tap' : 'Click'} nodes to explore</li>
        </ul>
      </div>
    </div>
  );
}
