"use client"

import React, { useEffect, useRef } from 'react';

interface inputProps {
    label?: string,
    onBlur?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    onChange?: any,
    value?: any,
    placeholder?: string,
    type?: string,
    name?: string,
    id?: string,
    typeInput?: string,
    options?: { label: string, value: string }[],
    onError?: string | undefined,
    onTouched?: boolean | undefined,
    disabled?: boolean,
    datackEditor?: any,
    onChangeCKEditor?: any
}

const InputField = React.forwardRef(({
  label,
  onBlur,
  value,
  onChange,
  placeholder,
  type,
  name,
  id,
  typeInput,
  options,
  onError,
  onTouched,
  disabled,
  datackEditor,
  onChangeCKEditor
}: inputProps, ref: any) => {

    const editorRef = useRef<{ CKEditor: any; ClassicEditor: any } | null>(null);
    const { CKEditor, ClassicEditor } = (editorRef.current as { CKEditor: any; ClassicEditor: any }) || {};
   
    useEffect(() => {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
        ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      };
    }, []);

    switch (typeInput) {
      case "select-input":
          return (
              <>
                <label className='mb-3' htmlFor={id}>{label}</label>
                <select 
                    id={id}
                    disabled={disabled}
                    name={name} 
                    ref={ref}
                    className={`w-[100%] rounded-md text-[14px] bg-white outline-0 border-[1px] p-2 box-sizing ${onError && onTouched ? 'border-red-500 text-[red]' : ''}${disabled ? 'bg-gray-100' : '' }`} 
                    value={value !== undefined ? value : (type === 'number' ? 0 : '')} 
                    onChange={onChange}
                    onBlur={onBlur}>
                    {
                        options && options.map((opt, index) => (
                            <option key={opt.value} value={opt.value} disabled={index === 0}>
                                {opt.label}
                            </option>
                        ))
                    }
                </select>
                {
                    onError && onTouched ? (
                        <small className='text-[red] text-[12px] font-normal my-2'>
                            {onError}
                        </small>
                    ): null
                }
            </>
        )
    case "textarea-input":
        return (
            <>
            <label className='mb-3' htmlFor={id}>{label}</label>
            <div className='mb-3' />
            <textarea
                id={id}
                name={name}
                disabled={disabled}
                value={value !== undefined ? value : (type === 'number' ? 0 : '')}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                style={{ height: '80px' }}
                className={`w-full p-2 rounded-md outline-slate-200 outline-[1px] border-[1px] border-slate-200 ${onError && onTouched ? 'border-red-500 text-red-500' : ''}${disabled ? 'bg-gray-100' : '' }`} // Tambahkan kelas sesuai kondisi yang sesuai
                placeholder={placeholder}
            >
            </textarea>
            {
                onError && onTouched ? (
                    <small className='text-[red] text-[12px] font-normal my-2'>
                        {onError}
                    </small>
                ): null
            }
          </>
        )
    case "ckEditor":
        return (
            <>
                <label className='mb-3' htmlFor={id}>{label}</label>
                <div className='mb-3' />
                <CKEditor
                    editor={ClassicEditor}
                    data={datackEditor}
                    onChange={onChangeCKEditor}
                />
            </>
        )
    default:
      return (
          <>
            <label className='mb-3' htmlFor={id}>{label}</label>
            <div className='mb-3' />
            <input
                id={id}
                type={type}
                name={name}
                ref={ref}
                disabled={disabled}
                value={value !== undefined ? value : (type === 'number' ? 0 : '')}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-2 rounded-md outline-slate-200 outline-[1px] border-[1px] border-slate-200 ${onError && onTouched ? 'border-red-500 text-red-500' : ''} ${disabled ? 'bg-gray-100' : '' }`} // Tambahkan kelas sesuai kondisi yang sesuai
                placeholder={placeholder}
            />
            {
                onError && onTouched ? (
                    <small className='text-[red] text-[12px] font-normal my-2'>
                        {onError}
                    </small>
                ): null
            }
          </>
      )
  }
});

export default InputField;
