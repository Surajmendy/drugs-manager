import { createSlice } from "@reduxjs/toolkit";
import { loadProductFromStorage } from "../../services";

const persistedData = loadProductFromStorage();

const init = persistedData !== undefined ? persistedData.productsInfo : {};
export const productReducer = createSlice({
  name: "product",
  initialState: init,
  reducers: {
    // to fetch initial data. the data passed is normalized with normalizr
    fetchInitialProduct: (state = init, action) => {
      if (action.payload) {
        return {
          ...action.payload,
        };
      }
      return state;
    },
    // add product - to be completed later
    addProduct: (state = init, action) => {
      const { id, name, price } = action.payload;
      const productId = id;
      const productData = {
        id: id,
        name: name,
        prices: [price.id],
      };

      const productToBeAdded = {
        [productId]: productData,
      };
      const priceToBeAdded = {
        [price.id]: price,
      };
      // insert product ids into result

      // state.result.push(id)
      const newProd = { ...state.entities.products, ...productToBeAdded };
      const entities = {
        prices: {
          ...state.entities.prices,
          ...priceToBeAdded,
        },
        products: {
          ...newProd,
        },
      };
      const result = [...state.result, productId];
      return { entities, result };
    },

    // edit a single product
    editProduct: (state, action) => {
        console.log(action.payload)
        const { id, name, price } = action.payload;
        // find the exixstence of the product id 
        if(id in state.entities.products){
            // update the name
            state.entities.products[id].name = name
            // add new price id to the array of price ids
            state.entities.products[id].prices.push(price.id)
            // add price object to prices schema
            const priceToBeAdded = {
                [price.id]: price,
            }
            // state.entities.prices.push(priceToBeAdded)
            state.entities = {
                prices: {
                 ...state.entities.prices, ...priceToBeAdded
                },
                products: {
                 ...state.entities.products
                }
            }
        }
      return state
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
