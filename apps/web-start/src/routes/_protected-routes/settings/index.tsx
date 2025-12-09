import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState, useEffect } from 'react';
import fishAnimate from '../../../images/fishAnimate.gif';
import { Loading } from '../../../components/loading/loadingScreen';
import Button from '../../../components/shared-ui/Button';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import userImage from '../../../images/user.png';
import { UpdateUser, type UserOut } from '@repo/api/user';
import Input from '../../../components/shared-ui/Input';
import { Check, Pencil, X } from 'lucide-react';

export const Route = createFileRoute('/_protected-routes/settings/')({
  component: Settings,
});

function Settings() {
  const [showUsernameForm, setShowUsernameForm] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showNameForm, setShowNameForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [PasswordText, setPasswordText] = useState<string>('');

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
      setName(userData.name);
      setEmail(userData.email);
    } else {
      setUsername('Failed to fetch username.');
      setEmail('Failed to fetch email');
      setName('Failed to fetch name');
    }
  }, [userData]);

  // Reset Password
  const resetPasswordMutation = useApiMutation({
    endpoint: () => ({
      path: '/users/reset-password',
      method: 'POST',
    }),
  });
  // Update User
  const updateUserMutation = useApiMutation<UpdateUser, UserOut>({
    endpoint: () => ({
      path: '/users',
      method: 'PATCH',
    }),
    invalidateKeys: [['me']],
  });

  function updateUsername() {
    setShowUsernameForm(false);
    updateUserMutation.mutate({ username });
  }

  function updateName() {
    setShowNameForm(false);
    updateUserMutation.mutate({ name });
  }

  function resetPassword() {
    try {
      resetPasswordMutation.mutate({});
      setPasswordText('Password reset email sent!');
    } catch {
      setPasswordText('Email failed to send!');
    }
  }

  if (isFetchingProvider || isFetchingUser || updateUserMutation.isPending) {
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
              <div className="text-left p-1">
                <p className="p-4 mb-2">Username:</p>
                <p className="p-4 mb-2">Name:</p>
                <p className="p-4">Email:</p>
              </div>
              <div className="text-left wrap-break-word w-fit">
                <div className="flex gap-2 items-center">
                  {!showUsernameForm && <p className="p-4 mb-2">{username}</p>}
                  {showUsernameForm && (
                    <Input
                      id="new-username"
                      type="text"
                      placeholder="New Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-fit min-w-fit p-4 bg-white rounded-[60px] border border-gray-300 mb-1"
                    />
                  )}
                  <div className="bg-stone-50 p-2 h-fit w-fit rounded-lg">
                    {!showUsernameForm && (
                      <Pencil
                        className="text-blue-300 cursor-pointer hover:scale-110 duration-150"
                        onClick={() => setShowUsernameForm(!showUsernameForm)}
                      />
                    )}
                    {showUsernameForm && (
                      <div className="flex gap-5">
                        <Check
                          className="text-emerald-300 cursor-pointer hover:scale-115 duration-150"
                          onClick={updateUsername}
                        />
                        <X
                          className="text-rose-400 cursor-pointer hover:scale-115 duration-150"
                          onClick={() => {
                            setShowUsernameForm(!showUsernameForm);
                            setUsername(userData?.username ?? '');
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {!showNameForm && <p className="p-4 mb-2">{name}</p>}
                  {showNameForm && (
                    <Input
                      id="new-name"
                      type="text"
                      placeholder="New Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-fit min-w-fit p-4 bg-white rounded-[60px] border border-gray-300 mb-1"
                    />
                  )}
                  <div className="bg-stone-50 p-2 h-fit w-fit rounded-lg">
                    {!showNameForm && (
                      <Pencil
                        className="text-blue-300 cursor-pointer hover:scale-110 duration-150"
                        onClick={() => setShowNameForm(!showNameForm)}
                      />
                    )}
                    {showNameForm && (
                      <div className="flex gap-5">
                        <Check
                          className="text-emerald-300 cursor-pointer hover:scale-115 duration-150"
                          onClick={updateName}
                        />
                        <X
                          className="text-rose-400 cursor-pointer hover:scale-115 duration-150"
                          onClick={() => {
                            setShowNameForm(!showNameForm);
                            setName(userData?.name ?? '');
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <p className="p-4">{email}</p>
              </div>
            </div>
            <hr className="mt-10 mb-5"></hr>
            <div className="flex flex-col rounded-md bg-[#fddbcd] p-10 text-[#794531fb] text-2xl text-center justify-center">
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
