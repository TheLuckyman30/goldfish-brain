import { createFileRoute } from '@tanstack/react-router';
import goldfishBrain from '../../images/GoldfishBrain.png';

export const Route = createFileRoute('/create-user/')({
  component: CreateUser,
});

function CreateUser() {
  return (
    <div
      className={`bg-[url(${goldfishBrain})] bg-cover bg-no-repeat bg-top h-full w-full`}
    >
      Hello
    </div>
  );
}
