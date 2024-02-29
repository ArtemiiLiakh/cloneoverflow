import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useCookie } from '../hooks/useCookie';
import { MePayload } from '../api/types/MePayload';
import { AuthService } from '../api/services/auth.service';

interface AuthContextProps {
  user: MePayload | null;
  accessToken: string | null;
  setUser(user: MePayload | null): void;
  setToken(token: string | null): void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  setUser: () => {},
  setToken: () => {},
  loading: true
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { get, set } = useCookie();
  const [user, setUser] = useState<MePayload | null>(null);
  const [accessToken, setToken] = useState<string | null>(get('access_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      if (accessToken) {
        setUser(await AuthService.getMe(accessToken).catch(() => null));
        return;
      }

      const refreshToken = get('refresh_token');
      if (refreshToken) {
        const tokens = await AuthService.refreshToken().catch(() => null);

        if (!tokens) {
          console.log('no token');
          return;
        }
        setUser(await AuthService.getMe(tokens.access_token).catch(() => null));

        setToken(tokens.access_token);
        set('access_token', tokens.access_token);
      }
      else {
        console.log('no token');
      }
    };
    
    authorize().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}