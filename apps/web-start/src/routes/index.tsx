import { createFileRoute } from '@tanstack/react-router';
import goldfishBrain from '../images/GoldfishBrain.png';
import './../styles.css';
import { useSideBarStore } from '../zustand/sidebar-store';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { sideBarOpen, setSidebarOpen } = useSideBarStore();

  return (
    <>
      <Navbar setSideBarOpen={setSidebarOpen} />
      {sideBarOpen && <Sidebar setIsOpen={setSidebarOpen} />}
      <div
        className="flex justify-center items-center min-h-lvh w-lvw pt-20 bg-cover bg-no-repeat bg-top"
        style={{
          backgroundImage: `url(${goldfishBrain})`,
        }}
      >
        <div className="flex gap-[15vh]" >
          <div className="flex justify-center items-center bg-[#794531fb] text-white rounded-[100px] w-[25vh] h-[25vh] cursor-pointer">
            Create List
          </div>
          <div className="flex justify-center items-center bg-[#794531fb] text-white rounded-[100px] w-[25vh] h-[25vh] cursor-pointer">
            View Lists
          </div>
        </div>
      </div>
    </>
  );
}
