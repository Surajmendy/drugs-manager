import { schema } from 'normalizr'


export const price = new schema.Entity('prices')
export const prices = new schema.Array(price)
export const productSchema = new schema.Entity('products',
{prices}
)
export const arrayOfProducts =  new schema.Array(productSchema);