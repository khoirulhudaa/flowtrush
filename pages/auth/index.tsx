"use client"

import '@/app/globals.css'
import FormGroup from '@/components/formGroup'
import ProviderMain from '@/store/provider'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BgAuth } from '../../public/images'
import SweetAlert from '@/components/alertBox'
import { useDispatch } from 'react-redux'
import { authSignOut } from '@/store/authSlice'

const Auth = () => {

 const [error, setError] = useState<string>('')
 const [type, setType] = useState<boolean>(false)

 const dispatch = useDispatch()

useEffect(() => {
  dispatch(authSignOut())
}, [])

 const handleResponse = (response: number) => {
  if(response === 200) {
    SweetAlert({
      title: 'Success',
      text: 'Success signUp!',
      showCancelButton: false,
      icon: 'success',
      onClick: () => setType(false)
    })
  }
 }

 const handleErrorMessage = (error: string) => {
    setError(error)
 }

  return (
    <div className='w-screen overflow-hidden h-screen flex'>
      <div className='w-screen md:w-[30vw] bg-white h-screen p-4 md:p-10'>
        <div className='mb-6 block mt-[20px]'>
            <h2 className='text-[35px] font-bold text-black mb-6'>{!type ? 'Sign in' : 'Sign up'}</h2>
            <FormGroup type={!type ? 'signIn' : 'signUp'} onClick={(type: boolean) => setType(type!)} error={error} handleResponse={handleResponse} handleErrorMessage={handleErrorMessage} />
        </div>
      </div>
      <div className='w-[70vw] hidden md:flex bg-blue-200 h-screen p-8'>
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
    <Auth />
  </ProviderMain>
)
