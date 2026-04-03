import { AdminShell } from '@/components/AdminShell';
import { requireSession } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await requireSession();

  const [users, products, logs] = await Promise.all([
    db.user.count(),
    db.product.count(),
    db.importLog.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  ]);

  return (
    <AdminShell title="Dashboard" user={{ name: session.name, email: session.email, role: session.role }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: 20 }}>
        <div className="card kpi">
          <strong>{users}</strong>
          <span>usuários cadastrados</span>
        </div>
        <div className="card kpi">
          <strong>{products}</strong>
          <span>produtos no banco</span>
        </div>
        <div className="card kpi">
          <strong>{logs.length}</strong>
          <span>últimas importações registradas</span>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginTop: 0 }}>Últimas importações</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Origem</th>
                <th>Total</th>
                <th>Importados</th>
                <th>Pulados</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.supplier}</td>
                  <td>{log.sourceType}</td>
                  <td>{log.totalItems}</td>
                  <td>{log.importedItems}</td>
                  <td>{log.skippedItems}</td>
                </tr>
              ))}
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5}>Nenhuma importação ainda. Vá em Importação CSV para subir o catálogo.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
