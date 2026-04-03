'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@coxipoinformatica.com.br');
  const [password, setPassword] = useState('Coxipo@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Falha ao entrar');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="container">
      <div className="card login-card">
        <span className="badge">Acesso administrativo</span>
        <h1>Entrar no painel da Coxipó Informática</h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Use o usuário administrador criado automaticamente no seed do sistema e gerencie produtos, importações e
          usuários com segurança.
        </p>

        <form onSubmit={handleSubmit} className="grid" style={{ marginTop: 20 }}>
          <label className="field">
            <span>E-mail</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label className="field">
            <span>Senha</span>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>

          {error ? <div style={{ color: '#ff9a9a' }}>{error}</div> : null}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no painel'}
          </button>

          <a href="/" className="btn btn-outline">Voltar para loja</a>
        </form>
      </div>
    </main>
  );
}
