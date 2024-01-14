'use client'

import Link from "next/link";
import { useLoginFormik } from "../utils/validations/validationLogin";
import { useRegistrationFormik } from "../utils/validations/validationRegister";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import InputField from "./inputField";
import { useForgotPassword } from "@/utils/validations/validationForgotPassword";
import { useResetPassword } from "@/utils/validations/validationResetPassword";

interface formGroupProps {
    type?: string,
    handleErrorMessage?: (args: string) => void,
    handleResponse?: (args: any) => void,
    onClick?: (args: any) => void,
    error?: string,
}

const FormGroup = ({ 
    type, 
    handleErrorMessage, 
    handleResponse,
    error,
    onClick,
}: formGroupProps) => {

const formik = useRegistrationFormik({ 
    onError: handleErrorMessage, 
    onResponse: handleResponse 
})

const formikSignIn = useLoginFormik({ 
    onError: handleErrorMessage,
})

const forgotPassword = useForgotPassword({ 
    onError: handleErrorMessage,
})

const resetPassword = useResetPassword({ 
    onError: handleErrorMessage,
})

switch(type) {
    case "signIn":
        return (
            <form className="space-y-5" onSubmit={formikSignIn.handleSubmit}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className="mb-5">
                    <InputField 
                        value={formikSignIn.values.email} 
                        name='email' 
                        label='Email admin'
                        onError={formikSignIn.errors.email}
                        onTouched={!!formikSignIn.touched.email}
                        onChange={formikSignIn.handleChange} 
                        onBlur={formikSignIn.handleBlur} 
                        placeholder="your@gmail.com" 
                    />
                </div>
                <div className="mb-5">       
                    <InputField 
                        value={formikSignIn.values.password} 
                        name='password' 
                        label='Kata sandi'
                        type='password'
                        onError={formikSignIn.errors.password}
                        onTouched={!!formikSignIn.touched.password}
                        onChange={formikSignIn.handleChange} 
                        onBlur={formikSignIn.handleBlur} 
                        placeholder="Masukan kata sandi" 
                    />
                </div>
                <br />
                <small className='mb-5'>Forgot password ? <Link href={'/auth/forgotPassword'} className='text-blue-500 cursor-pointer'>here</Link></small>
                <div className='flex items-center'>
                    <Button typeButton="submit" text="SIGN IN" />
                    <p className='text-[12px] ml-3'>You don't have account ? <a className="text-blue-400 cursor-pointer active:scale-[0.98]" onClick={() => onClick && onClick(true)}>here</a></p>
                </div>
            </form>
        )
    case "forgotPassword":
        return (
            <form className="space-y-5" onSubmit={forgotPassword.handleSubmit}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className="mb-5">
                    <InputField 
                        value={forgotPassword.values.email} 
                        name='email' 
                        label='Email'
                        onError={forgotPassword.errors.email}
                        onTouched={!!forgotPassword.touched.email}
                        onChange={forgotPassword.handleChange} 
                        onBlur={forgotPassword.handleBlur} 
                        placeholder="your@gmail.com" 
                    />
                </div>
                <br />
              <div className='flex items-center'>
                    <Button typeButton="submit" text="SEND NOW" />
                </div>
            </form>
        )
    case "resetPassword":
        return (
            <form className="space-y-5" onSubmit={resetPassword.handleSubmit}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className="mb-5">
                    <InputField 
                        value={resetPassword.values.password} 
                        name='password' 
                        label='New password'
                        onError={resetPassword.errors.password ?? ''}
                        onTouched={!!resetPassword.touched.password}
                        onChange={resetPassword.handleChange} 
                        onBlur={resetPassword.handleBlur} 
                        placeholder="your@gmail.com" 
                    />
                </div>
                <div className='flex relative top-4 items-center'>
                    <Button typeButton="submit" text="RESET PASSWORD" />
                </div>
            </form>
        )
    default :
        return (
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {
                error !== '' ? (
                    <ErrorMessage error={error} />
                ):
                    null
            }
            <div className="mb-5">
                <InputField 
                    value={formik.values.username} 
                    name='username' 
                    label='Nama admin'
                    id='sellerName'
                    onError={formik.errors.username}
                    onTouched={!!formik.touched.username}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    placeholder="Your name..." 
                />
            </div>
            <div className="mb-5">
                <InputField 
                    value={formik.values.email} 
                    name='email' 
                    label='Email admin'
                    id='email'
                    onError={formik.errors.email}
                    onTouched={!!formik.touched.email}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    placeholder="your@gmail.com" 
                />
            </div>
            <div className="mb-5">
                <InputField 
                    value={formik.values.password} 
                    name='password' 
                    id='password'
                    label='Kata sandi'
                    type='password'
                    onError={formik.errors.password}
                    onTouched={!!formik.touched.password}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    placeholder="Masukan kata sandi" 
                />
            </div>
          <div className='flex items-center'>
                <Button typeButton="submit" text="SIGN UP" />
                <p className='text-[12px] ml-3'>You have account ? <a className="text-blue-400 cursor-pointer active:scale-[0.98]" onClick={() => onClick && onClick(false)}>here</a></p>
            </div>
        </form>
        )
  }
}

export default FormGroup
