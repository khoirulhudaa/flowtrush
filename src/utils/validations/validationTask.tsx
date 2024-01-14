import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';
import store from '@/store/store';

export const useTaskFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal
  const board_id = store.getState().boardSlice.board_id
  const workspace_id = store.getState().workSpaceSlice.workspace_id

  const formik = useFormik<taskInterface>({
    initialValues: {
      task_title: '',
      description_task: '',
      file_task: null,
    },
    validationSchema: Yup.object({
        task_title: Yup.string()
        .max(30, 'Maximum only 30 characters')
        .required('This field is required!'),
        description_task: Yup.string()
        .max(150, 'Maximum only 150 characters')
        .required('This field is required!'),
        file_task: Yup.mixed()
        .test('fileType', 'Only JPG, PNG', (value: any) => {
            const supportedFormats = ['image/jpeg', 'image/png'];
            if (!value) return true;
            const fileExtension = value.type;
            const isExtensionSupported = supportedFormats.includes(fileExtension);
            return isExtensionSupported;
        })
        .test('fileSize', 'Maximal size is 5MB.', (value: any) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .notRequired()
    }),
    onSubmit: async (values: any, {resetForm}) => {
      if(abortSignal.aborted) return

      const formData = new FormData()
      formData.append('board_id', board_id)
      formData.append('task_title', values.task_title)
      formData.append('task_description', values.description_task)
      formData.append('workspace_id', workspace_id)
      if(values.file_task && values.file_task !== null) {
        formData.append('file_task', values.file_task);
      }
      
      const response = await API.createTask(formData);
      
      if (response.data.status === 200) {
        onResponse(response.data.status)
        resetForm()
      } else {
        onError(response.data.message)
      }
    }
  });

  return formik

};
