import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await db.product.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  const categories = [
    { title: 'Armazenamento', text: 'SSD, HD externo e upgrades rápidos para desempenho.' },
    { title: 'Memória', text: 'DDR3, DDR4 e DDR5 para notebooks e desktops.' },
    { title: 'Gabinetes', text: 'Modelos gamer, airflow e visual premium.' },
    { title: 'Acessórios', text: 'Teclados, mouses, adaptadores e muito mais.' }
  ];

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <div className="card hero-copy">
            <span className="badge">Loja 100% online • WhatsApp • importação com margem automática</span>
            <h1>Tecnologia com preço certo, visual profissional e venda pronta para escalar.</h1>
            <p>
              A Coxipó Informática agora nasce como uma operação online moderna: catálogo próprio, preços calculados com
              margem automática de 25%, atendimento rápido no WhatsApp e painel administrativo com controle de usuários.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#produtos">Ver produtos</a>
              <a className="btn btn-secondary" href="/admin/imports">Importar catálogo CSV</a>
            </div>
          </div>

          <div className="hero-side">
            <div className="card kpi">
              <strong>+25%</strong>
              <span>margem automática aplicada em cada importação</span>
            </div>
            <div className="card kpi">
              <strong>Login real</strong>
              <span>usuários com níveis de permissão para administrar a loja</span>
            </div>
            <div className="card kpi">
              <strong>100% online</strong>
              <span>sem endereço físico público, com foco total em vendas digitais</span>
            </div>
          </div>
        </section>

        <section id="categorias" className="section">
          <div className="section-title">
            <div>
              <h2>Categorias em destaque</h2>
              <p>Estrutura pronta para vender no estilo de grandes e-commerces, mas com a cara da Coxipó.</p>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((item) => (
              <article className="card category-item" key={item.title}>
                <div style={{ fontSize: 28 }}>⚡</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="produtos" className="section">
          <div className="section-title">
            <div>
              <h2>Produtos publicados</h2>
              <p>Os itens abaixo já saem com preço final calculado automaticamente no sistema.</p>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  stock: product.stock,
                  finalPrice: Number(product.finalPrice),
                  imageUrl: product.imageUrl,
                  slug: product.slug
                }}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="card" style={{ padding: 28 }}>
            <div className="section-title">
              <div>
                <h2>O que já está pronto no seu sistema</h2>
                <p>Sem endereço físico. Tudo focado em catálogo, preço, importação e atendimento online.</p>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <div className="notice card">
                <strong>Área administrativa</strong>
                <div>Dashboard, gestão de usuários, níveis de permissão e importação de produtos por CSV.</div>
              </div>
              <div className="notice card">
                <strong>Preço automático</strong>
                <div>Todo preço base importado recebe 25% automaticamente antes da publicação.</div>
              </div>
              <div className="notice card">
                <strong>WhatsApp integrado</strong>
                <div>Botões estratégicos na loja para atendimento imediato com sua frase de abordagem.</div>
              </div>
              <div className="notice card">
                <strong>Base pronta para crescer</strong>
                <div>Estrutura ideal para depois conectar pagamentos, frete, cupons e promoções.</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <strong>Coxipó Informática</strong> • Instagram @coxipoinformatica • vendas online para todo o Brasil.
        </footer>
      </main>

      <WhatsAppButton />
    </>
  );
}
