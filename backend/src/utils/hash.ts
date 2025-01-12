import bcrypt from 'bcryptjs';

export const Hash = async (value: string) => {
  return bcrypt.hash(value, 10);
};

export const Compare = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};
