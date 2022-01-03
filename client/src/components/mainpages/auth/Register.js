import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const notify = () => toast("Check Your password or Your Email");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      notify();
    }
  };

  return (
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={registerSubmit}>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="text"
                class="login__input"
                placeholder="Your name goes here ..."
                name="name"
                required
                value={user.name}
                onChange={onChangeInput}
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="text"
                class="login__input"
                placeholder="Email ..."
                name="email"
                required
                value={user.email}
                onChange={onChangeInput}
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Password"
                name="password"
                required
                autoComplete="on"
                value={user.password}
                onChange={onChangeInput}
              />
            </div>
            <button class="button login__submit">
              <span class="button__text">Register Now</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <button class="button register__submit">
            <Link to="/login" class="button__text">
              Already have an Account
            </Link>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
