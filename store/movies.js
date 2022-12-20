import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../service/movies';

// export type movie {
//     Audiencescore%
//     Film
//     Genre
//     LeadStudio
//     Profitability
//     RottenTomatoes%
//     WorldwideGross
//     Year
//     comments: []
// }

export const getMoviesAsync = createAsyncThunk(
    'movies/getMovies',
    async () => {
        const response = await getData();
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
            state.list.push(action.payload);
        },
        filter: (state, action) => {
            const movie = state.list.filter(item => item.Film == action.payload);
            state.list = movie && movie.length ? movie : init;
        },
        comment: (state, action) => {
            state.list.comments.push(action.payload);
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

export const {add, filter, comment} = moviesSlice.actions
export default moviesSlice