import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import API from '../../services/api';
import { authSignIn, saveToken } from '../../store/authSlice';
import { signAdminInterface } from '../interfaces/signAdminInterface';
import { useRouter } from 'next/router'

export const useLoginFormik = ({onError}: {onError?: any}) => {
    const dispatch = useDispatch()
    const navigate = useRouter()

    const formik = useFormik<signAdminInterface>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('This field is required.'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('This field is required.')
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                const response = await API.checkAccount(values)
                if(response.data.status === 401 || response.data.status === 404) {  
                    onError(response.data.message)
                }else {
                    dispatch(authSignIn(response.data.data))
                    dispatch(saveToken(response.data.token))
                    resetForm()
                    navigate.push('/')
                }
                
            } catch (error: any) {
                onError(error.message)
            }
        }
    })

    return formik
}