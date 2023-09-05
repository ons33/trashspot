import React from 'react'

function DeleteAcceptModal(props) {
    const closeDeleteModal = ()=>{
        props.setDeleteTrash()
    }
    const deleteTrashSpot = ()=>{
        props.deleteTrashSpot()
    }
  return (
    <>
    <div className="addModalBackground"></div>
    <div className='modalDelete'>
    <div className="modalHeader">
        <div className="d-flex justify-content-between">
          <b>Delete a Trash</b>
          <button onClick={closeDeleteModal} className="closeModal">
            X
          </button>
        </div>
      </div>
      <div className='mt-5' style={{textAlign:"center"}}>
       <h5>Delete selected spot?</h5> 
      </div>
      <div className='d-flex justify-content-between ml-2 mr-2 mt-4'>
        <button onClick={deleteTrashSpot} className='btn btn-danger'>Delete</button>
        <button onClick={closeDeleteModal}  className='btn btn-secondary'>Cancel</button>
      </div>
    </div>
    </>
  )
}

export default DeleteAcceptModal