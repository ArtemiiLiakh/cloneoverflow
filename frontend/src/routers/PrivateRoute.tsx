import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useCookie } from '../hooks/useCookie';
import { AuthService } from '../api/services/auth.service';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user, setUser, authLoading } = useAuth();
  const { get } = useCookie();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (get('access_token')) {
      setLoading(false);
      return;
    };

    AuthService.getMe().then((user) => {
      setUser(user);
    }).catch((err) => {
      console.log(err);
      setUser(null);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading || authLoading) {
    return <></>;
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" />;
}