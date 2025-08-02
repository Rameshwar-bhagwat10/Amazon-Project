export class ShoppingCart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!Array.isArray(this.cart) || this.cart.length === 0) {
      this.cart = [
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "2",
        },
        {
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          quantity: 3,
          deliveryOptionId: "3",
        },
      ];
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart(productId) {
    let matchingItem;
    this.cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cart = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  getCart() {
    return this.cart;
  }
}
