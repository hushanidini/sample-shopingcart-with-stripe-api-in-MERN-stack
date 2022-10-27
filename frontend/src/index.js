import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productReducer , {productsFetch} from './store/productSlice';
// RTK QUERY
import { productsApi } from './store/productsApi';
import cartReducer, {getTotals} from './store/cartSlice';
import authReducer, {loadUser} from './store/authSlice';

export const store = configureStore({
  reducer: {
    products:productReducer,
    cart: cartReducer,
    auth: authReducer,
     [productsApi.reducerPath]: productsApi.reducer, // RTK query
  },
  // for RTK query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});

store.dispatch(productsFetch());
// cart total
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


