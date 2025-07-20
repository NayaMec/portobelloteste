export function formatCurrency(value: number | null): string {
  if (!value) return '';

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function inputCurrencyFormat(value: string): string {
  const numericValue = value.replace(/\D/g, ''); // Remove tudo que não for número
  const floatValue = Number(numericValue) / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(floatValue);
}

export function parseCurrencyToNumber(formatted: string): number {
  const numericString = formatted
    .replace(/\s/g, '')
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.');

  const number = Number(numericString);
  return isNaN(number) ? 0 : number;
}
