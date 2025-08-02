import { renderOrderSummary } from "../../scripts/checkout/orderSummary";

describe("Order Summary Rendering", () => {
  it ('display the cart',()=>{

    const cart = [
      { id: 1, name: "Item 1", price: 10.0, quantity: 2 },
      { id: 2, name: "Item 2", price: 15.0, quantity: 1 }
    ];
    const total = 35.0;
    const orderSummaryElement = renderOrderSummary(cart, total);
    
    expect(orderSummaryElement).toBeDefined();
    expect(orderSummaryElement.querySelectorAll('.cart-item').length).toBe(2);
    expect(orderSummaryElement.querySelector('.total').textContent).toContain('Total: $35.00');
  })
})