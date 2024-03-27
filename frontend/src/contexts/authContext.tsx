import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useCookie } from '../hooks/useCookie';
import { MePayload } from '../api/types/MePayload';
import { AuthService } from '../api/services/auth.service';

interface AuthContextProps {
  user: MePayload | null;
  setUser(user: MePayload | null): void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  loading: true
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<MePayload | null>(null);
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