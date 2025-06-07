import { UserStatusEnum } from '@cloneoverflow/common';
import { User, UserCreds, UserProfile } from '@core/user';

export const createUser = (params?: Partial<User>): User => {
  return User.new({
    userId: params?.userId ?? 'userId',
    username: params?.username ?? 'username',
    name: params?.name ?? 'name',
    rating: params?.rating ?? 0,
    status: params?.status ?? UserStatusEnum.USER,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
  });
};

export const createUserCreds = (params?: Partial<UserCreds>): UserCreds => {
  return UserCreds.new({
    userId: params?.userId ?? 'userId',
    email: params?.email ?? 'email',
    password: params?.password ?? 'password',
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
  });
};

export const createUserProfile = (params?: Partial<UserProfile>): UserProfile => {
  return UserProfile.new({
    userId: params?.userId ?? 'userId',
    email: params?.email ?? 'email',
    name: params?.name ?? 'name',
    username: params?.username ?? 'username',
    rating: params?.rating ?? 0,
    status: params?.status ?? UserStatusEnum.USER,
    about: params?.about ?? 'about',
    answerAmount: params?.answerAmount ?? 0,
    questionAmount: params?.questionAmount ?? 0,
    createdAt: params?.createdAt ?? new Date(),
    updatedAt: params?.updatedAt ?? new Date(),
  });
};