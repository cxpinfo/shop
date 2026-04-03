import { AdminShell } from '@/components/AdminShell';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await requireAdmin();
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Usuários e permissões" user={{ name: session.name, email: session.email, role: session.role }}>
      <div className="card" style={{ padding: 24, marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>Criar novo usuário</h3>
        <form className="form-grid" action="/api/users" method="post">
          <label className="field">
            <span>Nome</span>
            <input name="name" required />
          </label>
          <label className="field">
            <span>E-mail</span>
            <input name="email" type="email" required />
          </label>
          <label className="field">
            <span>Senha</span>
            <input name="password" type="password" required />
          </label>
          <label className="field">
            <span>Nível de permissão</span>
            <select name="role" defaultValue="OPERATOR">
              <option value="ADMIN">Administrador</option>
              <option value="MANAGER">Gerente</option>
              <option value="OPERATOR">Operador</option>
              <option value="FINANCE">Financeiro</option>
            </select>
          </label>
          <div style={{ gridColumn: '1 / -1' }}>
            <button className="btn btn-primary">Cadastrar usuário</button>
          </div>
        </form>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginTop: 0 }}>Usuários cadastrados</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
