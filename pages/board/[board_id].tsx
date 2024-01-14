"use client"

import '@/app/globals.css'
import Header from '@/components/Layouts/header'
import Sidebar from '@/components/Layouts/sidebar'
import SweetAlert from '@/components/alertBox'
import Button from '@/components/button'
import PopupBoard from '@/components/popupBoard'
import API from '@/services/api'
import { getboardId } from '@/store/boardSlice'
import ProviderMain from '@/store/provider'
import { getTask, getTaskId } from '@/store/taskSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaEye, FaPlus, FaSignOutAlt, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Board = () => {

  const [show, setShow] = useState<boolean>(false)
  const [access, setAccess] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [type, setType] = useState<string>("")
  const [task, setTask] = useState<any[]>([])

  const auth = useSelector((state: any) => state.authSlice.auth)
  const boards = useSelector((state: any) => state.boardSlice.board)

  const router = useRouter()
  const { board_id } = router.query
  const dispatch = useDispatch()

  useEffect(() => {

    (async () => {
      if(board_id && typeof board_id === 'string') {

        const response = await API.getAllTask(board_id)
        setTask(response.data.data) 
        console.log(response.data.data)

        dispatch(getTask(response.data.data))
        dispatch(getboardId(board_id))
        setStatus(false)
        setShow(false)
      }
    })()
    
  }, [board_id, status])

  useEffect(() => {
    (async () => {
      const resultAccess = await boards[0].filter((data: any) => data?.board_access === auth?.user_id)
      if(resultAccess.length > 0) {
        setAccess(true)
      } else{{
        setAccess(false)
      }}
    })()
  }, [board_id, access])

  const handleTask = () => {
    setShow(true)
    setType('task')
  }

  const handleRemove = async (task_id?: string) => {
    const response = await API.removeTask(task_id)
    console.log(response)
    if(response.data.status !== 200) {
      SweetAlert({
        text: `${response.data.message}`,
        icon: 'error'
      })
    }
    setStatus(true)
  }

  const handleBackTask = async (task_id: string, type_task: string) => {
    const body = {
      task_id,
      type_task
    }
    const resultBack = await API.backTask({ task_id, body }) 
    if(resultBack.data.status === 200) setStatus(true)
  }

  const addMember = () => {
    setShow(true)
    setType("member")
  }

  const handleLeaveBoard = async () => {
    const body = {
      board_id,
      user_id: auth?.user_id
    }
    const result = await API.removeMember(body)
    if(result.data.status === 200) router.push('/')
  }

  const outBoard = () => {
    SweetAlert({
      text: 'Sure to leave board ?',
      icon: 'question',
      onClick: handleLeaveBoard
    })
  }

  const handleDetailTask = (task_id?: string) => {
    dispatch(getTaskId(task_id ? task_id : ''))
    setShow(true)
    setType('update-task')
  }

  return (
    <div className='flex w-screen h-screen overflow-hidden'>
        <Sidebar type='with-board' />
        <div className='relative px-4 w-full h-screen overflow-y-auto bg-white'>
            <Header 
              create={() => {
                setShow(true)
                setType("workspace")
              }} 
            />
            <div className='w-full pt-6 pb-4 pr-3'>
              <div className='flex items-center justify-between w-full'>
                <div className="w-full h-max px-6 hidden md:flex items-center">
                  <div className='text-white rounded-lg w-[50px] h-[50px] overflow-hidden text-[20px] bg-blue-400 text-center flex items-center justify-center'>
                      <p>{auth ? auth?.email.slice(0, 2) : ''}</p>
                  </div>
                  <p className='ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[85%]'>{auth ? auth?.email : ''}</p>
                </div>
                <div>
                  {
                    access ? (
                      <Button text="Invite new member" typeButton="with-icon" icon={<FaPlus />} onClick={() => addMember()} />
                    ):
                      <Button text="Out in board" method='delete' typeButton="with-icon" icon={<FaSignOutAlt />} onClick={() => outBoard()} />
                  }
                </div>
              </div>
            </div>

            <hr />
            <div className='w-screen md:w-full overflow-auto md:overflow-hidden pr-2 md:pr-0 relative md:left-0 left-[-8px]'>
              <div className='w-max md:w-full justify-between mt-4 px-3 py-6 h-max overflow-x-auto md:overflow-x-hidden overflow-y-auto flex'>
                <div className='bg-white border-[1px] w-[80vw] md:w-[23%] min-h-[170px] h-max mr-3 md:mx-3 border-slate-200 rounded-md p-4 shadow-sm'>
                  <div className='flex mb-3 w-full items-center justify-between'>
                    <p>Doing to</p>
                    <FaPlus onClick={() => handleTask()} className='text-blue-400 cursor-pointer active:scale-[0.9] hover:brightness-90' />
                  </div>
                  <hr />
                  {
                    task && task.length > 0 ? (
                      task.filter((d: any) => d.type_task === 'doingTo')
                      .map((data: any, index: number) => (
                        <div key={index} className='relative w-full overflow-hidden min-h-[80px] p-2 bg-slate-100 border-[2px] border-blue-300 rounded-md my-2'>
                          <div className='w-full flex items-center'>
                            <p className='overflow-hidden overflow-ellipsis w-[80%] whitespace-nowrap mb-3 relative top-1'>{data?.task_title}</p>
                            <div onClick={() => handleDetailTask(data?.task_id)} className='w-[30px] z-40 h-[30px] cursor-pointer hover:brightness-[90%] active:scale-[0.98] duration-100 text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative top-[-3px] right-[-6px] bg-blue-500 text-white border-0 outline-0'><FaEye /></div>
                          </div>
                          <p className='overflow-hidden w-[94%] text-[14px] overflow-ellipsis whitespace-nowrap leading-loose text-slate-400'>{data?.task_description}</p>
                          <div className='w-full flex items-center'>
                            <div className='flex w-max'>
                              <div onClick={() => handleBackTask(data?.task_id, 'progress')} className='px-3 cursor-pointer mr-3 active:scale-[0.98] bg-blue-500 hover:brightness-[90%] duration-100 z-40 py-[7px] mt-3 mb-1 text-white rounded-md outline-0'><FaArrowRight /></div>
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleRemove(data?.task_id)} className='px-3 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100 z-40 py-[7.2px] mt-3 mb-1 bg-red-500 text-white rounded-md border-0 outline-0'><FaTrash /></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ):
                      null
                  }
                </div>
                <div className='bg-white border-[1px] w-[80vw] md:w-[23%] min-h-[170px] h-max mr-3 md:mx-3 border-slate-200 rounded-md p-4 shadow-sm'>
                  <p className='mb-2'>Progress</p>
                  <hr />
                  {
                    task && task.length > 0 ? (
                      task.filter((d: any) => d.type_task === 'progress')
                      .map((data: any, index: number) => (
                        <div key={index} className='relative w-full overflow-hidden min-h-[80px] p-2 bg-slate-100 border-[2px] border-blue-300 rounded-md my-2'>
                          <div className='w-full flex items-center'>
                            <p className='overflow-hidden overflow-ellipsis w-[80%] whitespace-nowrap mb-3 relative top-1'>{data?.task_title}</p>
                            <div onClick={() => handleDetailTask(data?.task_id)} className='w-[30px] z-40 h-[30px] cursor-pointer hover:brightness-[90%] active:scale-[0.98] duration-100 text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative top-[-3px] right-[-6px] bg-blue-500 text-white border-0 outline-0'><FaEye /></div>
                          </div>
                          <p className='overflow-hidden w-[94%] text-[14px] overflow-ellipsis whitespace-nowrap leading-loose text-slate-400'>{data?.task_description}</p>
                          <div className='w-full flex items-center'>
                            <div onClick={() => handleBackTask(data?.task_id, 'doingTo')} className='px-3 cursor-pointer active:scale-[0.98] hover:bg-blue-500 hover:text-white hover:border-white duration-100 z-40 py-[6px] mr-3 mt-3 mb-1 bg-transparent text-black rounded-md border-[1px] border-black outline-0'>
                              <FaArrowLeft />
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleBackTask(data?.task_id, 'review')} className='px-3 cursor-pointer active:scale-[0.98] bg-blue-500 hover:brightness-[90%] duration-100 z-40 py-[7px] mr-3 mt-3 mb-1 text-white rounded-md outline-0'><FaArrowRight /></div>
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleRemove(data?.task_id)} className='px-3 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100 z-40 py-[7.2px] mt-3 mb-1 bg-red-500 text-white rounded-md border-0 outline-0'><FaTrash /></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ):
                      null
                  }
                </div>
                <div className='bg-white border-[1px] w-[80vw] md:w-[23%] min-h-[170px] h-max mr-3 md:mx-3 border-slate-200 rounded-md p-4 shadow-sm'>
                  <p className='mb-2'>Review</p>
                  <hr />
                  {
                    task && task.length > 0 ? (
                      task.filter((d: any) => d.type_task === 'review')
                      .map((data: any, index: number) => (
                        <div key={index} className='relative w-full overflow-hidden min-h-[80px] p-2 bg-slate-100 border-[2px] border-blue-300 rounded-md my-2'>
                          <div className='w-full flex items-center'>
                            <p className='overflow-hidden overflow-ellipsis w-[80%] whitespace-nowrap mb-3 relative top-1'>{data?.task_title}</p>
                            <div onClick={() => handleDetailTask(data?.task_id)} className='w-[30px] z-40 h-[30px] cursor-pointer hover:brightness-[90%] active:scale-[0.98] duration-100 text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative top-[-3px] right-[-6px] bg-blue-500 text-white border-0 outline-0'><FaEye /></div>
                          </div>
                          <p className='overflow-hidden w-[94%] text-[14px] overflow-ellipsis whitespace-nowrap leading-loose text-slate-400'>{data?.task_description}</p>
                          <div className='w-full flex items-center'>
                            <div onClick={() => handleBackTask(data?.task_id, 'progress')} className='px-3 cursor-pointer active:scale-[0.98] hover:bg-blue-500 hover:text-white hover:border-white duration-100 z-40 py-[6px] mr-3 mt-3 mb-1 bg-transparent text-black rounded-md border-[1px] border-black outline-0'>
                              <FaArrowLeft />
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleBackTask(data?.task_id, 'done')} className='px-3 cursor-pointer active:scale-[0.98] bg-blue-500 hover:brightness-[90%] duration-100 z-40 py-[7px] mr-3 mt-3 mb-1 text-white rounded-md outline-0'><FaArrowRight /></div>
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleRemove(data?.task_id)} className='px-3 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100 z-40 py-[7.2px] mt-3 mb-1 bg-red-500 text-white rounded-md border-0 outline-0'><FaTrash /></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ):
                      null
                  }
                </div>
                <div className='bg-white border-[1px] w-[80vw] md:w-[23%] min-h-[170px] h-max mr-3 md:mx-3 border-slate-200 rounded-md p-4 shadow-sm'>
                  <p className='mb-2'>Done</p>
                  <hr />
                  {
                    task && task.length > 0 ? (
                      task.filter((d: any) => d.type_task === 'done')
                      .map((data: any, index: number) => (
                        <div key={index} className='relative w-full overflow-hidden min-h-[80px] p-2 bg-green-200 border-[2px] border-green-400 rounded-md my-2'>
                          <div className='w-full flex items-center'>
                            <p className='overflow-hidden overflow-ellipsis w-[80%] whitespace-nowrap mb-3 relative top-1'>{data?.task_title}</p>
                            <div onClick={() => handleDetailTask(data?.task_id)} className='w-[30px] z-40 h-[30px] cursor-pointer hover:brightness-[90%] active:scale-[0.98] duration-100 text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative top-[-3px] right-[-6px] bg-blue-500 text-white border-0 outline-0'><FaEye /></div>
                          </div>
                          <p className='overflow-hidden w-[94%] text-[14px] overflow-ellipsis whitespace-nowrap leading-loose text-slate-400'>{data?.task_description}</p>
                          <div className='w-full flex items-center'>
                            <div onClick={() => handleBackTask(data?.task_id, 'review')} className='px-3 cursor-pointer active:scale-[0.98] hover:bg-blue-500 hover:text-white hover:border-white duration-100 z-40 py-[6px] mr-3 mt-3 mb-1 bg-transparent text-black rounded-md border-[1px] border-black outline-0'>
                              <FaArrowLeft />
                            </div>
                            <div className='flex w-max'>
                              <div onClick={() => handleRemove(data?.task_id)} className='px-3 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100 z-40 py-[7.2px] mt-3 mb-1 bg-red-500 text-white rounded-md border-0 outline-0'><FaTrash /></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ):
                      null
                  }
                </div>
              </div>
            </div>

            {/* Popup */}
            <PopupBoard 
              show={show} 
              cancel={() => {
                setShow(false)
                setType("")
              }} 
              type={type} 
              status={() => setStatus(true)}
            />
        </div>
    </div>
  )
}

export default () => (
  <ProviderMain>
    <Board />
  </ProviderMain>
)
