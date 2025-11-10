import { createFileRoute } from '@tanstack/react-router';
import fishAnimate from '../images/fishAnimate.gif';
import fishTiny from '../images/fishTiny.png';
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
          backgroundImage: `url(${fishAnimate})`,
      backgroundAttachment: "fixed", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}
      >
        <div className="flex gap-[15vh] " >
          <img src={fishTiny} alt="Animated Fish" className="w-[30vh] h-[30vh] mt-[40vh]" style={{float: "left", position: "absolute",left: "20vh",bottom: "35vh",zIndex: "1000", transform: "scaleX(-1)"}} />
          <img src={fishTiny} alt="Animated Fish" className="w-[30vh] h-[30vh] mt-[40vh]" style={{float: "left", position: "absolute",left: "135vh",bottom: "35vh",zIndex: "1000"}} />

          <div style={{position: "relative"}} className="bg-[#538f97] hover:bg-[#397078] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]  flex justify-center items-center  text-white text-4xl rounded-[20px] w-[50vh] h-[50vh] cursor-pointer mt-[40vh]">
            Create List
          </div>
          <div className=" bg-[#538f97] hover:bg-[#397078] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]  flex justify-center items-center  text-white text-4xl rounded-[20px] w-[50vh] h-[50vh] cursor-pointer mt-[40vh]">
            View Lists
          </div>
        </div>
      </div>
    </>
  );
}
