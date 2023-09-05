import "../fonts/material-icon/css/material-design-iconic-font.min.css";
import imageSignin from "../images/signin-image.jpg";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginAction } from "../redux/actions/authActions";
import Inputs from "../components/Inputs";
function Login1() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form, navigate));
  };

  return (
    <>
      <div class="main">
        <section class="sign-in">
          <div class="container">
            <div class="signin-content">
              <div class="signin-image">
                <figure>
                  <img src={imageSignin} alt="sing up image" />
                </figure>
              </div>

              <div class="signin-form">
                <h2 class="form-title">Sign in</h2>
                <form onSubmit={onSubmit} class="register-form" id="login-form">
                  <div class="form-group">
                  <label htmlFor="email" className="iconClass"><i class="zmdi zmdi-account"></i></label>
                    <Inputs
                      name="email"
                      label="Email"
                      type="text"
                      icon="fa-solid fa-at"
                      onChangeHandler={onChangeHandler}
                      errors={errors.email}
                    />
                  </div>
                  <div class="form-group">
                  <label htmlFor="password" className="iconClass"><i class="zmdi zmdi-lock"></i></label>
                    <Inputs
                      name="password"
                      label="Password"
                      type="password"
                      icon="fa-solid fa-key"
                      onChangeHandler={onChangeHandler}
                      errors={errors.password}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      class="agree-term"
                    />
                    <label for="remember-me" class="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
                  </div>
                  <div class="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      class="form-submit"
                      value="Log in"
                    />
                    <br/>
                    <Link to="/register">I don't have account</Link>
                  </div>
                </form>
                <div class="social-login">
                  <span class="social-label">Or login with</span>
                  <ul class="socials">
                    <li>
                      <a href="https://he-bosses-pi-dev-api.onrender.com/auth/facebook/callback">
                        <i class="display-flex-center zmdi zmdi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://he-bosses-pi-dev-api.onrender.com/auth/google">
                        <i class="display-flex-center zmdi zmdi-google"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login1;
