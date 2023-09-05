import React from 'react'
import '../fonts/material-icon/css/material-design-iconic-font.min.css'
import imageSignup from '../images/signup-image.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Registration } from '../redux/actions/authActions'
import { Link, useNavigate } from 'react-router-dom'
import  { useState } from 'react'
import Inputs from '../components/Inputs'


function Register1() {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const errors = useSelector(state=>state.errors)
      const onChangeHandler = (e)=>{
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
    
      const onSubmit = (e)=>{
        e.preventDefault();
        dispatch(Registration(form, navigate))
        }
      
  return (
    <>
    <div class="main">
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="register-form"onSubmit={onSubmit}>
                            <div class="form-group">
                                <label htmlFor="firstName" className='iconClass'><i class="zmdi zmdi-account"></i></label>
                                <Inputs name="firstName" type="text" placeholder="Your firstName" onChangeHandler={onChangeHandler}  errors={errors.firstName}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="lastName" className='iconClass'><i class="zmdi zmdi-account"></i></label>
                                <Inputs name="lastName" type="text" placeholder="Your lastName" onChangeHandler={onChangeHandler}  errors={errors.lastName}/>
                            </div>
                            <div class="form-group">
                                <label  htmlFor= "  email" className='iconClass'> <i class="zmdi zmdi-email"></i></label>
                                <Inputs name="email" type="text" placeholder="Your Email" onChangeHandler={onChangeHandler}  errors={errors.email}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="pass" className='iconClass'><i class="zmdi zmdi-lock"></i> </label>
                                <Inputs name="password"    type="password"  placeholder="Password" onChangeHandler={onChangeHandler}  errors={errors.password}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="re-pass" className='iconClass'><i class="zmdi zmdi-lock-outline"></i></label>
                                <Inputs  name="confirm"  type="password" placeholder="Repeat your password" onChangeHandler={onChangeHandler}  errors={errors.confirm}/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label htmlFor="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={imageSignup} alt="sing up image"/></figure>
                        <Link to="/login">I have account</Link>

                    </div>
                </div>
            </div>
        </section>

     

    </div>



    </>
  )
}

export default Register1;