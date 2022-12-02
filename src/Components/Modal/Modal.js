import React from 'react'

function Modal({showModal,setShowModal}) {
  return (
    <>
        {showModal ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md w-96 h-96'>
            <i onClick={() => setShowModal(false)}>x</i>
        </div>
         : ""}
    </>
  )
}

export default Modal