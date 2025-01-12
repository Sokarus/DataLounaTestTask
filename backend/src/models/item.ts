import sql from '@db';

export const GetItem = async (id: number) => {
  try {
    const products = await sql`
          SELECT id, name, price 
          FROM products 
          WHERE id = ${id}
      `;

    return products[0] || null;
  } catch (err) {
    throw new Error(`Get product data error! ${(err as Error).message}`);
  }
};
