import productReducer, {
  fetchInitialProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../store/reducers/productReducer";
const state = {
  entities: {
    prices: {
      1: {
        id: 1,
        price: 10.99,
        date: "2019-01-01T17:16:32+00:00",
      },
      2: {
        id: 2,
        price: 9.2,
        date: "2018-11-01T17:16:32+00:00",
      },
      3: {
        id: 3,
        price: 12,
        date: "2019-01-01T17:16:32+00:00",
      },
      4: {
        id: 4,
        price: 13.2,
        date: "2018-11-01T17:16:32+00:00",
      },
      5: {
        id: 5,
        price: 5,
        date: "2017-01-01T17:16:32+00:00",
      },
      6: {
        id: 6,
        price: 13.2,
        date: "2018-11-01T17:16:32+00:00",
      },
    },
    products: {
      1: {
        id: 1,
        name: "Exforge 10mg",
        prices: [1, 2],
      },
      2: {
        id: 2,
        name: "Exforge 20mg",
        prices: [3, 4],
      },
      3: {
        id: 3,
        name: "Paracetamol 20MG",
        prices: [5, 6],
      },
    },
  },
  result: [1, 2, 3],
};
test("should return the initial state", () => {
  expect(productReducer(undefined, {})).toEqual({});
});
// test for fetchInitialProduct reducer
test("should be equal to initial normalized response", () => {
    const result = productReducer({}, fetchInitialProduct(state))
  expect(result).toEqual(state);
});

// test for add reducer

test("should add new product to state", () => {
  const newPrice = {
    id: 7,
    price: 20.99,
    date: "2020-11-01T17:16:32+00:00",
  };
  const productData = {
    id: 4,
    name: "Amicylin 200",
    price: newPrice,
  };
  const expectedState = {
    entities: {
      prices: {
        1: {
          id: 1,
          price: 10.99,
          date: "2019-01-01T17:16:32+00:00",
        },
        2: {
          id: 2,
          price: 9.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        3: {
          id: 3,
          price: 12,
          date: "2019-01-01T17:16:32+00:00",
        },
        4: {
          id: 4,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        5: {
          id: 5,
          price: 5,
          date: "2017-01-01T17:16:32+00:00",
        },
        6: {
          id: 6,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        7: {
          id: 7,
          price: 20.99,
          date: "2020-11-01T17:16:32+00:00",
        },
      },
      products: {
        1: {
          id: 1,
          name: "Exforge 10mg",
          prices: [1, 2],
        },
        2: {
          id: 2,
          name: "Exforge 20mg",
          prices: [3, 4],
        },
        3: {
          id: 3,
          name: "Paracetamol 20MG",
          prices: [5, 6],
        },
        4: {
          id: 4,
          name: "Amicylin 200",
          prices: [7],
        },
      },
    },
    result: [1, 2, 3, 4],
  };
  const result = productReducer(state, addProduct(productData));
  expect(result).toEqual(expectedState);
});

// test for add reducer

test("should update product in state", () => {
  const newPrice = {
    id: 8,
    price: 1.99,
    date: "2020-11-01T17:16:32+00:00",
  };
  const productData = {
    id: 3,
    name: "New product name",
    price: newPrice,
  };
  const expectedState = {
    entities: {
      prices: {
        1: {
          id: 1,
          price: 10.99,
          date: "2019-01-01T17:16:32+00:00",
        },
        2: {
          id: 2,
          price: 9.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        3: {
          id: 3,
          price: 12,
          date: "2019-01-01T17:16:32+00:00",
        },
        4: {
          id: 4,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        5: {
          id: 5,
          price: 5,
          date: "2017-01-01T17:16:32+00:00",
        },
        6: {
          id: 6,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
        8: {
          id: 8,
          price: 1.99,
          date: "2020-11-01T17:16:32+00:00",
        },
      },
      products: {
        1: {
          id: 1,
          name: "Exforge 10mg",
          prices: [1, 2],
        },
        2: {
          id: 2,
          name: "Exforge 20mg",
          prices: [3, 4],
        },
        3: {
          id: 3,
          name: "New product name",
          prices: [5, 6, 8],
        },
      },
    },
    result: [1, 2, 3],
  };
  const result = productReducer(state, editProduct(productData));
  expect(result).toEqual(expectedState);
});

// test for add reducer

test("should delete product from state", () => {
  const productId = 1;
  const result = productReducer(state, deleteProduct(productId));
  expect(Object.keys(result.entities.products).length).toBeLessThan(
    Object.keys(state.entities.products).length
  );
});
