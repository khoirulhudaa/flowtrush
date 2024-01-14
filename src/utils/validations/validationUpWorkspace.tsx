import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';
import store from '@/store/store';
import { useEffect } from 'react';

export const useUpdateWorkSpaceFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const auth = store.getState().authSlice.auth
  const workspaceData = store.getState().workSpaceSlice.workspaceData || []
  const workspace_id = store.getState().workSpaceSlice.workspace_id
  const workspace = workspaceData && workspaceData[0]?.data?.data?.filter((data: any) => data.workspace_id === workspace_id)

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
        workspace_id: workspace_id ? workspace_id : '',
        workspace_description: values.workspace_description,
      }
      
      const response = await API.updateWorkspace(data);
      console.log('update workspace:', response)
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

  useEffect(() => {

    formik.setValues({
          workspace_title: workspace && workspace.length > 0 ? workspace[0]?.workspace_title : '',
          workspace_description: workspace && workspace.length > 0 ? workspace[0].workspace_description : '',
      })
  }, [workspaceData, workspace_id])

  return formik

};
