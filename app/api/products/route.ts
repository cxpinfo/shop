import { db } from '@/lib/db';

export async function GET() {
  const products = await db.product.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  return Response.json(products);
}
