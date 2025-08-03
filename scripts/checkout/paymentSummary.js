import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

class PaymentCalculator {
  constructor(cart) {
    this.cart = cart;
    this.taxRate = 0.1;
  }

  async calculateTotals() {
    try {
      const { productPriceCents, shippingPriceCents } = await this.calculateItemAndShippingCosts();
      const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
      const taxCents = this.calculateTax(totalBeforeTaxCents);
      const totalCents = totalBeforeTaxCents + taxCents;

      return {
        productPriceCents,
        shippingPriceCents,
        totalBeforeTaxCents,
        taxCents,
        totalCents,
        itemCount: this.cart.length
      };
    } catch (error) {
      console.error('Error calculating totals:', error);
      throw error;
    }
  }

  async calculateItemAndShippingCosts() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    // Simulate async operation for future API integration
    await Promise.all(this.cart.map(async (cartItem) => {
      const product = await Promise.resolve(getProduct(cartItem.productId));
      productPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = await Promise.resolve(getDeliveryOption(cartItem.deliveryOptionId));
      shippingPriceCents += deliveryOption.priceCents;
    }));

    return { productPriceCents, shippingPriceCents };
  }

  calculateTax(amount) {
    return amount * this.taxRate;
  }
}

class PaymentSummaryRenderer {
  constructor(selector) {
    this.container = document.querySelector(selector);
  }

  async render() {
    try {
      const calculator = new PaymentCalculator(cart);
      const totals = await calculator.calculateTotals();
      
      const totalBeforeTaxCents = totals.totalBeforeTaxCents;
      const taxCents = totals.taxCents;
      const totalCents = totals.totalCents;

      const html = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totals.itemCount}):</div>
          <div class="payment-summary-money">$${formatCurrency(totals.productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(totals.shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
      `;
      
      this.container.innerHTML = html;
      this.attachEventListeners();
    } catch (error) {
      console.error('Error rendering payment summary:', error);
      this.container.innerHTML = '<div class="error">Unable to load payment summary. Please try again.</div>';
    }
  }

  attachEventListeners() {
    const placeOrderButton = this.container.querySelector('.js-place-order');
    if (placeOrderButton) {
      placeOrderButton.addEventListener('click', async () => {
        try {
          await this.handlePlaceOrder();
        } catch (error) {
          console.error('Error placing order:', error);
        }
      });
    }
  }

  async handlePlaceOrder() {
    // Future implementation for order placement
    // This could integrate with a backend API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order placed successfully');
        resolve();
      }, 1000);
    });
  }
}

// Export the main render function that initializes everything
export async function renderPaymentSummary() {
  const renderer = new PaymentSummaryRenderer('.js-payment-summary');
  await renderer.render();
}

// Initialize the payment summary
(async () => {
  try {
    await renderPaymentSummary();
  } catch (error) {
    console.error('Failed to initialize payment summary:', error);
  }
})();