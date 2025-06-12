import { AuthService } from '@/api/services/auth.service';
import { AuthContextProps, AuthContext } from '@/contexts/authContext';
import { BasicLoginBody, CreateAccountBody } from '@cloneoverflow/common/api/auth';
import { useContext } from 'react';

export const useAuth = () => {
  const { user, authLoading, setUser, setAuthLoading } = useContext<AuthContextProps>(AuthContext);

  const login = async (data: BasicLoginBody) => {
    await AuthService.login(data);
    const user = await AuthService.getMe().catch(() => null);

    console.log('failed fetch auth user');
    setUser(user);
    return user;
  }

  const createAccount = async (data: CreateAccountBody) => {
    await AuthService.createAccount(data);
    const user = await AuthService.getMe().catch(() => null);

    setUser(user);
    return user;
  }

  const refresh = async () => {
    return await AuthService.refreshToken();
  }

  return {
    user,
    authLoading,
    login,
    createAccount,
    refresh,
    setUser,
    setAuthLoading,
  };
}