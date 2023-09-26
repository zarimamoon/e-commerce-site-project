import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './cartSlice';
import ProductReducer from './productSlice';
import FilterProductReducer from './productFilterSlice';


const store = configureStore({
  reducer: {
    cart: CartReducer,
    products: ProductReducer,
    productFilter: FilterProductReducer,
  },
  
});

//store.dispatch(fetchUsers());

export default store;