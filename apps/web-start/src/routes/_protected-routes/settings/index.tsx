import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import React, { useState } from 'react';
import fishAnimate from '../../../images/fishAnimate.gif';
import { Loading } from '../../../components/loading/loadingScreen';


export const Route = createFileRoute('/_protected-routes/settings/')({
  component: Settings,
});



function Settings() {
 

  return (
    <div
      className="flex justify-center min-h-screen  w-lvw pt-45 bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: `url(${fishAnimate})`,
      }}
    >
      <div className="flex flex-col w-[75%] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">
        <h1 className="text-5xl text-center rounded-md bg-[#fddbcd] p-10 text-[#794531fb]">
          Settings Page
        </h1>
        
        <Link to="/" className="buttonStyling shadow-lg shadow-black/20 max-w-2.5 m-5 text-center">
          Home
        </Link>
        <div className="text-2xl text-center items-center ml-35 rounded-md bg-[#fddbcd] p-10 text-[#794531fb] max-w-5xl justify-center">
          Settings options will go here.
        </div>

      </div>
    </div>
  );
}

