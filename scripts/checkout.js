import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { ShoppingCart } from "../data/cart-oop.js";

export const cart = new ShoppingCart();

renderOrderSummary();
renderPaymentSummary();