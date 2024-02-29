import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { AuthService } from '../api/services/auth.service';
import { AuthLoginDTO } from '../api/dtos/auth.login.dto';
import { useCookie } from './useCookie';
import { AuthSignupDTO } from '../api/dtos/auth.signup.dto';
import { AuthTokens } from '../api/types/AuthTokens';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const { user, accessToken, loading, setUser, setToken } = useContext(AuthContext);
  const { set } = useCookie();

  const setAuthTokens = (tokens: AuthTokens) => {
    const tokenExpiration = jwtDecode(tokens.refresh_token).exp ?? 7*24*60*60;

    set('access_token', tokens.access_token);
    set('refresh_token', tokens.refresh_token, {
      expires: new Date(tokenExpiration*1000),
    });
    setToken(tokens.access_token);
  };

  const login = async (data: AuthLoginDTO) => {
    const tokens = await AuthService.login(data);
    setAuthTokens(tokens);
    return tokens
  }

  const singup = async (data: AuthSignupDTO) => {
    const tokens = await AuthService.signup(data);
    setAuthTokens(tokens);
    return tokens
  }

  return {
    user,
    accessToken,
    loading,
    login,
    singup,
    setUser,
    setAuthTokens,
  };
}