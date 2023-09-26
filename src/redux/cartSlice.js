import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          cartQuantity: state.cart[itemIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let product = { ...action.payload, cartQuantity: 1 };
        state.cart.push(product);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    reduceProduct(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const updatedCart = state.cart.filter(
          (p) => p.id !== action.payload.id
        );

        state.cart = updatedCart;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    incrementProduct(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity += 1;

        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const updatedCart = state.cart.filter(
          (p) => p.id !== action.payload.id
        );

        state.cart = updatedCart;

        toast.error("Product added to cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, action) {
      const updatedCart = state.cart.filter(
        (p) => p.id !== action.payload.id
      );

      state.cart = updatedCart;

      toast.error("Product removed from cart", {
        position: "bottom-left",
      });

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cart) => {
          const { price, cartQuantity } = cart;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    removeAll(state, action) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const {
  addToCart,
  reduceProduct,
  incrementProduct,
  removeFromCart,
  getTotals,
  removeAll,
} = CartSlice.actions;

export default CartSlice.reducer;
