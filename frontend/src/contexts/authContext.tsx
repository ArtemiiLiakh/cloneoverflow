import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { AuthService } from '../api/services/auth.service';
import { GetMeResponse } from '@clone-overflow/common';

interface AuthContextProps {
  user: GetMeResponse | null;
  setUser(user: GetMeResponse | null): void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  loading: true
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<GetMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      const user = await AuthService.getMe().catch(() => null);
      if (user) {
        setUser(user);
        return;
      }

      console.log('no token');
    };
    
    authorize().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}