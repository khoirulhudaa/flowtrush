import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import API from '../../services/api';


export const useForgotPassword = ({onError}: {onError?: any}) => {
    const navigate = useRouter()

    const formik = useFormik<any>({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('This field is required.'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                const response: AxiosResponse = await API.sendEmailResetPassword(values)
                console.log('response forgot pass:', response)
                if(response.data.status === 200) {
                    resetForm()
                    navigate.push('/auth/sendEmailMessage')
                }else {
                    onError("Failed sent email!")
                }

            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}