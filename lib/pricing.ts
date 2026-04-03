export function applyMargin(basePrice: number, marginPercent = 25) {
  const final = basePrice * (1 + marginPercent / 100);
  return Number(final.toFixed(2));
}

export function currencyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
