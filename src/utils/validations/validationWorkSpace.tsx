import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';
import store from '@/store/store';

export const useWorkSpaceFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const auth = store.getState().authSlice.auth

  const formik = useFormik<taskInterface>({
    initialValues: {
      workspace_title: '',
      workspace_description: ''
    },
    validationSchema: Yup.object({
        workspace_title: Yup.string()
        .max(30, 'Maximum only 30 characters')
        .required('This field is required!'),
        workspace_description: Yup.string()
        .max(150, 'Maximum only 150 characters')
        .required('This field is required!'),
      }),
    onSubmit: async (values: any, {resetForm}) => {
      try {
      
      if(abortSignal.aborted) return

      const data = {
        workspace_title: values.workspace_title,
        email: auth ? auth?.email : '',
        workspace_access: auth ? auth?.user_id : '',
        workspace_description: values.workspace_description,
      }
      
      const response = await API.createWorkspace(data);
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
