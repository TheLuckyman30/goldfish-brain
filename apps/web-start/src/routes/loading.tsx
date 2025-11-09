import { useAuth0 } from '@auth0/auth0-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthStore } from '../zustand/auth-store';
import { useCurrentUser } from '../integrations/api';

export const Route = createFileRoute('/loading')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { data, isLoading: isUserLoading } = useCurrentUser();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isUserLoading) {
      setIsAuthenticated(isAuthenticated);
      if (data?.name && data.email && data.username) {
        navigate({ to: '/' });
      }
      navigate({ to: '/create-user' });
    }
  }, [isLoading, isAuthenticated, isUserLoading]);

  return <div>Loading...</div>;
}
