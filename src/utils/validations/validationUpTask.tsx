import store from '@/store/store';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';

export const useUpdateTaskFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const task_id = store.getState().taskSlice.task_id
  const taskData = store.getState().taskSlice.task || []
  const task = taskData[0].length > 1 ? taskData[0]?.filter((data: any) => data.task_id === task_id) : taskData[0].length === 1 ? taskData[0] : null

  const formik = useFormik<taskInterface>({
    initialValues: {
      task_title: '',
      description_task: '',
      file_task: null,
      old_image: null,
    },
    validationSchema: Yup.object({
        task_title: Yup.string()
        .max(30, 'Maximum only 30 characters')
        .required('This field is required!'),
        description_task: Yup.string()
        .max(150, 'Maximum only 150 characters')
        .required('This field is required!'),
        file_task: Yup.mixed()
        .test('fileType', 'Only JPG, PNG, PDF, and DOCX allowed', (value: any) => {
            const supportedFormats = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
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

      console.log(values)

      const formData = new FormData()
      formData.append('task_id', task_id)
      formData.append('task_title', values.task_title)
      formData.append('task_description', values.description_task)
      if(values.file_task && values.file_task !== null) {
        formData.append('file_task', values.file_task);
      }
      
      const response = await API.updateTask(formData);

      console.log(response)
      
      if (response.data.status === 200) {
        onResponse(response.data.status)
        resetForm()
      } else {
        onError(response.data.message)
      }
    }
  });

  useEffect(() => {
    if (task && task.length > 0) {
      formik.setValues({
        task_title: task[0]?.task_title || '',
        description_task: task[0]?.task_description || '',
        old_image: task[0]?.attachment || '',
      });
    }
  }, [task_id, taskData]);

  return formik

};
