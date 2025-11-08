import { useAuth0 } from '@auth0/auth0-react';
import './navbar.css';
import { Link } from '@tanstack/react-router';

interface NavbarProps {
  setSideBarOpen: (sideBarOpen: boolean) => void;
}

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Task Lists', link: '/task-lists' },
  { name: 'Settings', link: '/settings' },
];

export function Navbar({ setSideBarOpen }: NavbarProps) {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex items-center justify-between w-full absolute mt-[5vh] pl-[8vh]">
      <button
        className="bg-[#6c3b27d7] text-white rounded-[50%] w-[6vh] h-[6vh] border-none cursor-pointer"
        onClick={() => setSideBarOpen(true)}
      >
        ☰
      </button>

      <div className="absolute left-[50%] gap-[10vh] rounded-[90vh] bg-white min-h-[8vh] max-h-[10vh] min-w-[40%] max-w-[60%] items-center justify-center flex text-[#6c3b27d7] transform -translate-x-[50%]">
        {navItems.map((item, index) => (
          <Link
            to={item.link}
            className="bg-white hover:bg-sky-100 rounded-md p-5"
            key={index}
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={() =>
            loginWithRedirect({ authorizationParams: { prompt: 'consent' } })
          }
          className="bg-white hover:bg-sky-100 rounded-md p-5 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
