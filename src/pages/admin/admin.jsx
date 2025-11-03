import React, { useState, useEffect } from 'react';
import { Search, Home, BarChart3, Users, Settings, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineChart from "../../components/LineChart"; // ✅ import chart component
import { Radar } from 'react-chartjs-2'; // ✅ Import Radar chart
import HeatmapComponent from '../../components/HeatmapComponent'; // adjust path as needed
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Register Chart.js components for Radar chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (location.pathname === '/admin/artifacts') {
      setActiveTab('Artifact Management');
    } else if (location.pathname === '/admin') {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // ✅ Chart.js dataset for Line Chart
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [120, 190, 170, 220, 240, 200, 230],
        fill: true,
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.15)",
        tension: 0.4,
      }
    ]
  };

  // ✅ Chart options for Line Chart
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

  // ✅ Function to generate radar chart data for each card
  const generateRadarData = (totalScan, avgViewDuration, interactionRate, underEngagedIndicator) => {
    return {
      labels: ['Total Scan', 'Avg View Duration', 'Interaction Rate %', 'Under Engaged Indicator'],
      datasets: [
        {
          label: 'Metrics',
          data: [totalScan, avgViewDuration, interactionRate, underEngagedIndicator],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }
      ]
    };
  };

  // ✅ Radar chart options
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // ✅ Sample data for cards in each section (9 cards per section)
  const britishArtifacts = [
    { id: 1, name: 'B1 British East India Company Seal', totalScan: 85, avgViewDuration: 65, interactionRate: 78, underEngagedIndicator: 45 },
    { id: 2, name: 'B2 British Raj Railway Ticket', totalScan: 92, avgViewDuration: 88, interactionRate: 85, underEngagedIndicator: 35 },
    { id: 3, name: 'B3 Colonial Map', totalScan: 78, avgViewDuration: 72, interactionRate: 65, underEngagedIndicator: 55 },
    { id: 4, name: 'B4 East India Company’s Trade Tokens', totalScan: 88, avgViewDuration: 80, interactionRate: 82, underEngagedIndicator: 40 },
    { id: 5, name: 'B5 Enfield Musket', totalScan: 75, avgViewDuration: 70, interactionRate: 68, underEngagedIndicator: 50 },
    { id: 6, name: 'B6 Map of British India', totalScan: 82, avgViewDuration: 75, interactionRate: 73, underEngagedIndicator: 48 },
    { id: 7, name: 'B7 Official Treaties and Correspondence', totalScan: 70, avgViewDuration: 65, interactionRate: 60, underEngagedIndicator: 58 },
    { id: 8, name: 'B8 Porcelain from British Raj', totalScan: 90, avgViewDuration: 85, interactionRate: 88, underEngagedIndicator: 38 },
    { id: 9, name: 'B9 Uniform of a British Indian Officer', totalScan: 80, avgViewDuration: 78, interactionRate: 75, underEngagedIndicator: 45 }
  ];

  const mauryasArtifacts = [
    { id: 1, name: 'M1 Ashoka’s Edicts on Pillar', totalScan: 95, avgViewDuration: 90, interactionRate: 92, underEngagedIndicator: 30 },
    { id: 2, name: 'M2 Ashoka’s Rock Edicts', totalScan: 88, avgViewDuration: 82, interactionRate: 85, underEngagedIndicator: 42 },
    { id: 3, name: 'M3 Mauryan Lion Capital', totalScan: 85, avgViewDuration: 80, interactionRate: 78, underEngagedIndicator: 45 },
    { id: 4, name: 'M4 Mauryan Cave Mural Painting', totalScan: 75, avgViewDuration: 70, interactionRate: 68, underEngagedIndicator: 52 },
    { id: 5, name: 'M5 Amaravati Stupa Relief', totalScan: 90, avgViewDuration: 85, interactionRate: 88, underEngagedIndicator: 38 },
    { id: 6, name: 'M6 Buddhist Reliquary', totalScan: 82, avgViewDuration: 78, interactionRate: 75, underEngagedIndicator: 48 },
    { id: 7, name: 'M7 Iron Pillar of Delhi Replica', totalScan: 70, avgViewDuration: 65, interactionRate: 62, underEngagedIndicator: 55 },
    { id: 8, name: 'M8 Flying Celestial Couple', totalScan: 93, avgViewDuration: 88, interactionRate: 90, underEngagedIndicator: 35 },
    { id: 9, name: 'M9 Arumbaka Copper Plates (Grant)', totalScan: 80, avgViewDuration: 75, interactionRate: 72, underEngagedIndicator: 50 }
  ];

  const civilizationArtifacts = [
    { id: 1, name: 'C1 Kailasa Temple Miniature Painting', totalScan: 87, avgViewDuration: 83, interactionRate: 80, underEngagedIndicator: 43 },
    { id: 2, name: 'C2 Mysore Palace Miniature Paintings', totalScan: 72, avgViewDuration: 68, interactionRate: 65, underEngagedIndicator: 54 },
    { id: 3, name: 'C3 Siva Nataraja', totalScan: 85, avgViewDuration: 80, interactionRate: 78, underEngagedIndicator: 46 },
    { id: 4, name: 'C4 Temple Sculptural Reliefs', totalScan: 90, avgViewDuration: 86, interactionRate: 85, underEngagedIndicator: 40 },
    { id: 5, name: 'C5 Vijayanagara Bronze Statues', totalScan: 92, avgViewDuration: 88, interactionRate: 87, underEngagedIndicator: 38 },
    { id: 6, name: 'C6 Embroidered Temple Hanging', totalScan: 78, avgViewDuration: 74, interactionRate: 70, underEngagedIndicator: 50 },
    { id: 7, name: 'C7 Satavahana Coins', totalScan: 75, avgViewDuration: 70, interactionRate: 68, underEngagedIndicator: 52 },
    { id: 8, name: 'C8 Nataraja Bronze Statue', totalScan: 88, avgViewDuration: 84, interactionRate: 82, underEngagedIndicator: 42 },
    { id: 9, name: 'C9 Ceremonial Mask', totalScan: 94, avgViewDuration: 90, interactionRate: 91, underEngagedIndicator: 33 }
  ];

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'Artifact Management', icon: BarChart3, label: 'Artifact Management' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // ✅ Render section with 9 cards (2 per row)
  const renderSection = (sectionTitle, artifacts) => (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '24px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '12px'
      }}>
        {sectionTitle}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      }}>
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              padding: '20px',
              border: '1px solid #f3f4f6',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginTop: 0,
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {artifact.name}
            </h3>
            <div style={{ height: '220px' }}>
              <Radar 
                data={generateRadarData(
                  artifact.totalScan,
                  artifact.avgViewDuration,
                  artifact.interactionRate,
                  artifact.underEngagedIndicator
                )}
                options={radarOptions}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Search Bar */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '24px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
        }}>
          <div style={{ maxWidth: '896px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search anything..."
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#111827';
                  e.target.style.boxShadow = '0 0 0 3px rgba(17,24,39,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Two Content Divs */}
        <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            
            {/* ✅ Left Div — Chart Section */}
            <div
              className="graph"
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                padding: '24px',
                border: '1px solid #f3f4f6'
              }}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginTop: 0,
                marginBottom: '16px'
              }}>
                User Engagement Trends
              </h2>

              {/* 👇 Chart inside this div */}
              <div style={{ height: 360 }}>
                <LineChart data={data} options={options} />
              </div>
            </div>

            {/* ✅ Right Div — Activity Section */}
            <div className="heatmap"
  style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    padding: '24px',
    border: '1px solid #f3f4f6'
  }}
>
  <HeatmapComponent />
</div>
          </div>

          {/* ✅ Three Sections: British, Mauryas, Civilization */}
          {renderSection('British', britishArtifacts)}
          {renderSection('Mauryas', mauryasArtifacts)}
          {renderSection('Civilization', civilizationArtifacts)}
        </div>
      </div>
    </div>
  );
}
