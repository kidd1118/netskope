import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './movies'
// import { moviesApi } from '../service/movies';

const store= configureStore({
    reducer: {
      movies: moviesSlice.reducer,
      // [moviesApi.reducerPath]: moviesApi.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
})

export default store