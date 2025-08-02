import { formatCurrency } from "../scripts/utils/money.js";

// Test cases for formatCurrency function
describe("format currency tests", () => {
  it("work with price", () => {
    expect(formatCurrency(2095)).toBe("20.95");
  });
  it("work with 0", () => {
    expect(formatCurrency(0)).toBe("0.00");
  });
  it("work with Math round", () => {
    expect(formatCurrency(2000.5)).toBe("20.01");
  });
});
