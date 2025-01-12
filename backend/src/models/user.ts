import sql from '@db';

export const AddUser = async (username: string, password: string) => {
  try {
    await sql`
        INSERT INTO users 
        (username, password_hash) 
        VALUES (${username}, ${password})
        `;
  } catch (err) {
    throw new Error(
      `Insert to users error! ${err instanceof Error ? err.message : 'Unknown error'}`
    );
  }
};

export const GetUserData = async (by: string, value: string | number) => {
  const allowedFields = ['id', 'username', 'password_hash', 'balance'];

  if (!allowedFields.includes(by)) {
    throw new Error(`Invalid field name: ${by}`);
  }

  try {
    const users = await sql`
      SELECT id, username, password_hash, balance 
      FROM users 
      WHERE ${sql([by])} = ${value}
  `;

    return users[0] || null;
  } catch (err) {
    throw new Error(`Get user data error! ${(err as Error).message}`);
  }
};

export const UpdateUserPassword = async (username: string, password: string) => {
  try {
    await sql`UPDATE users SET password_hash = ${password} WHERE username = ${username}`;
  } catch (err) {
    throw new Error(`Update user password error! ${(err as Error).message}`);
  }
};
