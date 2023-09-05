import React from 'react'
import "./VerifSend.css"
import { useSearchParams  } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

import backgroundImage from '../assets/img/register_bg_2.png';
function VerifSend() {
//url  = https://the-bosses-pi-dev-h2f8.vercel.app/main/ride?type=send
let [searchParams, setSearchParams] = useSearchParams();
// console.log(searchParams.get('email'));
const email  = searchParams.get('email');

const navigate = useNavigate()
const goHome = ()=>{
    navigate("/login")
}

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
     <div className="content">
  <div className="wrapper-1 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
    <div className="wrapper-2">
      <h1 className=''>Thank you !</h1>
      <p>Thanks for registering.  </p>
      <p>you should receive a confirmation email soon  </p>
      <p>on <b>{email}</b> </p>
      <button onClick={goHome}  className="go-home bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
      go home
      </button>
    </div>
    {/* <div className="footer-like">
      <p>Email not received?
       <a href="#">Click here to send again</a>
      </p>
    </div> */}
</div>
</div>
     
	  </section>
      </main>
    </>
  )
}

export default VerifSend