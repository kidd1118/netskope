import { createSlice } from '@reduxjs/toolkit'

// interface movie {
//     name: '',
//     genre: '',
//     studio: '',
//     userRating: '',
//     profitability: '',
//     rottenTomatoesRating: '',
//     worldwideGross: '',
//     yearRelease: '',
//     comments: []
// }
const init = [
    { name: 'The Shawshank Redemption', description: 1994 },
    { name: 'The Godfather', description: 1972 },
    { name: 'The Godfather: Part II', description: 1974 },
    { name: 'The Dark Knight', description: 2008 },
    { name: '12 Angry Men', description: 1957 },
    { name: "Schindler's List", description: 1993 }
]

const moviesSlice= createSlice({
    name:"movies",
    initialState: {
        list: init
    },
    reducers:{
        add: (state, action) => {
            state.list.push(action.payload);
        },
        filter: (state, action) => {
            const movie = state.list.filter(item => item.name == action.payload);
            state.list = movie && movie.length ? movie : init;
        },
        comment: (state, action) => {
            state.list.comments.push(action.payload);
        }
    }
})

export const {add, filter, comment} = moviesSlice.actions
export default moviesSlice