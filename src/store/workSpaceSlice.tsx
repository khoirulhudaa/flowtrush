import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface workspaceState {
    workspaceData: any,
    workspace: string,
    workspace_id: string
}

const initialState: workspaceState = {
    workspaceData: [],
    workspace: "",
    workspace_id: ""
}

const workSpaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        getWorkspaceData: (state, action:PayloadAction<any>) => {
            state.workspaceData = [action.payload]  
        },
        getNameWorkspace: (state, action:PayloadAction<any>) => {
            state.workspace = action.payload  
        },
        getWorkspaceId: (state, action:PayloadAction<any>) => {
            state.workspace_id = action.payload
        },
        clearWorkspace: (state, action:PayloadAction<string>) => {
            state.workspace = initialState.workspace
        }
    }
})

export const { getWorkspaceData, getNameWorkspace, getWorkspaceId, clearWorkspace } = workSpaceSlice.actions
export default workSpaceSlice.reducer