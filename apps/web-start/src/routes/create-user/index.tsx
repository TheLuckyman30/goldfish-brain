import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import goldfishBrain from '../../images/fishAnimate.gif';
import fishTiny from '../../images/fishTiny.png';

import { useApiMutation, useCurrentUser } from '../../integrations/api';
import type { UpdateUser, UserOut } from '@repo/api/user';
import { Loading } from '../../components/loading/loadingScreen';

export const Route = createFileRoute('/create-user/')({
  component: CreateUser,
});

function CreateUser() {
  const [newName, setNewName] = useState<string>('');
  const [newUserName, setNewUserName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const navigate = useNavigate();
  const { data } = useCurrentUser();
  const mutation = useApiMutation<UpdateUser, UserOut>({
    endpoint: () => ({ path: '/users', method: 'PATCH' }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate({ to: '/' });
    }
  }, [mutation.isSuccess]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page reload

    if (data) {
      mutation.mutate({
        id: data.id,
        name: newName,
        username: newUserName,
        email: newEmail,
      });
    }
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-top h-full w-full"
      style={{ backgroundImage: `url(${goldfishBrain})` }}
    >
      <div className="fixed flex justify-center items-center inset-0 w-lvw h-lvh bg-white/10 backdrop-blur-sm">
      <img
            src={fishTiny}
            alt="Animated Fish"
            className="w-[30vh] h-[30vh]"
            style={{
              float: 'left',
              position: 'absolute',
              left: '58vw',
              top: '12vh',
              zIndex: '20',
            }}
          />
        <div className="flex flex-col bg-[#538f97] p-10 rounded-lg w-[30%] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">
          <h1 className="block text-2xl text-white font-bold mb-5">Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className= "text-white">
                <label
                  className="block mb-2 font-medium text-sm "
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="block border border-gray-300 p-2.5 text-gray-700 text-sm w-full focus:outline-blue-400 min-w-fit h-[6vh] bg-white rounded-[60px] mb-1"
                  placeholder="Name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  id="name"

                ></input>
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-sm text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="block border border-gray-300 p-2.5 text-gray-700 text-sm w-full focus:outline-blue-400 min-w-fit h-[6vh] bg-white rounded-[60px] mb-1"
                  placeholder="Username"
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  id="username"
                ></input>
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-sm text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block border border-gray-300 p-2.5 text-gray-700 text-sm w-full focus:outline-blue-400 min-w-fit h-[6vh] bg-white rounded-[60px] mb-1"
                  placeholder="Email"
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  id="email"
                ></input>
              </div>
              <div>
                <button
                  className="block text-center w-full bg-[#5acdb9] p-2 rounded-[60px] h-[6vh] text-white font-bold text-lg cursor-pointer hover:bg-[#4eb89a] hover:scale-102 duration-100"
                  type="submit"
                >
                  Submit
                </button>
                {mutation.isPending && <Loading></Loading>}
                {mutation.isError && <div>{mutation.error.message}</div>}
                {mutation.isSuccess && <div>Updated</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
