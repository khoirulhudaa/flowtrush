import Workspace_id from '../../pages/workspace/[workspace_id]';
import api from './axios';

const API = {

    // Account admin
    checkAccount: (body: any) => {
        return api.post('/account/signIn/user', body)
    },
    createAccount: (body: any) => {
        return api.post('/account/signUp/user', body)
    },
    removeAccount: (user_id: string) => {
        return api.delete(`/account/remove/user/${user_id}`)  
    },

    // Workspace
    createWorkspace: (body: any) => {
        return api.post('/workspace', body)
    },
    getAllWorkspaceById: (user_id?: string) => {
        return api.get(`/workspace/list/${user_id}`)
    },
    removeWorkspace: (body: any) => {
        return api.post('/workspace/remove', body)
    },
    updateWorkspace: (body: any) => {
        return api.put('/workspace/update', body)
    },

    // Board
    createBoard: (body: any) => {
        return api.post('/board', body)
    },
    addMemberBoard: (body: any) =>{
        return api.post('/board/addMember', body)
    },
    getAllBoardById: (body?: any) => {
        return api.post(`/board/list`, body)
    },
    getBoardInvited: (user_id?: string) => {
        return api.get(`/board/${user_id}`)
    },
    removeBoard: (body: any) => {
        return api.post('/board/remove', body)
    },
    removeAllBoard: (Workspace_id?: string) => {
        return api.delete(`/board/remove/all/${Workspace_id}`)
    },
    getMembers: (board_id?: string) => {
        return api.get(`/board/members/${board_id}`)
    },
    removeMember: (body: any) => {
        return api.post('/board/member', body)
    },
    updateBoard: (body: any) => {
        return api.put('/board/update', body)
    },

    // Task
    createTask: (body: any) => {
        return api.post('/task', body)
    },
    backTask: ({task_id, body}: { task_id?: string, body?: any }) => {
        return api.put(`/task/move/${task_id}`, body)
    },
    getAllTask: (board_id?: string) => {
        return api.get(`/task/list/${board_id}`)
    },
    removeTask: (task_id?: string) => {
        return api.delete(`/task/${task_id}`)
    },
    removeAllTask: (workspace_id?: any) => {
        return api.delete(`/task/remove/all/${workspace_id}`)
    },
    updateTask: (body: any) => {
        return api.post('/task/update', body)
    },

    // reset-password
    sendEmailResetPassword: (body: any) => {
        return api.post('/account/forgot/password', body)
    },
    resetPassword: (body: any) => {
        return api.post('/account/reset/password', body)
    },
}

export default API;