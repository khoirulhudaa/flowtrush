'use client'

import '@/app/globals.css'
import ProviderMain from '@/store/provider'
import Image from 'next/image'
import React from 'react'
import { Success } from '../../public/images'
import Button from '@/components/button'
import Link from 'next/link'

const SendEmailMessage = () => {
  return (
    <div className='w-screen h-screen flex flex-col bg-blue-100 justify-center items-center'>
        <Image 
            src={Success}
            alt='Success icon'
            width={200}
            height={200}
        />
        <p className='my-5 text-slate-500'>Successfully sent email message</p>
        <Link href={'/'}>
            <Button text='Back to home' />
        </Link>
    </div>
  )
}

export default () => (
    <ProviderMain>
      <SendEmailMessage />
    </ProviderMain>
)
  
