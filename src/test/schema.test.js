import { normalize } from "normalizr";
import * as schema from "../store/schema/productSchema";

const rawResponse = {
  products: [
    {
      id: 1,
      name: "Exforge 10mg",
      prices: [
        {
          id: 1,
          price: 10.99,
          date: "2019-01-01T17:16:32+00:00",
        },
        {
          id: 2,
          price: 9.2,
          date: "2018-11-01T17:16:32+00:00",
        },
      ],
    },
    {
      id: 2,
      name: "Exforge 20mg",
      prices: [
        {
          id: 3,
          price: 12.0,
          date: "2019-01-01T17:16:32+00:00",
        },
        {
          id: 4,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
      ],
    },
    {
      id: 3,
      name: "Paracetamol 20MG",
      prices: [
        {
          id: 5,
          price: 5.0,
          date: "2017-01-01T17:16:32+00:00",
        },
        {
          id: 6,
          price: 13.2,
          date: "2018-11-01T17:16:32+00:00",
        },
      ],
    },
  ],
};

const expectedNormalizedResponse = {
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

// test for normalized schema

test("should return a normalized response", () => {
  const result = normalize(rawResponse.products, schema.arrayOfProducts);
  expect(result).toEqual(expectedNormalizedResponse);
});
