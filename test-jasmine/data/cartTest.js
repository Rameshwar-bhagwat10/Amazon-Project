import { addToCart,cart } from "../../data/cart.js";

describe("Test add to cart", () => {
  it("addToCart function", () => {});

  it("new product to cart", () => {
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toBe(4);
    
    expect(cart[3].productId).toBe("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");});
    
    
});
