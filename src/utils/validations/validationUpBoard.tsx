"use client"

import store from '@/store/store';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import * as Yup from 'yup';
import API from '../../services/api';
import { taskInterface } from '../interfaces/taskInterface';

export const useUpdateBoardFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

  const abortController = new AbortController()
  const abortSignal = abortController.signal

  
  const params = useParams()
  const workspace_id = params ? (params.workspace_id as string) : null
 
  const auth = store.getState().authSlice.auth
  const board_id = store.getState().boardSlice.board_id || []
  const boardData = store.getState().boardSlice.board || []
  const board = boardData && boardData[0]?.filter((data: any) => data.board_id === board_id)

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
        board_id: board_id ? board_id : '',
      }
      
      const response = await API.updateBoard(body);
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
        board_title: board && board.length > 0 ? board[0].board_title : '',
        description_board: board && board.length > 0 ? board[0].board_description : '',
    })
  }, [board_id])

  return formik

};
