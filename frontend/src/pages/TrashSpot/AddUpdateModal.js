import React from 'react'

function AddUpdateModal(props) {
    const openCloseModal = ()=>{
        props.openCloseModal()
    }

    const uploadTrashPicture = (event)=>{
        props.uploadTrashPicture(event)
    }

    const openDialog=()=>{
        props.openDialog()
    }

    const handleChange = (event) =>{
        props.handleChange(event)
    }

    const handleSelection = (event) =>{
        props.handleSelection(event)
    }

    const handleAccessTrash = (event) =>{
        props.handleAccessTrash(event)
    }

    const saveUpdateTrash= ()=>{
        props.saveUpdateTrash()
    }

    const setDescription = (value)=>{
        props.setDescription(value)
    }
  return (
    <>
    <div className="addModalBackground"></div>
    <div className="modalTrash">
      <div className="modalHeader">
        <div className="d-flex justify-content-between">
          <b>Declare or update a trash</b>
          <button onClick={openCloseModal} className="closeModal">
            X
          </button>
        </div>
      </div>
      <div className="modalContent">
        <div className="d-flex justify-content-center">
          <div className="picturePart mt-2">
            <h4>Trash picture</h4>

            {props.picture == "" ? (<img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6nCWihzO02WGmWigw5eP7fl7NGFuFbxSIElYFA7w7z-Q5FYNM69_epX1S-NqP_LDFnE&usqp=CAU"} style={{"height":311}} height={400} width={400} />
              ) : (<img src={props.picture} style={{"height":311}} height={400} width={400} />)}
            {/* <input type="file" className="mt-2" onChange={uploadTrashPicture} /> */}
            <input id='fileid' type='file' onChange={uploadTrashPicture} hidden/>
            <div className="d-flex">
            <input id='buttonid' type='button' className="mt-2 btn btn-primary" onClick={openDialog} value='Upload Image' />
            <p style={{"width":240,"wordWrap":"break-word"}}>{props.imageName}</p>
            </div>

            <div className="trashOtherInfo mt-1">
              <h5>Trash type:</h5>
              <select
                onChange={handleChange}
                name="trashType"
                className="trashType w-100 selectTrashSpot"
              >
                {props.options.map((option) => (
                  <option key={option.value} selected={props.type==option.value || option.value == "other" && ( props.type!="" && props.type!="plastic" && props.type!="steel" && props.type!="paper")} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {(props.type=="other" | ( props.type!="" && props.type!="plastic" && props.type!="steel" && props.type!="paper") )!=0 &&
              <div className="specifyTrashType mt-2">
                <label>Specify type: &nbsp;</label>
                {props.type!="other" ?
                <input onChange={handleChange} style={{"borderRadius":"10px"}} className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' value={props.type} placeholder="Type..." maxLength={29} type="text" />:
                <input onChange={handleChange} style={{"borderRadius":"10px"}} className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' placeholder="Type..." maxLength={29} type="text" />}
              </div>
              }
            </div>
            <div className="trashVolume mt-4">
              <h5>Trash volume</h5>
              <div className="d-flex justify-content-around">
                <div className="trashVolumeChoice">
                  <label>Small &nbsp;</label>
                  <input type="radio" checked={props.trashSize=="small"}  onChange={handleSelection} value="small"  name="trashVolume"/>
                </div>
                <div className="trashVolumeChoice">
                  <label>Medium &nbsp;</label>
                  <input type="radio" onChange={handleSelection} checked={props.trashSize=="medium"} value="medium" name="trashVolume" />
                </div>
                <div className="trashVolumeChoice">
                  <label>Big &nbsp;</label>
                  <input type="radio"  onChange={handleSelection}  checked={props.trashSize=="big"} value="big" name="trashVolume" />
                </div>
              </div>
            </div>
            <div className="trashAccessDifficulty mt-4">
                  <h5>Difficult access</h5>
                  <label>Is it hard to access: &nbsp;</label>
                  <input checked={props.accessTrash} onChange={handleAccessTrash} type="checkbox" />
            </div>
            <div className="description mt-1">
                  
              <textarea maxLength={100} className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description.." defaultValue={props.description} style={{"width":400}} />
            </div>
            <div className="d-flex justify-content-center">
              {props.error == "Please wait..." ?
              <div className="errors mt-3">{props.error} <div  className="spinner-border"  style={{    marginBottom: "-10px"}} role="status">
                          <span className="visually-hidden">Loading...</span>
                          </div></div>:
              <div className="errors mt-3">{props.error}</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="footer d-flex justify-content-end">
        <button className="btn btn-success" disabled={props.error == "Please wdait..."} onClick={saveUpdateTrash}>
          {props.idTrash == -1? 'Add':'Update'}
        </button>
      </div>
    </div></>
  )
}

export default AddUpdateModal