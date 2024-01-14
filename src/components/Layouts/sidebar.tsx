"use client";

import API from "@/services/api";
import ProviderMain from "@/store/provider";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import SweetAlert from "../alertBox";

interface sidebareProps {
  type?: string
}

const Sidebar: React.FC<sidebareProps> = ({
  type
}) => {

  const auth = useSelector((state: any) => state.authSlice.auth)
  const boards = useSelector((state: any) => state.boardSlice.board) || []

  const params = useParams()
  const board_id = params ? (params.board_id as string) : null

  const [name, setName] = useState<string>('')
  const [access, setAccess] = useState<boolean>(false)
  const [workspace, setWorkspace] = useState<any[]>([])
  const [board, setBoard] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      
      if(board_id && typeof board_id === 'string') {
        const responseMember = await API.getMembers(board_id)
        setMembers(responseMember.data.data)
        setStatus(false)
      }

      const getWorkspace = await API.getAllWorkspaceById(auth ? auth.user_id : '')
      const getBoardInvited = await API.getBoardInvited(auth ? auth.user_id : '')
      
      setWorkspace(getWorkspace.data.data)
      setBoard(getBoardInvited.data.data)

      const name = auth?.username
      const nameNow  = name.split(" ")
      const resultName = []

      for(let i=0; i < Math.min(2, nameNow.length); i++) {
        resultName.push(nameNow[i].charAt(0))
      }

      const yourName = resultName.join("")
      setName(yourName)
    })()
  }, [board_id, status, workspace])

  useEffect(() => {
    const resultAccess = boards && boards[0] && boards[0].filter((data: any) => data.board_access === auth?.user_id)
    if(resultAccess && resultAccess.length > 0) {
      setAccess(true)
    } else{{
      setAccess(false)
    }}
  }, [board_id, access, status])

  const handleRemoveMember = async (user_id?: string) => {
    
    const data = {
      user_id,
      board_id
    }
    
    const result = await API.removeMember(data)
    if(result.data.status === 200) {
      SweetAlert({
        text: 'Successfully to kick',
        icon: 'success',
        showCancelButton: false,
      })
      setStatus(true)
    }
  }

  switch(type) {
    case "with-board":
      return (
        <div className="md:block hidden relative left-0 top-0 h-screen border-r-[1px] border-r-slate-200 w-[23vw] overflow-y-auto bg-white">
          <div className="w-full flex items-center h-[49px]">
            <Link href={'/'}>
              <h2 className="font-bold cursor-pointer hover:brightness-[90%] active:scale-[0.98] text-[22px] relative top-3 left-5">
                  flowTrush
              </h2>
            </Link>
          </div>
    
          <div className="w-full border-y-[1px] p-5 border-y-slate-200 my-5 h-max flex items-center">
            <div className='text-white rounded-lg w-[50px] h-[50px] overflow-hidden text-[20px] bg-blue-400 text-center flex items-center justify-center'>
                <p>{name ? name : '-'}</p>
            </div>
            <p className='ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[70%]'>{ auth ? auth.username : '' }</p>
          </div>
    
          <div className="w-full px-4 h-max">

            <h2 className="mb-3 relative font-bold">Members</h2>
            <div className='w-full p-2 text-black h-max'>
              {
                members && members.length > 0 ? (
                  members.map((data: any, index: number) => (
                    <div key={index} className="w-full h-[50px] flex items-center mb-4">
                      <div className="h-full w-[50px] rounded-lg overflow-hidden bg-contain flex items-center justify-center bg-blue-400 text-white font-bold">
                        {data?.username && data.username.split(' ').map((word: any) => word.substring(0, 1)).join('')}
                      </div>
                      <p className='max-w-[55%] overflow-hidden overflow-ellipsis whitespace-nowrap ml-2 text-black'>{data?.username}</p>
                      {
                        access ? (
                          <FaTimes onClick={() => handleRemoveMember(data?.user_id)} className='text-red-500 cursor-pointer ml-auto cursor-pointer active:scale-[0.99] hover:brightness-[95%]' />
                        ):
                          null
                      }
                    </div>
                  ))
                ):
                  <div className="w-full h-[45px] border border-slate-300 rounded-md pl-2 flex items-center font-normal text-slate-400 text-[14px] bg-slate-100">
                    <p>You only</p>
                  </div>
              }
            </div>

            <hr className='my-3'/>
            <h2 className="ml-2 mt-5 font-bold">Your workspaces</h2>
            <div className='w-full p-2 text-black h-max mt-3 cursor-pointer hover:brightness-[90%] duration-100 action:scale-[0.98]'>
              {
                workspace && workspace.length > 0 ? (
                  workspace.map((data: any, index: number) => (
                    <Link href={`/workspace/${data?.workspace_id}`} key={index}>
                      <div className="w-full h-[50px] flex items-center mb-4 active:scale-[0.97] hover:brightness-[90%]">
                        <div className="h-full w-[50px] rounded-lg overflow-hidden bg-contain flex items-center justify-center bg-blue-400 text-white font-bold">
                          {data?.workspace_title && data.workspace_title.split(' ').map((word: any) => word.substring(0, 1)).join('')}
                        </div>
                        <p className='max-w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap ml-2 text-black'>{data?.workspace_title}</p>
                       </div>
                    </Link>
                  ))
                ):
                  <div className="w-full h-[45px] border border-slate-300 rounded-md pl-2 flex items-center font-normal text-slate-400 text-[14px] bg-slate-100">
                    <p>Not found...</p>
                  </div>
              }
            </div>

            <hr className='mb-3' />
            <h2 className="mt-3 ml-2 font-bold">Board invited</h2>
            <div className='w-full p-2 text-black h-max mt-3 mb-5 cursor-pointer hover:brightness-[90%] duration-100 action:scale-[0.98]'>
              {
                board && board.length > 0 ? (
                  board.map((data: any, index: number) => (
                    <Link href={`/board/${data?.board_id}`} key={index}>
                      <div className="w-full h-[50px] flex items-center mb-4 active:scale-[0.97] hover:brightness-[90%]">
                        <div className="h-full w-[50px] rounded-lg overflow-hidden bg-contain flex items-center justify-center bg-blue-400 text-white font-bold">
                          {data?.board_title && data.board_title.split(' ').map((word: any) => word.substring(0, 1)).join('')}
                        </div>
                        <p className='max-w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap ml-2 text-black'>{data?.board_title}</p>
                       </div>
                    </Link>
                  ))
                ):
                  <div className="w-full h-[45px] border border-slate-300 rounded-md pl-2 flex items-center font-normal text-slate-400 text-[14px] bg-slate-100">
                    <p>Not found...</p>
                  </div>
              }
            </div>

          </div>
        </div>
      )
    default:
      return (
        <div className="md:block hidden relative left-0 top-0 h-screen border-r-[1px] border-r-slate-200 w-[23vw] overflow-y-auto bg-white">
          <div className="w-full flex items-center h-[49px]">
            <Link href={'/'}>
              <h2 className="font-bold cursor-pointer hover:brightness-[90%] active:scale-[0.98] text-[22px] relative top-3 left-5">
                  flowTrush
              </h2>
            </Link>
          </div>
    
          <div className="w-full border-y-[1px] p-5 border-y-slate-200 my-5 h-max flex items-center">
            <div className='text-white rounded-lg w-[50px] h-[50px] overflow-hidden text-[20px] bg-blue-400 text-center flex items-center justify-center'>
                <p>{name ? name : '-'}</p>
            </div>
            <p className='ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[70%]'>{ auth ? auth.username : '' }</p>
          </div>
    
          <div className="w-full px-4 h-max">
            <h2 className="ml-2 font-bold">Your workspaces</h2>
            <div className='w-full p-2 text-black h-max mt-3 cursor-pointer hover:brightness-[90%] duration-100 action:scale-[0.98]'>
               {
                workspace && workspace.length > 0 ? (
                  workspace.map((data: any, index: number) => (
                    <Link href={`/workspace/${data?.workspace_id}`} key={index}>
                      <div className="w-full h-[50px] flex items-center mb-4 active:scale-[0.97] hover:brightness-[90%]">
                        <div className="h-full w-[50px] rounded-lg overflow-hidden bg-contain flex items-center justify-center bg-blue-400 text-white font-bold">
                          {data?.workspace_title && data.workspace_title.split(' ').map((word: any) => word.substring(0, 1)).join('')}
                        </div>
                        <p className='max-w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap ml-2 text-black'>{data?.workspace_title}</p>
                       </div>
                    </Link>
                  ))
                ):
                  <div className="w-full h-[45px] border border-slate-300 rounded-md pl-2 flex items-center font-normal text-slate-400 text-[14px] bg-slate-100">
                    <p>Not found...</p>
                  </div>
               }
            </div>

            <hr />
               
            <h2 className="mt-3 ml-2 font-bold">Board invited</h2>
            <div className='w-full p-2 text-black h-max mt-3 mb-5 cursor-pointer hover:brightness-[90%] duration-100 action:scale-[0.98]'>
              {
                board && board.length > 0 ? (
                  board.map((data: any, index: number) => (
                    <Link href={`/board/${data?.board_id}`} key={index}>
                      <div className="w-full h-[50px] flex items-center mb-4 active:scale-[0.97] hover:brightness-[90%]">
                        <div className="h-full w-[50px] rounded-lg overflow-hidden bg-contain flex items-center justify-center bg-blue-400 text-white font-bold">
                          {data?.board_title && data.board_title.split(' ').map((word: any) => word.substring(0, 1)).join('')}
                        </div>
                        <p className='max-w-[70%] overflow-hidden overflow-ellipsis whitespace-nowrap ml-2 text-black'>{data?.board_title}</p>
                       </div>
                    </Link>
                  ))
                ):
                  <div className="w-full h-[45px] border border-slate-300 rounded-md pl-2 flex items-center font-normal text-slate-400 text-[14px] bg-slate-100">
                    <p>Not found...</p>
                  </div>
              }
            </div>
          </div>
        </div>
      )
  }
}

export default ({type}: sidebareProps) => (
  <ProviderMain>
    <Sidebar type={type} />
  </ProviderMain>
)
