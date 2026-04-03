import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { applyMargin } from '@/lib/pricing';
import { slugify } from '@/lib/utils';
import Papa from 'papaparse';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  await requireAdmin();

  const form = await request.formData();
  const file = form.get('file') as File | null;
  const supplier = String(form.get('supplier') || 'Fornecedor principal');

  if (!file) {
    return Response.json({ error: 'Arquivo não enviado.' }, { status: 400 });
  }

  const content = await file.text();
  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true
  });

  let imported = 0;
  let skipped = 0;

  for (const row of parsed.data) {
    const sku = row.sku?.trim();
    const name = row.name?.trim();
    const basePrice = Number(String(row.basePrice || '0').replace(',', '.'));

    if (!sku || !name || Number.isNaN(basePrice) || basePrice <= 0) {
      skipped += 1;
      continue;
    }

    const exists = await db.product.findUnique({ where: { sku } });
    const payload = {
      sku,
      name,
      slug: slugify(name + '-' + sku.slice(-4)),
      description: row.description?.trim() || 'Produto importado automaticamente para a Coxipó Informática.',
      category: row.category?.trim() || 'Geral',
      brand: row.brand?.trim() || null,
      supplier,
      basePrice,
      marginPercent: 25,
      finalPrice: applyMargin(basePrice, 25),
      stock: Number(row.stock || '0'),
      imageUrl: row.imageUrl?.trim() || null,
      status: 'PUBLISHED' as const
    };

    if (exists) {
      await db.product.update({
        where: { sku },
        data: payload
      });
    } else {
      await db.product.create({ data: payload });
    }

    imported += 1;
  }

  await db.importLog.create({
    data: {
      supplier,
      sourceType: 'CSV',
      totalItems: parsed.data.length,
      importedItems: imported,
      skippedItems: skipped,
      notes: 'Margem automática de 25% aplicada com publicação direta.'
    }
  });

  redirect('/admin/imports');
}
