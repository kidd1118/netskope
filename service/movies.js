import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from "axios";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getMoviesByName: builder.query({
      query: () => { 
        return `api/movies`; 
    }
    })
  })
});

export const { useGetMoviesByNameQuery } = moviesApi;

export const getData = () => {
  return axios.get('/api/movies');
}