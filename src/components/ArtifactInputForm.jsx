import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const ArtifactInputForm = ({ collectionName, onSubmit, isLoading }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    'Artifact Name': '',
    'Type': '',
    'Period': '',
    'Location': ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData['Artifact Name'] || !formData.Type || !formData.Period || !formData.Location) {
      alert('Please fill in all fields');
      return;
    }

    await onSubmit(formData);
    
    // Reset form
    setFormData({
      'Artifact Name': '',
      'Type': '',
      'Period': '',
      'Location': ''
    });
    setIsFormOpen(false);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
        >
          <Plus size={18} />
          Add {collectionName} Artifact
        </button>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '2px solid #111827'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Add New {collectionName} Artifact
            </h4>
            <button
              onClick={() => setIsFormOpen(false)}
              style={{
                padding: '4px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Artifact Name *
                </label>
                <input
                  type="text"
                  name="Artifact Name"
                  value={formData['Artifact Name']}
                  onChange={handleChange}
                  placeholder="Enter artifact name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Type *
                </label>
                <input
                  type="text"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  placeholder="Enter artifact type"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Period *
                </label>
                <input
                  type="text"
                  name="Period"
                  value={formData.Period}
                  onChange={handleChange}
                  placeholder="Enter time period"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Location *
                </label>
                <input
                  type="text"
                  name="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '12px',
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginTop: '8px',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                {isLoading ? 'Adding...' : 'Add Artifact'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArtifactInputForm;
