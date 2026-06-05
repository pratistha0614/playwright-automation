export function generateRandomEmail(): string {
  return `testuser_${Date.now()}@example.com`;
}

export function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace('$', ''));
}
