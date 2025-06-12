import * as React from 'react';

import { AuthService } from '@/api/services/auth.service';
import { GetMeResponse } from '@cloneoverflow/common/api/auth';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  user: GetMeResponse | null;
  setUser(user: GetMeResponse | null): void;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => { },
  authLoading: true,
  setAuthLoading: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<GetMeResponse | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      const user = await AuthService.getMe().catch(() => null);
      if (user) {
        setUser(user);
        return;
      }

      console.log('no token');
    };

    authorize().finally(() => setAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, setUser, setAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}