import { createSlice } from "@reduxjs/toolkit";
import { loadProductFromStorage } from "../../services";

const persistedData = loadProductFromStorage()

const init = persistedData !== undefined ? persistedData.productsInfo : {}
export const productReducer = createSlice({
  name: "product",
  initialState: init,
  reducers: {
    // to fetch initial data. the data passed is normalized with normalizr
    fetchInitialProduct: (state = init, action) => {
      if(action.payload){
          return {
              ...action.payload
          }
      }
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
productReducer.actions;

export default productReducer.reducer;
