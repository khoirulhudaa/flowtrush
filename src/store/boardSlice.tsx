import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface boardState {
    board: any,
    board_id: string
}

const initialState: boardState = {
    board: [],
    board_id: ""
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        getboard: (state, action:PayloadAction<any>) => {
            state.board = [action.payload]
        },
        getboardId: (state, action:PayloadAction<any>) => {
            state.board_id = action.payload
        },
        clearboard: (state, action:PayloadAction<string>) => {
            state.board = initialState.board
        }
    }
})

export const { getboard, getboardId, clearboard } = boardSlice.actions
export default boardSlice.reducer