import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './cartSlice';
import ProductReducer from './productSlice';
import FilterProductReducer from './productFilterSlice';
import { fetchProducts } from './productSlice';


const store = configureStore({
  reducer: {
    cart: CartReducer,
    products: ProductReducer,
    productFilter: FilterProductReducer,
  },
  
});

store.dispatch(fetchProducts());

export default store;