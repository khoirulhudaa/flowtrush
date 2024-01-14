'use client'

import API from "@/services/api"
import ProviderMain from "@/store/provider"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { FaSignOutAlt, FaTrash } from "react-icons/fa"
import { useSelector } from "react-redux"
import SweetAlert from "../alertBox"
import Button from "../button"
import InputField from "../inputField"

interface headerProps {
    create?: any,
    onChange?: any,
    value?: string
}

const Header: React.FC<headerProps> = ({ create, onChange, value }) => {

  const [show, setShow] = useState<boolean>(false)
  const [statusSearch, setStatusSearch] = useState<boolean>(false)

  const router = useRouter();
  const auth = useSelector((state: any) => state.authSlice.auth)
  const workspaceName = useSelector((state: any) => state.workSpaceSlice.workspace)
  
  useEffect(() => {
      if (window.location.href.includes("/workspace")) {
          setStatusSearch(true)
        } else {
            setStatusSearch(false)
        }
    }, [window.location.href])
    
  const handleSignOut = () => {
    SweetAlert({
        text: 'So coming out?',
        icon: 'question',
        route: '/auth',
        navigate: router
    })
}

const handleDelete = async () => {
    const result = await API.removeAccount(auth ? auth.user_id : '')
    if(result.data.status === 200) router.push('/auth')
}

const deleteAccount = () => {
    SweetAlert({
        text: 'Confirm account deletion ?',
        icon: 'question',
        onClick: handleDelete
    })
}

  return (
    <div className="w-full px-2 md:px-6 py-3 border-b-[1px] border-b-slate-200 h-max flex items-center justify-between">
        <div className="w-max h-full hidden md:flex items-center">
            {
                statusSearch || window.location.href.includes("/board") ? (
                    <>
                        <ul className="mr-3">
                            <li>{workspaceName ? workspaceName : ''}</li>
                        </ul>
                    </>
                ):
                    <>
                        <ul className="mr-3">
                            <li>Homepage workspace</li>
                        </ul>
                        <Button text="Create workspace" onClick={create} />
                    </>
            }
        </div>
        <div className="w-full md:w-max h-full flex items-center md:justify-end justify-between relative">
            {
                window.location.href.includes("/workspace") ? (
                    <div className="mr-4 relative w-[60%] top-[-5px]">
                        <InputField 
                            name="search"
                            placeholder="Search your board..."
                            onChange={(e: any) => onChange(e.target.value)}
                            value={value}
                        />
                    </div>
                ):
                    null
            }
            <div title='signOut' onClick={() => handleSignOut()} className="w-[45px] cursor-pointer active:scale-[0.98] bg-red-500 text-white hover:brightness-[95%] flex justify-center items-center h-[45px] rounded-full overflow-hidden shadow-sm">
                <FaSignOutAlt />
            </div>
            <div onClick={() => setShow(!show)} className="w-[45px] cursor-pointer active:scale-[0.98] hover:brightness-[95%] flex justify-center items-center font-bold ml-4 h-[45px] border-[1px] border-slate-300 rounded-full text-white bg-blue-500 overflow-hidden shadow-sm">
            {auth?.username && auth.username.split(' ').map((word: any) => word.substring(0, 1)).join('')}
            </div>
            <div onClick={() => deleteAccount()} className={`absolute ${show ? 'flex' : 'hidden'} duration-100 right-0 z-[999999] bg-white rounded-lg overflow-hidden shadow-md border-[1px] active:scale-[0.97] border-slate-200 bottom-[-50px] w-max h-max`}>
                <div className="w-full h-[50%] cursor-pointer hover:brightness-90 active:scale-[0.97] flex items-center text-black px-[20px] py-[8px]"><FaTrash className='text-red-500 mr-3' /> Delete account</div>
            </div>
        </div>
    </div>
  )
}

export default ({create, onChange, value}: headerProps) => (
    <ProviderMain>
        <Header create={create} onChange={(e: any) => onChange(e)} value={value} />
    </ProviderMain>
)
