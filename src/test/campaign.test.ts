import { describe, expect, it } from "vitest";
import { CONFIRMED_TOTAL, DONATIONS, GOAL } from "@/lib/campaign";

describe("campanha", () => {
  it("meta é R$ 25.000", () => expect(GOAL).toBe(25000));
  it("total arrecadado confirmado é R$ 13.468,98", () => expect(CONFIRMED_TOTAL).toBe(13468.98));
  it("cada valor usa exatamente o link fornecido", () => {
    expect(DONATIONS.map((d) => [d.value, d.url])).toEqual([
      [10, "https://link.syncpayments.com.br/F4IXUD"],
      [20, "https://link.syncpayments.com.br/x95g1a"],
      [50, "https://link.syncpayments.com.br/vGGWK4"],
      [100, "https://link.syncpayments.com.br/cKjxce"],
      [500, "https://link.syncpayments.com.br/3dImN3"],
    ]);
  });
});
