import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/img/register_bg_2.png';
import "./VerifSend.css"

function VerifFail() {
    const navigate = useNavigate()
    
        setTimeout(()=>{
            navigate("/register")
        },3000)
  return (
    <>
    
    <main >
        <section className="relative w-full h-full py-40 min-h-screen bg-blueGray-800 bg-no-repeat bg-ful"
         style={{
          backgroundImage: `url(${backgroundImage})`,
  
          backgroundSize: 'cover',
        
              }}>
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
				backgroundImage: `url(${backgroundImage})`,

				backgroundSize: 'cover',
			
            }}
          ></div>
      <div className="container mx-auto px-4 h-full" style={{
              backgroundColor:"transparent",
			     marginTop:'5%'

			
            }}></div>
            <div  className="content">
                
  <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            
      <h1 className='wrapper-2' >Link expired</h1>
           <h3 className='wrapper-2'> Please wait we will redirect you to create another account</h3> 
            </div>
            
            </div>
	  </section>
      </main>
    </>
  )
}

export default VerifFail