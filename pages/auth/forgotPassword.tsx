"use client"

import '@/app/globals.css'
import ProviderMain from '@/store/provider'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BgAuth } from '../../public/images'
import { useDispatch } from 'react-redux'
import { authSignOut } from '@/store/authSlice'
import dynamic from 'next/dynamic'

const FormGroup = dynamic(() => import('@/components/formGroup'), {
  ssr: false,
  loading: () => <div className='w-screen h-screen z-[999999999999999] bg-white text-black text-center flex justify-center items-center text-[20px] font-normal fixed left-0 top-0'><p>Loading...</p></div>
})

const ForgotPassword = () => {

 const [error, setError] = useState<string>('')

 const dispatch = useDispatch()

useEffect(() => {
  dispatch(authSignOut())
}, [])

 const handleErrorMessage = (error: string) => {
    setError(error)
 }

  return (
    <div className='w-screen overflow-hidden h-screen flex'>
      <div className='w-screen md:w-[30vw] bg-white h-screen p-4 md:p-10'>
        <div className='mb-6 block mt-[20px]'>
            <h2 className='text-[35px] font-bold text-black mb-6'>Forgot password</h2>
            <FormGroup type={'forgotPassword'} error={error} handleErrorMessage={handleErrorMessage} />
        </div>
      </div>
      <div className='w-[70vw] md:flex hidden bg-blue-200 h-screen p-8'>
        <Image
          src={BgAuth}
          alt='background'
        />
      </div>
    </div>
  )
}

export default () => (
  <ProviderMain>
    <ForgotPassword />
  </ProviderMain>
)
