import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  cart: [],
  books: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.book]
      if (!state.isCartOpen) {
        state.isCartOpen = !state.isCartOpen
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((book) => book.id !== action.payload.id)
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((book) => {
        if (book.id === action.payload.id) {
          book.count++
        }
        return book
      })
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((book) => {
        if (book.id === action.payload.id && book.count > 1) {
          book.count--
        }
        return book
      })
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
  },
})

export const { setBooks, addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen } =
  cartSlice.actions

export default cartSlice.reducer
