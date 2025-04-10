import React from 'react';
import Navbar from '../Components/Navbar';

const AdminManagementScreen = () => {
  const handleNavigation = (url) => {
    window.location.href = url;
  };

  const options = [
    { icon: '👤', label: 'Manage User', url: '/admin/manage-user', bgColor: '#E3F2FD' },
    { icon: '🤝', label: 'Manage Partner', url: '/admin/manage-partner', bgColor: '#FCE4EC' },
    { icon: '🏞️', label: 'Manage Attraction', url: '/admin/manage-attraction', bgColor: '#E8F5E9' },
    { icon: '📝', label: 'Manage Review', url: '/admin/manage-review', bgColor: '#FFF3E0' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          padding: '40px 24px',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.gridContainer}>
          {options.map((option, index) => (
            <div
              key={index}
              style={{ ...styles.gridItem, backgroundColor: option.bgColor }}
              onClick={() => handleNavigation(option.url)}
            >
              <span style={styles.icon}>{option.icon}</span>
              <span style={styles.label}>{option.label}</span>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        &copy; 2025 SingScape. Created by Group FDAC - SC2006.
      </footer>
    </div>
  );
};

const styles = {
  header: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '32px',
    color: '#333',
  },

  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    width: '100%',
    maxWidth: '1200px',
  },

  gridItem: {
    borderRadius: '16px',
    padding: '32px 24px',
    width: '240px',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    color: '#111',
    fontFamily: 'Segoe UI, sans-serif',
  },

  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },

  label: {
    fontSize: '20px',
    fontWeight: '600',
  },

  footer: {
    backgroundColor: '#00002a',
    color: 'white',
    textAlign: 'center',
    padding: '16px',
    fontSize: '14px',
    marginTop: 'auto',
  },
};

export default AdminManagementScreen;
