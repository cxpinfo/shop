import { hashPassword, requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  await requireAdmin();

  const form = await request.formData();
  const name = String(form.get('name') || '');
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');
  const role = String(form.get('role') || 'OPERATOR') as 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'FINANCE';

  if (!name || !email || !password) {
    return Response.json({ error: 'Preencha todos os campos.' }, { status: 400 });
  }

  await db.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
      active: true
    }
  });

  redirect('/admin/users');
}
