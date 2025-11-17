import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import goldfishBrain from '../../images/GoldfishBrain.png';
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
        <div className="flex flex-col bg-white p-10 rounded-lg w-[30%]">
          <h1 className="block text-2xl font-bold mb-5">Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div>
                <label
                  className="block mb-2 font-medium text-sm text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="block border border-gray-300 p-2.5 bg-gray-50 rounded-lg text-sm w-full focus:outline-blue-400"
                  placeholder="Name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  id="name"
                ></input>
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-sm text-gray-900"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="block border border-gray-300 p-2.5 bg-gray-50 rounded-lg text-sm w-full focus:outline-blue-400"
                  placeholder="Username"
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  id="username"
                ></input>
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-sm text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block border border-gray-300 p-2.5 bg-gray-50 rounded-lg text-sm w-full focus:outline-blue-400"
                  placeholder="Email"
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  id="email"
                ></input>
              </div>
              <div>
                <button
                  className="block text-center w-full bg-emerald-400 p-2 rounded-md text-white font-bold text-lg cursor-pointer hover:scale-102 duration-100"
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
