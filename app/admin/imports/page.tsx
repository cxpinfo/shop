import { AdminShell } from '@/components/AdminShell';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminImportsPage() {
  const session = await requireAdmin();
  const logs = await db.importLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });

  return (
    <AdminShell title="Importação de produtos por CSV" user={{ name: session.name, email: session.email, role: session.role }}>
      <div className="card" style={{ padding: 24, marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>Enviar arquivo CSV</h3>
        <p style={{ color: 'var(--muted)' }}>
          Campos aceitos: <strong>sku, name, description, category, brand, supplier, basePrice, stock, imageUrl</strong>.
          O sistema aplica 25% de margem automaticamente.
        </p>

        <form action="/api/imports/csv" method="post" encType="multipart/form-data" className="grid">
          <label className="field">
            <span>Fornecedor</span>
            <input name="supplier" defaultValue="Fornecedor principal" required />
          </label>
          <label className="field">
            <span>Arquivo CSV</span>
            <input name="file" type="file" accept=".csv" required />
          </label>
          <div>
            <button className="btn btn-primary">Importar agora</button>
          </div>
        </form>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginTop: 0 }}>Histórico de importações</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Fornecedor</th>
                <th>Total</th>
                <th>Importados</th>
                <th>Pulados</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.createdAt).toLocaleString('pt-BR')}</td>
                  <td>{log.supplier}</td>
                  <td>{log.totalItems}</td>
                  <td>{log.importedItems}</td>
                  <td>{log.skippedItems}</td>
                  <td>{log.notes || '-'}</td>
                </tr>
              ))}
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6}>Nenhum CSV importado ainda.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
