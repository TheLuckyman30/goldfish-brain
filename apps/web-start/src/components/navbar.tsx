import './navbar.css';
import { Link } from '@tanstack/react-router';

interface NavbarProps {
  setSideBarOpen: (sideBarOpen: boolean) => void;
}

export function Navbar({ setSideBarOpen }: NavbarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        marginTop: '5vh',
        padding: '0 8vh',
      }}
    >
      <button
        onClick={() => setSideBarOpen(true)}
        style={{
          backgroundColor: '#6c3b27d7',
          color: 'white',
          borderRadius: '50%',
          width: '6vh',
          height: '6vh',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ☰
      </button>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          gap: '10vh',
          borderRadius: '90vh',
          backgroundColor: 'white',
          minHeight: '8vh',
          maxHeight: '10vh',
          minWidth: '40%',
          maxWidth: '60%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          color: '#6c3b27d7',
        }}
      >
        <Link to="/" className="bg-white hover:bg-sky-100 rounded-md p-5">
          Home
        </Link>
        <Link
          to="/task-lists"
          className="bg-white hover:bg-sky-100 rounded-md p-5"
        >
          Lists
        </Link>
        <Link
          to="/settings"
          className="bg-white hover:bg-sky-100 rounded-md p-5"
        >
          settings
        </Link>
      </div>
    </div>
  );
}
