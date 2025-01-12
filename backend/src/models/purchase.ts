import sql from '@db';

export const Purchase = async (balance: number, userId: number, productId: null) => {
  try {
    await sql.begin(async (tx) => {
      await tx`UPDATE users SET balance = ${balance} WHERE id = ${userId}`;
      await tx`INSERT INTO purchases (user_id, product_id) VALUES (${userId}, ${productId})`;
    });
  } catch (err) {
    throw new Error(`Purchase error (update users and purchses)! ${(err as Error).message}`);
  }
};
