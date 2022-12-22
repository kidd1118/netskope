import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData, addData } from '../service/comments';

export const getCommentsAsync = createAsyncThunk(
    'comment/get',
    async (mId) => {
        const response = await getData(mId);
        return response.data;
    }
);

export const addCommentsAsync = createAsyncThunk(
    'comment/add',
    async (params) => {
        const response = await addData(params);
        return response.data;
    }
);

let init = [];

const commentsSlice= createSlice({
    name:"comments",
    initialState: {
        status: "idle",
        list: init
    },
    reducers:{
        add: (state, action) => {
            //init.push(action.payload);
            state.list.push(action.payload);
        },
        filter: (state, action) => {
            const comment = state.list.filter(item => item.Id == action.payload);
            state.list = comment && comment.length ? comment : init;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCommentsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getCommentsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            init = action.payload;
            state.list = action.payload;
          }),
          builder
          .addCase(addCommentsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addCommentsAsync.fulfilled, (state, action) => {
            state.status = 'idle';

          })
    }
})

export const {add, filter} = commentsSlice.actions
export default commentsSlice