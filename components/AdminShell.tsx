import Link from 'next/link';

export function AdminShell({
  title,
  children,
  user
}: {
  title: string;
  children: React.ReactNode;
  user: { name: string; email: string; role: string };
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <strong>Coxipó Admin</strong>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>{user.name}</div>
          </div>
        </div>

        <div className="notice card" style={{ marginTop: 20 }}>
          <strong>{user.role}</strong>
          <div style={{ marginTop: 6 }}>{user.email}</div>
        </div>

        <nav className="admin-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/users">Usuários</Link>
          <Link href="/admin/imports">Importação CSV</Link>
          <Link href="/">Ver loja</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="section-title">
          <div>
            <h2>{title}</h2>
            <p>Painel definitivo da Coxipó Informática.</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
