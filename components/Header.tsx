const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '5565981427123';

export function Header() {
  return (
    <div className="topbar">
      <div className="container header">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <strong>Coxipó Informática</strong>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>Loja online • atendimento rápido</div>
          </div>
        </div>

        <div className="search">
          <span>🔎</span>
          <input placeholder="Busque SSD, memória, gabinete..." />
        </div>

        <nav className="nav">
          <a href="#categorias">Categorias</a>
          <a href="#produtos">Produtos</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank">WhatsApp</a>
          <a href="/login" className="btn btn-outline">Área de login</a>
        </nav>
      </div>
    </div>
  );
}
