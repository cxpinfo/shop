import Link from "next/link";

export default function Home() {
  const whatsapp =
    "https://wa.me/5565981427123?text=Fala%20meu%20amigo!%20Quero%20saber%20mais%20sobre%20os%20produtos%20e%20servi%C3%A7os%20da%20Coxip%C3%B3%20Inform%C3%A1tica.";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center p-6 border-b border-white/10">
        <h1 className="text-2xl font-black text-[#7CFF4F]">
          COXIPÓ INFORMÁTICA
        </h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/10"
          >
            Entrar
          </Link>

          <a
            href={whatsapp}
            target="_blank"
            className="bg-[#7CFF4F] text-black px-4 py-2 rounded-xl font-bold"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="p-10 text-center">
        <h2 className="text-4xl font-black mb-4">
          Upgrade, manutenção e tecnologia com quem entende
        </h2>

        <p className="text-white/70 max-w-xl mx-auto">
          Produtos, acessórios e assistência técnica com atendimento rápido e
          confiança.
        </p>

        <a
          href={whatsapp}
          target="_blank"
          className="mt-6 inline-block bg-[#7CFF4F] text-black px-6 py-3 rounded-xl font-bold"
        >
          Fala meu amigo no WhatsApp
        </a>
      </section>

      {/* CATEGORIAS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {["Notebooks", "Acessórios", "Upgrade", "Serviços"].map((item) => (
          <div
            key={item}
            className="border border-white/10 p-6 rounded-2xl text-center hover:bg-white/10"
          >
            <p className="font-bold">{item}</p>
          </div>
        ))}
      </section>

      {/* PRODUTOS */}
      <section className="p-6">
        <h2 className="text-2xl font-black mb-6">Produtos em destaque</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            "SSD 480GB",
            "Memória 8GB",
            "Teclado Gamer",
            "Mouse Sem Fio",
          ].map((p) => (
            <div
              key={p}
              className="border border-white/10 rounded-2xl p-4 hover:bg-white/10"
            >
              <div className="h-32 bg-black mb-4 flex items-center justify-center">
                💻
              </div>

              <h3 className="font-bold">{p}</h3>

              <p className="text-[#7CFF4F] font-bold mt-2">R$ 199,90</p>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-[#7CFF4F] text-black py-2 rounded-xl font-bold">
                  Comprar
                </button>

                <a
                  href={whatsapp}
                  target="_blank"
                  className="px-3 py-2 border border-white/10 rounded-xl"
                >
                  Zap
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="p-6">
        <h2 className="text-2xl font-black mb-6">Serviços</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Formatação",
            "Troca de tela",
            "Limpeza interna",
            "Upgrade SSD",
            "Reparo de dobradiça",
            "Manutenção geral",
          ].map((s) => (
            <div
              key={s}
              className="border border-white/10 p-4 rounded-2xl"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="p-6 border-t border-white/10 text-center text-sm text-white/60">
        Coxipó Informática • WhatsApp: (65) 98142-7123 • @coxipoinformatica
      </footer>
    </main>
  );
}
