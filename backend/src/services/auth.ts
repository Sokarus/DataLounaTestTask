import {AddUser, GetUserData, UpdateUserPassword} from '@models/user';
import {Hash, Compare} from '@utils/hash';

export const DoRegister = async (username: string, password: string) => {
  const hashedPassword = await Hash(password);

  await AddUser(username, hashedPassword);
};

export const DoLogin = async (username: string, password: string) => {
  const userData = await GetUserData('username', username);

  if (!(await Compare(password, userData.password_hash))) {
    throw new Error('Invalid credentials');
  }
};

export const DoChangePassword = async (
  username: string,
  oldPassword: string,
  newPassword: string
) => {
  const userData = await GetUserData('username', username);

  if (!(await Compare(oldPassword, userData.password_hash))) {
    throw new Error('Invalid credentials');
  }

  const hashedPassword = await Hash(newPassword);

  await UpdateUserPassword(username, hashedPassword);
};
