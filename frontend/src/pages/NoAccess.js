import React from 'react'
import './NoAccess.css';
import { withRouter } from 'react-router-dom';
function NoAccess() {



   

  const handleClick = () => {
    window.history.back();
  }
      



    
  return (
    <div className="page-wrap">
    <div className="page-not-found" style={{    marginTop: "-60%"
}}>
      <img src="https://res.cloudinary.com/razeshzone/image/upload/v1588316204/house-key_yrqvxv.svg" className="img-key" alt=""/>
      <h1 className="text-xl">
        <span>4</span>
        <span>0</span>
        <span className="broken">3</span>
      </h1>
      <h4 className="text-md">Access Denied !</h4>
      <h4 className="text-sm text-sm-btm" >You don’t have access to this area of application. Speak to your administrator to unblock this feature. You can go back to <button           style={{
			color:"red"
			
            }} onClick={handleClick}>previous page</button></h4>
    </div>
  </div>
  )
}

export default NoAccess