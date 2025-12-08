import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState, useEffect } from 'react';
import fishAnimate from '../../../images/fishAnimate.gif';
import { Loading } from '../../../components/loading/loadingScreen';
import Button from '../../../components/shared-ui/Button';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import userImage from '../../../images/user.png';
import type { UserOut } from '@repo/api/user';
import Input from '../../../components/shared-ui/Input';
import { Pencil, X } from 'lucide-react';

export const Route = createFileRoute('/_protected-routes/settings/')({
  component: Settings,
});

function Settings() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [PasswordText, setPasswordText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  // Provider Data
  const { data: providerData, isFetching: isFetchingProvider } = useApiQuery<{
    provider: string;
  }>(['auth-type'], '/users/me/auth-type');
  const provider = providerData?.provider ?? 'external';
  const isExternalAccount = provider !== 'auth0';
  // User Data
  const { data: userData, isFetching: isFetchingUser } = useApiQuery<UserOut>(
    ['me'],
    '/users/me',
  );

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    } else {
      setUsername('Failed to fetch username.');
    }
  }, [userData]);
  const email = userData?.email;

  // Reset password
  const resetPasswordMutation = useApiMutation({
    endpoint: () => ({
      path: '/users/reset-password',
      method: 'POST',
    }),
  });

  function updateUsername() {
    setShowForm(true);
  }

  function resetPassword() {
    try {
      resetPasswordMutation.mutate({});
      setPasswordText('Password reset email sent!');
    } catch {
      setPasswordText('Email failed to send!');
    }
  }

  if (isFetchingProvider || isFetchingUser) {
    return <Loading />;
  }

  return (
    <div
      className="flex justify-center min-h-screen  w-lvw pt-45 bg-no-repeat bg-cover bg-top pb-5"
      style={{
        backgroundImage: `url(${fishAnimate})`,
      }}
    >
      <div className="flex flex-col w-[75%] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] pb-5">
        <h1 className="text-5xl text-center rounded-md bg-[#fddbcd] p-10 text-[#794531fb] font-bold">
          Profile
        </h1>

        <Link
          to="/"
          className="buttonStyling shadow-lg shadow-black/20 max-w-2.5 m-5 text-center"
        >
          Home
        </Link>
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="w-full max-w-5xl mx-auto rounded-md bg-[#fddbcd] p-10 text-[#794531fb]">
            <div className="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-4 text-2xl items-center">
              <div>
                <img src={userImage} className="max-w-[100px]"></img>
              </div>
              <div className="text-left">
                <p className="p-4">Username:</p>
                <p className="p-4">Email:</p>
              </div>
              <div className="text-left wrap-break-word min-h-1/2 w-fit">
                <div className="flex gap-2 items-center">
                  {!showForm && <p className="p-4">{username}</p>}
                  {showForm && (
                    <Input
                      id="new-username"
                      type="text"
                      placeholder="New Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  )}
                  <span
                    className="bg-[#794531fb] p-2 h-fit wi-fit rounded-lg"
                    onClick={() => setShowForm(!showForm)}
                  >
                    {!showForm && <Pencil className="text-white" />}
                    {showForm && <X className="text-white" />}
                  </span>
                </div>

                <p className="p-4">{email}</p>
              </div>
            </div>
            <hr className="mt-10"></hr>
            <div className="rounded-md bg-[#fddbcd] p-10 text-[#794531fb] text-2xl text-center items-center">
              Edit Account Details
              <br></br>
              {isExternalAccount
                ? 'You may not edit details from an external account, please update those details from your ' +
                  provider +
                  ' account.'
                : ''}
              <Button
                style={{
                  color: 'white',
                  background: '#6c3b27d7',
                }}
                onClick={() => updateUsername()}
                disabled={isExternalAccount}
              >
                Update Username
              </Button>
              <Button
                style={{
                  color: 'white',
                  background: '#6c3b27d7',
                }}
                onClick={() => resetPassword()}
                disabled={isExternalAccount}
              >
                Send Password Reset Email
              </Button>
              <p>{PasswordText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
