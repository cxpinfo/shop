import { PrismaClient, ProductStatus, Role } from '@prisma/client';
import { hashPassword } from '../lib/auth';
import { applyMargin } from '../lib/pricing';
import { slugify } from '../lib/utils';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@coxipoinformatica.com.br';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Coxipo@2026';
  const adminName = process.env.ADMIN_NAME || 'Administrador Coxipó';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: Role.ADMIN,
      active: true
    }
  });

  const sampleProducts = [
    {
      sku: 'CXP-SSD-480',
      name: 'SSD 480GB SATA 2.5',
      description: 'SSD com ótimo desempenho para upgrade de notebooks e desktops.',
      category: 'Armazenamento',
      brand: 'Coxipó Select',
      supplier: 'Importação inicial',
      basePrice: 179.9,
      stock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80'
    },
    {
      sku: 'CXP-MEM-16',
      name: 'Memória DDR4 16GB 3200MHz',
      description: 'Memória DDR4 para desktop, excelente para performance e multitarefa.',
      category: 'Memória',
      brand: 'Coxipó Select',
      supplier: 'Importação inicial',
      basePrice: 229.9,
      stock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=80'
    },
    {
      sku: 'CXP-GAB-001',
      name: 'Gabinete Mid Tower RGB',
      description: 'Gabinete gamer com lateral em vidro e excelente circulação de ar.',
      category: 'Gabinetes',
      brand: 'Coxipó Select',
      supplier: 'Importação inicial',
      basePrice: 299.9,
      stock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  for (const item of sampleProducts) {
    await prisma.product.upsert({
      where: { sku: item.sku },
      update: {},
      create: {
        sku: item.sku,
        name: item.name,
        slug: slugify(item.name),
        description: item.description,
        category: item.category,
        brand: item.brand,
        supplier: item.supplier,
        basePrice: item.basePrice,
        marginPercent: 25,
        finalPrice: applyMargin(item.basePrice, 25),
        stock: item.stock,
        imageUrl: item.imageUrl,
        status: ProductStatus.PUBLISHED
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
