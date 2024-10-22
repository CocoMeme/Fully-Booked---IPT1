import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../redux/features/cart/cartSlice"
import booksApi from './features/books/BooksApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})