import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { signAdminInterface } from '../interfaces/signAdminInterface';

export const useRegistrationFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const formik = useFormik<signAdminInterface>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Maximum only 15 characters')
        .required('This field is required!'),
      email: Yup.string()
        .email('Wrong format email!')
        .required('This field is required!'),
      password: Yup.string()
        .min(6, 'Maximum only 6 characters')
        .required('This field is required!'),
    }),
    onSubmit: async (values: any, {resetForm}) => {
      try {
      
      if(abortSignal.aborted) return
      
      const response = await API.createAccount(values);
      if (response.data.status === 200) {
        onResponse(response.data.status)
        resetForm()
      } else {
        onError(response.data.message)
      }
      
      } catch (error: any) {
        onError(error.message)
      }
    }
  });

  return formik

};
