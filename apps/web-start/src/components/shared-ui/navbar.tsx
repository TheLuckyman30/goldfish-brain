import { useAuth0 } from '@auth0/auth0-react';
import { Link } from '@tanstack/react-router';
import '../navbar.css';
import { useSideBarStore } from '../../zustand/sidebar-store';

const getNavItems = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return [
      { name: 'Home', link: '/' },
      { name: 'Task Lists', link: '/task-lists' },
      { name: 'Pond', link: '/pond' },
      { name: 'Profile', link: '/settings' },
    ];
  }
  return [];
};

export function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const setSidebarOpen = useSideBarStore((state) => state.setSidebarOpen);
  const navItems = getNavItems(isAuthenticated);

  return (
    <div className="flex items-center justify-between w-full absolute mt-[5vh] pl-[8vh] z-20">
      <button
        className="bg-[#6c3b27d7] text-white rounded-[50%] w-[6vh] h-[6vh] border-none cursor-pointer"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
      <div className="absolute left-[50%] gap-[5vw] rounded-[90vh] bg-white min-h-[8vh] max-h-[10vh] min-w-[40%] max-w-[60%] items-center justify-center flex text-[#6c3b27d7] transform -translate-x-[50%]">
        {navItems.map((item, index) => (
          <Link
            to={item.link}
            className="bg-white hover:bg-sky-100 rounded-md p-5 buttonJump"
            key={index}
          >
            <span className="relative group-hover:text-white">{item.name}</span>
          </Link>
        ))}
        {!isAuthenticated && (
          <button
            onClick={() =>
              loginWithRedirect({ authorizationParams: { prompt: 'consent' } })
            }
            className="bg-white hover:bg-sky-100 rounded-md p-5 cursor-pointer buttonJump"
          >
            Login
          </button>
        )}
        {isAuthenticated && (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="bg-white hover:bg-sky-100 rounded-md p-5 cursor-pointer buttonJump"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
