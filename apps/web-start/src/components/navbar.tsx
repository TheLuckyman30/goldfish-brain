import { useState } from "react";
import "./navbar.css";
import { Sidebar } from "./sidebar";



export function Navbar() {
      const [isOpen, setIsOpen] = useState(false);
    

    return(
        <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    marginTop: "5vh",
    padding: "0 8vh", 
  }}
>

  <button
    onClick={() => setIsOpen(true)}
    style={{
      backgroundColor: "#6c3b27d7",
      color: "white",
      borderRadius: "50%",
      width: "6vh",
      height: "6vh",
      border: "none",
      cursor: "pointer",
    }}
  >
    ☰
  </button>

  <div
    style={{
      position: "absolute", 
      left: "50%",
      transform: "translateX(-50%)",
      gap: "10vh",
      borderRadius: "90vh",
      backgroundColor: "white",
      minHeight: "8vh",
      maxHeight: "10vh",
      minWidth: "40%",
      maxWidth: "60%",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      color: "#6c3b27d7",
    }}
  >
    <div className="bg-white hover:bg-sky-100 rounded-md p-5">Home</div>
    <div className="bg-white hover:bg-sky-100 rounded-md p-5">About</div>
    <div className="bg-white hover:bg-sky-100 rounded-md p-5">Contact</div>
  </div>

  {isOpen && <Sidebar isOpen={isOpen} setIsOpening={setIsOpen} />}
</div>

        


    )
    


}