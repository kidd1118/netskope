import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../service/movies';

export const getMoviesAsync = createAsyncThunk(
    'movie/get',
    async (Id) => {
        const response = await getData(Id);
        return response.data;
    }
);

let init = [];

const moviesSlice= createSlice({
    name:"movies",
    initialState: {
        status: "idle",
        list: init
    },
    reducers:{
        add: (state, action) => {
            init.push(action.payload);
            state.list.push(action.payload);
        },
        filter: (state, action) => {
            const movie = state.list.filter(item => item.Film == action.payload);
            state.list = movie && movie.length ? movie : init;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getMoviesAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getMoviesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            init = action.payload;
            state.list = action.payload;
          });
    }
})

export const {add, filter} = moviesSlice.actions
export default moviesSlice