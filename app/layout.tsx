import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coxipó Informática',
  description: 'Loja online de informática com catálogo, painel administrativo, importação CSV e margem automática.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
