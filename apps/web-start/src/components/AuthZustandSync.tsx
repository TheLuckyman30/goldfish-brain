import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useAuthStore } from '../zustand/auth-store';

function AuthZustandSync() {
  const { isLoading, isAuthenticated } = useAuth0();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(isAuthenticated);
    }
  }, [isLoading, isAuthenticated]);

  return null;
}

export default AuthZustandSync;
