const HeatmapComponent = () => {
  // Engagement data
  const data = {
    British: [
      { id: 'B1', value: 5 },
      { id: 'B2', value: 9 },
      { id: 'B3', value: 3 },
      { id: 'B4', value: 7 },
      { id: 'B5', value: 3 },
      { id: 'B6', value: 5 },
      { id: 'B7', value: 1 },
      { id: 'B8', value: 8 },
      { id: 'B9', value: 5 }
    ],
    Maurya: [
      { id: 'M1', value: 10 },
      { id: 'M2', value: 7 },
      { id: 'M3', value: 6 },
      { id: 'M4', value: 3 },
      { id: 'M5', value: 8 },
      { id: 'M6', value: 5 },
      { id: 'M7', value: 1 },
      { id: 'M8', value: 9 },
      { id: 'M9', value: 4 }
    ],
    Civilization: [
      { id: 'C1', value: 7 },
      { id: 'C2', value: 2 },
      { id: 'C3', value: 6 },
      { id: 'C4', value: 8 },
      { id: 'C5', value: 9 },
      { id: 'C6', value: 4 },
      { id: 'C7', value: 3 },
      { id: 'C8', value: 7 },
      { id: 'C9', value: 10 }
    ]
  };

  // Function to get blue shade based on engagement value (1-10)
  const getBlueShade = (value) => {
    const shades = [
      '#EFF6FF', // 1 - Very light blue
      '#DBEAFE', // 2
      '#BFDBFE', // 3
      '#93C5FD', // 4
      '#60A5FA', // 5
      '#3B82F6', // 6
      '#2563EB', // 7
      '#1D4ED8', // 8
      '#1E40AF', // 9
      '#1E3A8A'  // 10 - Very dark blue
    ];
    return shades[value - 1] || shades[0];
  };

  const Section = ({ title, blocks }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '12px',
        marginTop: 0
      }}>
        {title}
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px'
      }}>
        {blocks.map((block) => (
          <div
            key={block.id}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backgroundColor: getBlueShade(block.value)
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151'
            }}>
              {block.id}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#4b5563',
              marginTop: '2px'
            }}>
              {block.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#111827',
          marginTop: 0,
          marginBottom: '4px'
        }}>
          Engagement Heatmap
        </h2>
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          margin: 0
        }}>
          Visualizing engagement values across sections
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '20px'
      }}>
        <Section title="British" blocks={data.British} />
        <Section title="Maurya" blocks={data.Maurya} />
        <Section title="Civilization" blocks={data.Civilization} />
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{
          fontSize: '13px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px',
          marginTop: 0
        }}>
          Engagement Scale
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#6b7280' }}>Low (1)</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
              <div
                key={val}
                style={{
                  width: '24px',
                  height: '20px',
                  borderRadius: '3px',
                  backgroundColor: getBlueShade(val)
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: '#6b7280' }}>High (10)</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapComponent;