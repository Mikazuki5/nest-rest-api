import { UserEntity } from '../userEntity';

export type UserResponseType = Omit<UserEntity, 'password'> & {
  access_token: string;
};
