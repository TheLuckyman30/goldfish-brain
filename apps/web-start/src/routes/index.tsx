import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import goldfishBrain from '../images/GoldfishBrain.png';
import { url } from 'inspector';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return(

    <body style={{backgroundImage: `url(${goldfishBrain})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top', }}
    >
      
      <Sidebar isOpen={false} setIsOpening={function (isOpen: boolean): void {
          throw new Error('Function not implemented.');
        } }></Sidebar>
      <Navbar></Navbar>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15vh", // space between buttons
          marginTop: "40vh",
        }}
      >
        <div
          
          style={{
            backgroundColor: "#6c3b27",
            color: "white",
            borderRadius: "50%",
            width: "25vh",
            height: "25vh",
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Create List
        </div>

        <div
          
          style={{
            backgroundColor: "#6c3b27",
            color: "white",
            borderRadius: "50%",
            width: "25vh",
            height: "25vh",
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          View Lists
        </div>
      </div>

      
    


    </body>



  );
}
