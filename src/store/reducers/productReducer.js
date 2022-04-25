import { createSlice } from "@reduxjs/toolkit";

const init = {};
export const productSlice = createSlice({
  name: "product",
  initialState: init,
  reducers: {
    // to fetch initial data to sstore
    fetchInitialProduct: (state = init, action) => {
      return state;
    },
    // add product - to be completed later
    addProduct: (state = init, action) => {
      return state;
    },

    // edit a single product
    editProduct: (state, action) => {
      return state;
    },
    // delete a product
    deleteProduct: (state, action) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, editProduct, deleteProduct, fetchInitialProduct } =
  productSlice.actions;

export default productSlice.reducer;
