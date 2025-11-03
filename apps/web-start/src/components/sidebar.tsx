import React, { useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpening: (isOpen: boolean) => void;
    
}

export  function Sidebar( { isOpen, setIsOpening }: SidebarProps) {
 

  return (
    <div>
      {/* Top Section with Main Navbar */}
      

      {/* Sidebar*/}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : "-300px",
          height: "100vh",
          width: "300px",
          backgroundColor: "#ebf9ff",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease-in-out",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#6c3b27d7",
        }}
      >
        <button
          onClick={() => setIsOpening(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#6c3b27d7",
          }}
        >
          ✕
        </button>

        {/* Your same horizontal navbar can go here */}
        
      </div>
    </div>
  );
}
