"use client"

import store from '@/store/store';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';

export const useBoardFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const auth = store.getState().authSlice.auth

  const params = useParams()
  const workspace_id = params ? (params.workspace_id as string) : null

  const formik = useFormik<taskInterface>({
    initialValues: {
      board_title: '',
      description_board: ''
    },
    validationSchema: Yup.object({
        board_title: Yup.string()
        .max(30, 'Maximum only 30 characters')
        .required('This field is required!'),
        description_board: Yup.string()
        .max(150, 'Maximum only 150 characters')
        .required('This field is required!'),
    }),
    onSubmit: async (values: any, {resetForm}) => {
      try {
      
      if(abortSignal.aborted) return

      const body = {
        board_title: values.board_title,
        board_description: values.description_board,
        workspace_id,
        board_access: auth ? auth.user_id : ''
      }
      
      const response = await API.createBoard(body);
      if (response.data.status === 200) {
          onResponse(response.data.status)
          resetForm()
      } else {
          onError(response.data.message)
      }
      
    } catch (error: any) {
        console.log('s', error)
        onError(error.message)
      }
    }
  });

  return formik

};
