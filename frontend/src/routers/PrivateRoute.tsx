import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookie } from '../hooks/useCookie';
import { AuthService } from '../api/services/auth.service';

export const PrivateRoute = () => {
  const { user, setUser, authLoading, setAuthLoading } = useAuth();
  const { get } = useCookie();

  useEffect(() => {
    if (get('access_token')) return;

    setAuthLoading(true);

    AuthService.getMe().then((user) => {
      setUser(user);
    }).catch(() => {
      setUser(null);
    }).finally(() => {
      setAuthLoading(false);
    });
  }, []);

  if (authLoading) {
    return <></>;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
}