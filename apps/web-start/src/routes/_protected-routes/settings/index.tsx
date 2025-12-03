import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import React, { useEffect, useState } from 'react';
import fishAnimate from '../../../images/fishAnimate.gif';
import { Loading } from '../../../components/loading/loadingScreen';
import Button from '../../../components/shared-ui/Button';
import { useApiQuery } from '../../../integrations/api';
import { EditUsernameForm } from '../../../components/settings/EditUsernameForm'


export const Route = createFileRoute('/_protected-routes/settings/')({
  component: Settings,
});

function resetPassword() {
  // update password api call
}

function toggleNight() {

}

function Settings() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const {data, isFetching} = useApiQuery<{provider: string}>(['auth-type'], '/users/me/auth-type');
  const provider = data?.provider ?? 'external';
  const isExternalAccount = provider !== 'auth0';

  function updateUsername() {
   setShowForm(true); 
  }

  if (isFetching) {
    return (
      <Loading></Loading>
    );
  }

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
          Edit Account Details
          <br></br>{isExternalAccount ? "You may not edit details from an external account, please update those details from your " + provider + " account." : ""}
          <Button onClick={() => updateUsername()} disabled={isExternalAccount}>Update Username</Button>
          <Button onClick={() => resetPassword()} disabled={isExternalAccount}>Send Password Reset Email</Button>
        </div>
        <br></br>
        <div className="text-2xl text-center items-center ml-35 rounded-md bg-[#fddbcd] p-10 text-[#794531fb] max-w-5xl justify-center">
          Themes
          <Button onClick={() => toggleNight()}>Toggle Night Mode</Button>
        </div>
      </div>
      <EditUsernameForm
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
}

