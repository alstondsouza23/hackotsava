import React, { useState, useEffect } from 'react';
import { Search, Home, BarChart3, Users, Settings, Menu, X, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineChart from "../../components/LineChart"; // ✅ import chart component

export default function ArtifactManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: false, text: 'Hello! How can I help you with artifact information?' }
  ]);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setActiveTab('Artifact Management');
    } else if (location.pathname === '/admin/artifacts') {
      setActiveTab('Artifact Management');
    }
  }, [location.pathname]);

  // ✅ Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Weekly Active Users"
      },
      legend: {
        position: "top",
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'Artifact Management', icon: BarChart3, label: 'Artifact Management' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Artifact data for 3 sections with 9 cards each
  const artifactSections = [
    {
      title: 'British',
      artifacts: Array.from({ length: 9 }, (_, i) => ({
        id: `british-${i + 1}`,
        name: `British Artifact ${i + 1}`,
        period: '1700-1900',
        description: 'Colonial era artifact'
      }))
    },
    {
      title: 'Mauryas',
      artifacts: Array.from({ length: 9 }, (_, i) => ({
        id: `mauryas-${i + 1}`,
        name: `Mauryan Artifact ${i + 1}`,
        period: '322-185 BCE',
        description: 'Ancient Mauryan dynasty artifact'
      }))
    },
    {
      title: 'Civilisation',
      artifacts: Array.from({ length: 9 }, (_, i) => ({
        id: `civilisation-${i + 1}`,
        name: `Civilisation Artifact ${i + 1}`,
        period: 'Various periods',
        description: 'Historical civilisation artifact'
      }))
    }
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessages = [...chatMessages, { user: true, text: chatInput }];
      setChatMessages(newMessages);
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages([...newMessages, { 
          user: false, 
          text: `I received your message: "${chatInput}". How else can I assist you with artifacts?` 
        }]);
      }, 1000);
      
      setChatInput('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9fafb',
      margin: 0,
      padding: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? '256px' : '80px',
          background: 'linear-gradient(to bottom, #111827, #000000)',
          color: 'white',
          transition: 'width 0.3s',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
      >
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {isSidebarOpen && <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              padding: '8px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'white',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '0 16px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'Artifact Management') {
                    navigate('/admin/artifacts');
                  } else if (item.id === 'home') {
                    navigate('/admin');
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? 'white' : 'transparent',
                  color: isActive ? 'black' : 'white',
                  boxShadow: isActive ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseOver={(e) => !isActive && (e.currentTarget.style.backgroundColor = '#1f2937')}
                onMouseOut={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Icon size={20} />
                {isSidebarOpen && <span style={{ fontWeight: '500' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Middle Section - Artifact Cards */}
      <div style={{
        flex: '1',
        padding: '24px',
        overflowY: 'auto',
        backgroundColor: '#f9fafb'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
          Artifact Information
        </h2>

        {artifactSections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '22px', 
              fontWeight: '600', 
              marginBottom: '16px', 
              color: '#1f2937',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              {section.title}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {section.artifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    border: '1px solid #e5e7eb'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: '#111827'
                  }}>
                    {artifact.name}
                  </h4>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    marginBottom: '4px' 
                  }}>
                    <strong>Period:</strong> {artifact.period}
                  </p>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280' 
                  }}>
                    {artifact.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Chatbot */}
      <div style={{
        width: '350px',
        backgroundColor: 'white',
        borderLeft: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Chatbot Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#111827',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Artifact Assistant
          </h3>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            Ask me anything about artifacts
          </p>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              style={{
                alignSelf: message.user ? 'flex-end' : 'flex-start',
                backgroundColor: message.user ? '#007bff' : '#f1f1f1',
                color: message.user ? 'white' : 'black',
                padding: '10px 14px',
                borderRadius: '12px',
                maxWidth: '80%',
                fontSize: '14px',
                wordWrap: 'break-word'
              }}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: '10px 16px',
              backgroundColor: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
