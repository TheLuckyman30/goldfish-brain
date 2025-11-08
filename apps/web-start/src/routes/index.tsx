import { createFileRoute } from '@tanstack/react-router';
import goldfishBrain from '../images/GoldfishBrain.png';
import './../styles.css';
import { useSideBarStore } from '../zustand/sidebar-store';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

export const Route = createFileRoute('/')({
  component: Dashboard,
});

function Dashboard() {
  const { sideBarOpen, setSidebarOpen } = useSideBarStore();

  return (
    <>
      <Navbar setSideBarOpen={setSidebarOpen} />
      {sideBarOpen && <Sidebar setIsOpen={setSidebarOpen} />}
      <body
        style={{
          backgroundImage: `url(${goldfishBrain})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15vh', // space between buttons
            marginTop: '40vh',
          }}
        >
          <div
            style={{
              backgroundColor: '#794531fb',
              color: 'white',
              borderRadius: '50%',
              width: '25vh',
              height: '25vh',
              border: 'none',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            Create List
          </div>

          <div
            style={{
              backgroundColor: '#794531fb',
              color: 'white',
              borderRadius: '50%',
              width: '25vh',
              height: '25vh',
              border: 'none',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            View Lists
          </div>
        </div>
      </body>
    </>
  );
}
