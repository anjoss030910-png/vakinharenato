// Dados oficiais da campanha. Atualize apenas com informações confirmadas pela família.
export const GOAL = 25000;

/** Total arrecadado confirmado. */
export const CONFIRMED_TOTAL = 13468.98;

/** Data da última atualização confirmada. */
export const LAST_UPDATE = "28/10/2026";

/** Destinação dos recursos confirmada pela família. */
export const FUNDS_USE: string | null = null;

/** Atualizações oficiais fornecidas pela família. */
export const UPDATES: { date: string; text: string }[] = [];

export const DONATIONS = [
  { value: 10, url: "https://link.syncpayments.com.br/F4IXUD", featured: true },
  { value: 20, url: "https://link.syncpayments.com.br/x95g1a", featured: true },
  { value: 50, url: "https://link.syncpayments.com.br/vGGWK4", featured: true },
  { value: 100, url: "https://link.syncpayments.com.br/cKjxce", featured: false },
  { value: 500, url: "https://link.syncpayments.com.br/3dImN3", featured: false },
] as const;

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
