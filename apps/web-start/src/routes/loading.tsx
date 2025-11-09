import { useAuth0 } from '@auth0/auth0-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthStore } from '../zustand/auth-store';

export const Route = createFileRoute('/loading')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isAuthenticated } = useAuth0();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(isAuthenticated);
      navigate({ to: '/' });
    }
  }, [isLoading, isAuthenticated]);

  return <div>Loading...</div>;
}
