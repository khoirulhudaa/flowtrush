"use client"

import '@/app/globals.css'
import Header from '@/components/Layouts/header'
import Sidebar from '@/components/Layouts/sidebar'
import SweetAlert from '@/components/alertBox'
import PopupBoard from '@/components/popupBoard'
import API from '@/services/api'
import { getboard, getboardId } from '@/store/boardSlice'
import ProviderMain from '@/store/provider'
import { getWorkspaceId } from '@/store/workSpaceSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaPenAlt, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Workspace = () => {

  const [show, setShow] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [workspaces, setWorkspaces] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')
  const [type, setType] = useState<string>('board')

  const auth = useSelector((state: any) => state.authSlice.auth)
  const dispatch = useDispatch()
  
  const router = useRouter()
  const { workspace_id } = router.query

  useEffect(() => {

    (async () => {
      if(typeof workspace_id === 'string' && auth.user_id) {
        dispatch(getWorkspaceId(workspace_id))
        const body = {
          user_id: auth ? auth.user_id : '',  
          workspace_id
        }

        const resultBoards = await API.getAllBoardById(body)
        setWorkspaces(resultBoards.data.data)
        dispatch(getboard(resultBoards.data.data))
        setStatus(false)
      }
    })()
    workspace_id
  }, [workspace_id, status])

  const handleShow = () => {
    setStatus(true)
    setShow(false)
  }

  const removeBoard = async (data: any) => {
    const result = await API.removeBoard(data)
    if(result.data.status === 200) {
      SweetAlert({
        text: 'Successfully remove board!',
        icon: 'success',
        showCancelButton: false
      })
      setStatus(true)
    } else {
      SweetAlert({
        text: 'Failed remove board!',
        icon: 'error',
        showCancelButton: false
      })
    }
  }

  const handleRemoveBoard = async (board_id?: string) => {

    const data = {
      user_id: auth ? auth.user_id : '',
      board_id
    }

    SweetAlert({
      text: 'Confirm remove board ?',
      icon: 'question',
      onClick: () => removeBoard(data)
    })
  }

  const handleCreateBoard = () => {
    setShow(true)
    setType('board')
  }

  const handleDetailWorkspace = (board_id?: string) => {
    dispatch(getboardId(board_id))
    setShow(true)
    setType('update-board')
  }

  return (
    <div className='flex w-screen h-max md:h-screen md:overflow-hidden'>
      <Sidebar />
      <div className='relative px-4 w-full h-max md:h-screen overflow-y-auto bg-white'>
        <Header onChange={(e: any) => setSearch(e)} value={search} />
        
        <div className="w-full h-max py-6">
          <div className='flex items-center justify-between w-full'>
            <div className="w-full h-max px-6 flex items-center">
              <div className='text-white rounded-lg w-[50px] h-[50px] overflow-hidden text-[20px] bg-blue-400 text-center flex items-center justify-center'>
                  <p>{auth ? auth?.email.slice(0, 2) : ''}</p>
              </div>
              <p className='ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[85%]'>{auth ? auth?.email : ''}</p>
            </div>
          </div>
          <hr className='my-4' />
          <h2 className='relative my-5 text-[22px] ml-[25px] mt-6 font-bold'>Boards</h2>
          {
            workspaces && workspaces.length > 0 ? (
              <div className='w-full px-3 flex flex-wrap items-center justify-start'>
                  <div onClick={() => handleCreateBoard()} className='w-[96%] md:w-[30%] border-[1px] border-slate-200 px-6 h-[180px] m-4 rounded-lg cursor-pointer shadow-lg p-4 bg-white flex items-center justify-center flex-col hover:brightness-[95%] active:scale-[0.98]'>
                    <FaPlus />
                    <small className="mt-5 text-slate-400">Create new board</small>
                  </div>
                  {
                  search === "" ? (
                  workspaces.map((data: any, index: number) => (
                    <div className='relative border-[1px] border-slate-200 px-3 w-[96%] md:w-[30%] m-4 h-[180px] overflow-hidden rounded-lg cursor-pointer shadow-lg p-4 bg-white'>
                        <div className='w-full flex items-center justify-between'>
                          <Link href={`/board/${data?.board_id}`} key={index} className='text-blue-500 hover:text-blue-600 underline active:scale-[0.98] duration-100'>
                              <h2>{data?.board_title}</h2>
                          </Link>
                          <FaTrash onClick={() => handleRemoveBoard(data?.board_id)} className='text-red-500 cursor-pointer hover:brightness-[90%] active:scale-[0.98]' />
                        </div>
                        <hr className='my-3' />
                        <small className="mt-3 text-slate-400">{data?.board_description}</small>
                        <div onClick={() => handleDetailWorkspace(data?.board_id)} className='absolute right-3 bottom-3 z-40 shadow-lg w-[30px] h-[30px] text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full bg-blue-500 text-white border-0 outline-0 cursor-pointer hover:brightness-[90%] active:scale-[0.98]'><FaPenAlt /></div>
                    </div>
                  ))
                ) : (
                  workspaces
                    .filter((data: any) =>
                      data.board_title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredData: any, index: number) => (
                      <Link href={`/board/${filteredData?.board_id}`} key={index} className='w-[96%] md:w-[30%] m-4'>
                        <div className='w-full border-[1px] border-slate-200 px-3 h-[180px] overflow-hidden rounded-lg cursor-pointer shadow-lg p-4 bg-white hover:brightness-[95%] active:scale-[0.98]'>
                          <div className='w-full flex items-center justify-between'>
                            <h2>{filteredData?.board_title}</h2>
                            <FaTrash className='text-red-500 cursor-pointer hover:brightness-[90%] active:scale-[0.98]' />
                          </div>
                          <hr className='my-3' />
                          <small className="mt-3 text-slate-400">{filteredData?.board_description}</small>
                        </div>
                      </Link>
                    ))
                )}
              </div>
            ) : (
              <div onClick={() => setShow(true)} className='w-[96%] md:w-[30%] border-[1px] border-slate-200 px-6 h-[180px] m-4 rounded-lg cursor-pointer shadow-lg p-4 bg-white flex items-center justify-center flex-col hover:brightness-[95%] active:scale-[0.98]'>
                <FaPlus />
                <small className="mt-5 text-slate-400">Create new board</small>
              </div>
            )
          }
        </div>
      </div>

      {/* Create board */}
      <PopupBoard show={show} type={type} cancel={() => setShow(false)} status={() => handleShow()} />
    </div>
  )
}

export default () => (
  <ProviderMain>
    <Workspace />
  </ProviderMain>
)
