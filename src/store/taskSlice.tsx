import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface taskState {
    task: any,
    task_id: string
}

const initialState: taskState = {
    task: [],
    task_id: ''
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTask: (state, action:PayloadAction<any>) => {
            state.task = [action.payload]   
        },
        getTaskId: (state, action:PayloadAction<string>) => {
            state.task_id = action.payload
        },
        clearTask: (state, action:PayloadAction<string>) => {
            state.task = initialState.task
        }
    }
})

export const { getTask, clearTask, getTaskId } = taskSlice.actions
export default taskSlice.reducer