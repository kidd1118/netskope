import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from "axios";

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getMoviesByName: builder.query({
      query: () => { 
        return `api/comment/get`; 
    }
    })
  })
});

export const { useGetCommentsByNameQuery } = commentsApi;

export const getData = (mId) => {

  return axios.get('/api/comment/get', {
      params: {
        mId: mId
      }
  });
}

export const addData = (params) => {
  return axios.post('/api/comment/add', params);
}