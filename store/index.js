import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './movies'
import commentsSlice from './comments'

const store= configureStore({
    reducer: {
      movies: moviesSlice.reducer,
      comments: commentsSlice.reducer
    }
})

export default store