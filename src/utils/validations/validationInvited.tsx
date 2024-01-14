import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { signAdminInterface } from '../interfaces/signAdminInterface';
import { useParams } from 'next/navigation';

export const useInvitedFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

    const params = useParams()
    const board_id = params ? (params.board_id as string) : null

    const formik = useFormik<signAdminInterface>({
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

                const data = {
                    board_id,
                    email: values.email
                }
                const response = await API.addMemberBoard(data)

                if(response.data.status === 401 || response.data.status === 404) {  
                    onError(response.data.message)
                }else {
                    resetForm()
                    onResponse(response.data.status)
                }
                
            } catch (error: any) {
                onError(error.message)
            }
        }
    })

    return formik
}