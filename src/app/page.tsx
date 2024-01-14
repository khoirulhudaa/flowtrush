"use client"

import '@/app/globals.css';
import Header from "@/components/Layouts/header";
import Button from "@/components/button";
import PopupBoard from '@/components/popupBoard';
import ProviderMain from '@/store/provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backpack } from '../../public/images';
import API from '@/services/api';
import Link from 'next/link';
import { getNameWorkspace, getWorkspaceData, getWorkspaceId } from '@/store/workSpaceSlice';
import { FaPenAlt, FaPlus, FaTrash } from 'react-icons/fa';
import SweetAlert from '@/components/alertBox';

const Home = () => {

  const [show, setShow] = useState<boolean>(false)
  const [type, setType] = useState<string>("workspace")
  const [status, setStatus] = useState<boolean>(false)
  const [workspace, setWorkspace] = useState<any[]>([])
  const auth = useSelector((state: any) => state.authSlice.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const getWorkspace = await API.getAllWorkspaceById(auth ? auth.user_id : '')
      setWorkspace(getWorkspace.data.data)
      dispatch(getWorkspaceData(getWorkspace))
      setStatus(false)
      setShow(false)
    })()
  }, [auth, status])

  const handleStatus = () => {
    setShow(false)
    setStatus(true)
  }

  const handleWorkspaceName = (title: string) => {
    dispatch(getNameWorkspace(title))
  }

  const removeWorkspace = async (data: any) => {
    console.log(data)
    const [ result, resultWorkspace, resultTask] = await Promise.all([
      API.removeWorkspace(data),
      API.removeAllBoard(data?.workspace_id),
      API.removeAllTask(data?.workspace_id)
    ])
    console.log(result)
    console.log(resultWorkspace)
    console.log(resultTask)
    if(result.data.status === 200 && resultWorkspace && resultTask) {
      SweetAlert({
        text: 'Successfully remove workspace!!',
        icon: 'success',
        showCancelButton: false
      })
      setStatus(true)
    } else {
      SweetAlert({
        text: 'Failed process remove workspace!',
        icon: 'error',
        showCancelButton: false
      })
    }
  } 

  const handleRemoveWorkspace = async (workspace_id?: string) => {
    const data = {
      user_id: auth ? auth.user_id : '',
      workspace_id
    }

    SweetAlert({
      text: 'Confirm remove workspace ?',
      icon: 'question',
      onClick: () => removeWorkspace(data)
    })
  }

  const handleDetailWorkspace = (workspace_id?: string) => {
    dispatch(getWorkspaceId(workspace_id))
    setShow(true)
    setType('update-workspace')
  }

  return (
    <div className='flex w-screen h-max md:h-screen md:overflow-hidden'>
      <div className='relative px-4 w-full h-max md:h-screen bg-white'>
        <Header 
          create={() => {
            setShow(true)
            setType("workspace")
          }}  
        />

        <h2 className='relative my-5 text-[22px] ml-[20px] mt-6 font-bold'>Workspaces</h2>
        <div className="w-full text-center mt-5 flex flex-wrap justify-start px-1 md:px-5 h-max">
        {
          workspace && workspace.length > 0 ? (
            <div onClick={() => setShow(true)} className='w-[100%] md:w-[30%] border-[1px] border-slate-200 px-6 h-[180px] m-4 rounded-lg cursor-pointer shadow-lg p-4 bg-white flex items-center justify-center flex-col hover:brightness-[95%] active:scale-[0.98]'>
              <FaPlus />
              <small className="mt-5 text-slate-400">Create new workspace</small>
            </div>
          ):
            null
        }
        {
          workspace && workspace.length > 0 ? (
            workspace?.map((data: any, index: number) => (
              <div key={index} className='flex text-left flex-col relative shadow-lg w-[100%] md:w-[30%] m-4 border border-slate-100 px-3 h-[180px] rounded-md pt-3 pb-2'>
                <div className='w-full flex items-center justify-between'>
                  <Link onClick={() => handleWorkspaceName(data?.workspace_title)} href={`/workspace/${data.workspace_id}`} className='max-w-[85%] overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    <h2 className='text-[18px] text-blue-500 hover:text-blue-600 underline active:scale-[0.98] duration-100 w-full'>{data?.workspace_title}</h2>
                  </Link>
                  <div className='flex items-center'>
                    <div onClick={() => handleDetailWorkspace(data?.workspace_id)} className='w-[30px] h-[30px] text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative bg-blue-500 text-white border-0 outline-0 cursor-pointer hover:brightness-[90%] active:scale-[0.98]'><FaPenAlt /></div>
                    <div onClick={() => handleRemoveWorkspace(data?.workspace_id)} className='w-[30px] h-[30px] text-[12px] flex items-center justify-center board-[0px] outline-none rounded-full relative bg-red-500 text-white border-0 outline-0 cursor-pointer hover:brightness-[90%] active:scale-[0.98] ml-3'><FaTrash /></div>
                  </div>
                </div>
                <hr className='mt-3' />
                <p className='mt-3 text-slate-400 text-[12px] font-normal max-w-[90%] overflow-hidden overflow-ellipsis whitespace-nowrap'>
                  {data?.workspace_description}
                </p>
              </div>
            ))
          ):
            <div className='text-center flex flex-col justify-center ml-auto mr-auto items-center relative top-[60px] md:top-[100px]'>
              <Image 
                src={Backpack}
                alt="workSpace"
                width={150}
                height={150}
              />
              <p className='my-7'>
                Come on, create your workspace
              </p>
              <Button text='Create workspace' onClick={() => setShow(true)} />
            </div>
        }  
        
        </div>
      </div>

      {/* Create workspace */}
      <PopupBoard show={show} type={type} cancel={() => setShow(false)} status={() => handleStatus()} />
    </div>
  )
}

export default () => (
  <ProviderMain>
    <Home />
  </ProviderMain>
)