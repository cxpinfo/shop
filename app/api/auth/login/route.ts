import { createSession, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const user = await db.user.findUnique({ where: { email: body.email } });

    if (!user || !user.active) {
      return Response.json({ error: 'Usuário não encontrado ou inativo.' }, { status: 401 });
    }

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) {
      return Response.json({ error: 'Senha inválida.' }, { status: 401 });
    }

    await createSession({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Não foi possível autenticar.' }, { status: 400 });
  }
}
