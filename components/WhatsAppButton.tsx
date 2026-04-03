const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '5565981427123';

export function WhatsAppButton() {
  return (
    <a
      className="btn btn-primary whatsapp-float"
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Fala meu amigo! Quero atendimento na loja online da Coxipó Informática.')}`}
      target="_blank"
      aria-label="Falar no WhatsApp"
    >
      💬 WhatsApp
    </a>
  );
}
