export const cart=[];

export function addToCart(productId) {
  let matchingid;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingid = cartItem;
    }
  });
  if (matchingid) {
    matchingid.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
    });
  }
}