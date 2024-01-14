import SweetAlert from "@/components/alertBox"
import Button from "@/components/button"
import InputField from "@/components/inputField"
import { useBoardFormik } from "@/utils/validations/validationBoard"
import { useInvitedFormik } from "@/utils/validations/validationInvited"
import { useTaskFormik } from "@/utils/validations/validationTask"
import { useUpdateBoardFormik } from "@/utils/validations/validationUpBoard"
import { useUpdateTaskFormik } from "@/utils/validations/validationUpTask"
import { useUpdateWorkSpaceFormik } from "@/utils/validations/validationUpWorkspace"
import { useWorkSpaceFormik } from "@/utils/validations/validationWorkSpace"
import Image from "next/image"
import React from "react"
import { FaSearchPlus } from "react-icons/fa"

interface alertProps {
    show?: boolean,
    cancel?: () => void,
    type?: string,
    status?: any,
}

const PopupBoard:React.FC<alertProps> = ({
    show,
    cancel,
    type,
    status,
}) => {
    
    const handleErrorMessage = (error: string) => {
        status()
        SweetAlert({
            text: `${error}`,
            icon: 'error',
            showCancelButton: false
        })
    }
    
    const handleResponse = (response: number) => {
        if(response === 200) {
            status()
            SweetAlert({
                text: 'Successfully!',
                icon: 'success',
                showCancelButton: false
            })
        } else if(response === 400) {
            status()
            SweetAlert({
                text: 'User already!',
                icon: 'warning',
                showCancelButton: false
            })
        }
    }

    const task = useTaskFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const workspace = useWorkSpaceFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const invited = useInvitedFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const board = useBoardFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const workspaceUpdate = useUpdateWorkSpaceFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const taskUpdate = useUpdateTaskFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    const boardUpdate = useUpdateBoardFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    switch (type) {
        case "workspace":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <form onSubmit={workspace.handleSubmit}>
                        <div className="mb-5">
                            <InputField 
                                label="Title workspace"
                                name="workspace_title"
                                onChange={workspace.handleChange}
                                onBlur={workspace.handleBlur}
                                value={workspace.values.workspace_title}
                                id="workspace_title"
                                placeholder="Workspace example"
                                onError={workspace.errors.workspace_title}
                                onTouched={workspace.touched.workspace_title}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="Description workspace"
                                name="workspace_description"
                                onChange={workspace.handleChange}
                                onBlur={workspace.handleBlur}
                                value={workspace.values.workspace_description}
                                id="workspace_description"
                                placeholder="Workspace example"
                                onError={workspace.errors.workspace_description}
                                onTouched={workspace.touched.workspace_description}
                            />
                        </div>
                        <div className="my-4"></div>
                        <div className="flex items-center">
                            <Button text="Create workspace" type="submit" />
                            <div className="mx-3"></div>
                            <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                        </div>
                        </form>
                    </div>
                </div>
            )
        case "member":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <form onSubmit={invited.handleSubmit}>
                        <div className="mb-5">
                            <InputField 
                                label="Email"
                                name="email"
                                onChange={invited.handleChange}
                                onBlur={invited.handleBlur}
                                value={invited.values.email}
                                id="email"
                                placeholder="example@gmail.com"
                                onError={invited.errors.email}
                                onTouched={invited.touched.email}
                            />
                        </div>
                        <div className="my-4"></div>
                        <div className="flex items-center">
                            <Button text="Invite" type="submit" />
                            <div className="mx-3"></div>
                            <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                        </div>
                        </form>
                    </div>
                </div>
            )
        case "board":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <form onSubmit={board.handleSubmit}>
                            <div className="mb-5">
                                <InputField 
                                    label="Title board"
                                    name="board_title"
                                    onChange={board.handleChange}
                                    onBlur={board.handleBlur}
                                    value={board.values.board_title}
                                    id="board_title"
                                    placeholder="Board example"
                                    onError={board.errors.board_title}
                                    onTouched={board.touched.board_title}
                                />
                            </div>
                            <div className="mb-5">
                                <InputField 
                                    label="Description board"
                                    name="description_board"
                                    onChange={board.handleChange}
                                    onBlur={board.handleBlur}
                                    value={board.values.description_board}
                                    id="description_board"
                                    placeholder="Description"
                                    onError={board.errors.description_board}
                                    onTouched={board.touched.description_board}
                                />
                            </div>
                            <div className="my-4"></div>
                            <div className="flex items-center">
                                <Button text="Create board" type="submit" />
                                <div className="mx-3"></div>
                                <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                            </div>
                        </form>
                    </div>
                </div>
            )
        case "update-workspace":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <h2 className="text-[16px] font-bold">Detail workspace</h2>
                        <hr className="my-4" />
                        <form onSubmit={workspaceUpdate.handleSubmit}>
                        <div className="mb-5">
                            <InputField 
                                label="Title workspace"
                                name="workspace_title"
                                onChange={workspaceUpdate.handleChange}
                                onBlur={workspaceUpdate.handleBlur}
                                value={workspaceUpdate.values.workspace_title}
                                id="workspace_title"
                                placeholder="Workspace example"
                                onError={workspaceUpdate.errors.workspace_title}
                                onTouched={workspaceUpdate.touched.workspace_title}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="Description workspace"
                                name="workspace_description"
                                onChange={workspaceUpdate.handleChange}
                                onBlur={workspaceUpdate.handleBlur}
                                value={workspaceUpdate.values.workspace_description}
                                id="workspace_description"
                                placeholder="Workspace example"
                                onError={workspaceUpdate.errors.workspace_description}
                                onTouched={workspaceUpdate.touched.workspace_description}
                            />
                        </div>
                        <div className="my-4"></div>
                        <div className="flex items-center">
                            <Button text="Create workspace" type="submit" />
                            <div className="mx-3"></div>
                            <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                        </div>
                        </form>
                    </div>
                </div>
            )
        case "update-task":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <h2 className="text-[16px] font-bold">Detail task</h2>
                        <hr className="my-4" />
                        <form onSubmit={taskUpdate.handleSubmit}>
                        <div className="mb-5">
                            <InputField 
                                label="Title task"
                                name="task_title"
                                onChange={taskUpdate.handleChange}
                                onBlur={taskUpdate.handleBlur}
                                value={taskUpdate.values.task_title}
                                id="task_title"
                                placeholder="Task example"
                                onError={taskUpdate.errors.task_title}
                                onTouched={taskUpdate.touched.task_title}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="Description task"
                                name="description_task"
                                onChange={taskUpdate.handleChange}
                                onBlur={taskUpdate.handleBlur}
                                value={taskUpdate.values.description_task}
                                id="description_task"
                                placeholder="This is a group..."
                                onError={taskUpdate.errors.description_task}
                                onTouched={taskUpdate.touched.description_task}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="New Attachment task (Optional)"
                                name="file_task"
                                type="file"
                                onChange={(event: any) => {
                                    taskUpdate.setFieldValue("file_task", event.target.files[0])
                                }}
                                onBlur={taskUpdate.handleBlur}
                                id="file_task"
                                onError={taskUpdate.errors.file_task}
                                onTouched={taskUpdate.touched.file_task}
                            />
                        </div>
                        {
                            taskUpdate.values.old_image && (
                                <div className='mb-5'>
                                    <div className="relative rounded-md flex items-center w-max">
                                        <Image 
                                            src={taskUpdate.values.old_image}
                                            alt="image"
                                            width={120}
                                            height={120}
                                            className="rounded-md"
                                        />
                                        <a href={taskUpdate.values.old_image} target="__blank">
                                            <div className='relative z-[33333] left-[20px] text-[12px] text-white font-normal bg-blue-500 rounded-full w-max h-max px-4 py-2 flex justify-center items-center'>Show image</div>
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                        <div className="my-4"></div>
                        <div className="flex items-center">
                            <Button text="Update task" type="submit" />
                            <div className="mx-3"></div>
                            <Button text="Close" typeButton="outline" type="button" onClick={cancel} />
                        </div>
                        </form>
                    </div>
                </div>
            )
        case "update-board":
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <h2 className="text-[16px] font-bold">Detail board</h2>
                        <hr className="my-4" />
                        <form onSubmit={boardUpdate.handleSubmit}>
                            <div className="mb-5">
                                <InputField 
                                    label="Title board"
                                    name="board_title"
                                    onChange={boardUpdate.handleChange}
                                    onBlur={boardUpdate.handleBlur}
                                    value={boardUpdate.values.board_title}
                                    id="board_title"
                                    placeholder="Board example"
                                    onError={boardUpdate.errors.board_title}
                                    onTouched={boardUpdate.touched.board_title}
                                />
                            </div>
                            <div className="mb-5">
                                <InputField 
                                    label="Description board"
                                    name="description_board"
                                    onChange={boardUpdate.handleChange}
                                    onBlur={boardUpdate.handleBlur}
                                    value={boardUpdate.values.description_board}
                                    id="description_board"
                                    placeholder="Description"
                                    onError={boardUpdate.errors.description_board}
                                    onTouched={boardUpdate.touched.description_board}
                                />
                            </div>
                            <div className="my-4"></div>
                            <div className="flex items-center">
                                <Button text="Create board" type="submit" />
                                <div className="mx-3"></div>
                                <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                            </div>
                        </form>
                    </div>
                </div>
            )
        default:
            return (
                <div className={`w-screen fixed right-0 top-0 ${show ? 'flex' : 'hidden'} z-[99999999999] duration-100 h-screen overflow-hidden bg-opacity-[0.9] bg-slate-400 flex items-center justify-center`}>
                    <div className="bg-white w-[94vw] md:w-[50vw] rounded-lg p-6">
                        <form onSubmit={task.handleSubmit}>
                        <div className="mb-5">
                            <InputField 
                                label="Title task"
                                name="task_title"
                                onChange={task.handleChange}
                                onBlur={task.handleBlur}
                                value={task.values.task_title}
                                id="task_title"
                                placeholder="Task example"
                                onError={task.errors.task_title}
                                onTouched={task.touched.task_title}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="Description task"
                                name="description_task"
                                onChange={task.handleChange}
                                onBlur={task.handleBlur}
                                value={task.values.description_task}
                                id="description_task"
                                placeholder="This is a group..."
                                onError={task.errors.description_task}
                                onTouched={task.touched.description_task}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField 
                                label="Attachment task (PDF)"
                                name="file_task"
                                type="file"
                                onChange={(event: any) => {
                                    task.setFieldValue("file_task", event.target.files[0])
                                }}
                                onBlur={task.handleBlur}
                                id="file_task"
                                onError={task.errors.file_task}
                                onTouched={task.touched.file_task}
                            />
                        </div>
                        <div className="my-4"></div>
                        <div className="flex items-center">
                            <Button text="Create task" type="submit" />
                            <div className="mx-3"></div>
                            <Button text="Cancel" typeButton="outline" type="button" onClick={cancel} />
                        </div>
                        </form>
                    </div>
                </div>
            )
    }
}

export default PopupBoard
