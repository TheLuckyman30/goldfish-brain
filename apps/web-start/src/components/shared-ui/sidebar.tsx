import { Link } from '@tanstack/react-router';
import '../sidebar.css';
import { useSideBarStore } from '../../zustand/sidebar-store';

export function Sidebar() {
  const setSidebarOpen = useSideBarStore((state) => state.setSidebarOpen);

  return (
    <div className="sidebar absolute">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '300px',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          transition: 'left 0.3s ease-in-out',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: '#6c3b27d7',
        }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#6c3b27d7',
          }}
        >
          ✕
        </button>

        <div
          style={{
            marginBottom: '20px',
            padding: '4px 10%',
            borderRadius: '6px',
            marginTop: '4rem',
          }}
        >
          <h3 style={{ textAlign: 'left', fontSize: '4vh' }}>Welcome !</h3>
          <hr
            style={{
              backgroundColor: '#f8d8d1',
              border: '1px solid #6c3b27d7',
            }}
          />
          <br />
          <Link to="/pond" className="buttonStyle">
            Pond
          </Link>
          <br />
          <Link to="/task-lists" className="buttonStyle">
            Task Lists
          </Link>
          <br />
          <Link to="/profile" className="buttonStyle">
            Profile
          </Link>
          <br />
          <Link to="/settings" className="buttonStyle">
            Settings
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
}
