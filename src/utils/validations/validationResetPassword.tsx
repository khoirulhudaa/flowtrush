import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import API from '../../services/api';
import { useParams } from 'next/navigation';



export const useResetPassword = ({onError}: {onError?: any}) => {
    const navigate = useRouter()

    const params = useParams()
    const token = params ? (params.token as string) : null

    const formik = useFormik<any>({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('Required'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                if (token) {
                    const body = {
                        token,
                        password: values.password
                    }
                    const response: AxiosResponse = await API.resetPassword(body)
                    console.log(response)
                    if (response.data.status === 200) {
                        resetForm()
                        navigate.push('/auth')
                    }else {
                        onError('Invalid token!')
                    }
                } 
            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}