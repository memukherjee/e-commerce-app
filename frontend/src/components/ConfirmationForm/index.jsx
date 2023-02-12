import React from 'react'

export default function ConfirmationForm({text, success, cancel, close, successAction}) {
  return (
    <div className='flex flex-col justify-between items-center mb-4 gap-12'>
        <h1 className='font-medium text-2xl text-cyan-900 text-center'>{text || "Are you sure?"}</h1>
        <div className='flex justify-between w-full p-4 max-w-300'>
            <button className='w-24 bg-red-600 text-white px-4 py-1 rounded-sm shadow shadow-green-900 text-lg font-normal' onClick={successAction || close}>{success || "Ok"}</button>
            <button className='w-24 bg-gray-600 text-white px-4 py-1 rounded-sm shadow shadow-green-900 text-lg font-normal' onClick={close}>{cancel || "Cancel"}</button>
        </div>
    </div>
  )
}
