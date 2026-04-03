import { currencyBRL } from '@/lib/pricing';

type Props = {
  product: {
    id: string;
    name: string;
    category: string;
    stock: number;
    finalPrice: number;
    imageUrl?: string | null;
    slug: string;
  };
};

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '5565981427123';

export function ProductCard({ product }: Props) {
  const message = encodeURIComponent(`Fala meu amigo! Tenho interesse no produto: ${product.name}`);

  return (
    <article className="card product-card">
      <div className="product-image">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <div className="product-meta">
          {product.category} • {product.stock > 0 ? `${product.stock} em estoque` : 'Sob consulta'}
        </div>
        <div className="price">
          <strong>{currencyBRL(product.finalPrice)}</strong>
          <span>ou no Pix</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn btn-secondary" href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank">
            Comprar no WhatsApp
          </a>
          <a className="btn btn-outline" href={`#${product.slug}`}>
            Ver detalhes
          </a>
        </div>
      </div>
    </article>
  );
}
