import { createFileRoute, Link } from '@tanstack/react-router';
import fishAnimate from '../images/fishAnimate.gif';
import fishTiny from '../images/fishTiny.png';
import './../styles.css';
import { useSideBarStore } from '../zustand/sidebar-store';
import { Navbar } from '../components/shared-ui/navbar';
import { Sidebar } from '../components/shared-ui/sidebar';



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
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex gap-[15vh] ">
          <img
            src={fishTiny}
            alt="Animated Fish"
            className="w-[30vh] h-[30vh] mt-[40vh]"
            style={{
              float: 'left',
              position: 'absolute',
              left: '20vh',
              bottom: '35vh',
              zIndex: '10',
              transform: 'scaleX(-1)',
            }}
          />
          <img
            src={fishTiny}
            alt="Animated Fish"
            className="w-[30vh] h-[30vh] mt-[40vh]"
            style={{
              float: 'left',
              position: 'absolute',
              left: '135vh',
              bottom: '35vh',
              zIndex: '10',
            }}
          />

         

          <Link
            to='/task-lists'
            style={{ position: 'relative' }}
            className=" items-center relative inline-flex text-4xl rounded-[60px] w-[50vh] h-[50vh] cursor-pointer mt-[20vh] buttonJump
            group justify-center border-b-4 border-l-2 active:border-[#397078] active:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-gradient-to-tr from-[#397078] to-[#538f97]  border-[#397078] text-white"
          >
            <span className="items-center text-center absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-[60px] group-hover:w-[50vh] group-hover:h-[50vh] opacity-10"></span>
            <span className="items-center text-center">Create List</span>

          </Link>
          
          <Link
          to= '/pond'
            style={{ position: 'relative' }}
            className=" items-center buttonJump relative inline-flex text-4xl rounded-[60px] w-[50vh] h-[50vh] cursor-pointer mt-[20vh] 
            group justify-center border-b-4 border-l-2 active:border-[#397078] active:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-gradient-to-tr from-[#397078] to-[#538f97]  border-[#397078] text-white"
          >
            <span className="items-center text-center absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-[60px] group-hover:w-[50vh] group-hover:h-[50vh] opacity-10"></span>
            <span className="items-center text-center">Go to Pond</span>

          </Link>
        </div>
      </div>
    </>
  );
}
