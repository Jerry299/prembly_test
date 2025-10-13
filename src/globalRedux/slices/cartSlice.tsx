import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImageUrl: string;
  id: string;
  productQtyInCart?: number;
  currentTotal?: number;
}

interface CartState {
  cartItems: CartItem[];
  subTotal: number;
  totalPrice: number;
  loading: boolean;
}
const initialState: CartState = {
  cartItems: [],
  subTotal: 0,
  totalPrice: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existingProduct = state.cartItems.filter(
        (item) => item.productName === payload.productName
      );

      if (existingProduct.length < 1) {
        state.cartItems.push(payload);
        // state.subTotal += payload.productPrice * payload.productQuantity;
        // state.totalPrice = state.subTotal;
      }
    },
    removeFromCart: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.productName === payload.productName
      );
      if (index !== -1) {
        const item = state.cartItems[index];
        //state.subTotal -= item.productPrice * item.productQuantity;
        state.cartItems.splice(index, 1);
        // state.totalPrice = state.subTotal;
      }
    },
    increaseItemInCart: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.productName === payload.productName
      );
      if (index !== -1) {
        state.cartItems[index].productQtyInCart =
          (state.cartItems[index].productQtyInCart || 0) + 1;
        // state.subTotal += state.cartItems[index].productPrice;
        // state.totalPrice = state.subTotal;
      }
    },
    decreaseItemInCart: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.productName === payload.productName
      );
      if (index !== -1 && (state.cartItems[index].productQtyInCart || 0) > 0) {
        state.cartItems[index].productQtyInCart =
          (state.cartItems[index].productQtyInCart || 0) - 1;
        // state.subTotal -= state.cartItems[index].productPrice;
        // state.totalPrice = state.subTotal;
      }
    },
    calculateTotal: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.productName === payload.productName
      );
      if (index !== -1) {
        state.cartItems[index].currentTotal = payload.total;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseItemInCart,
  decreaseItemInCart,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
