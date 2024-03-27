import * as React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookie } from '../hooks/useCookie';

export const PrivateRoute = () => {
  const { user, loading, setUser } = useAuth();
  const { get } = useCookie()

  if (loading) {
    return <div>Loading...</div>;
  }
  else if (user && get('access_token')) {
    return <Outlet/>;
  }

  setUser(null);
  return <Navigate to="/auth/login" />;
}