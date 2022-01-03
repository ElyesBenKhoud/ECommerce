import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const RenderRegister = (e) => {
    e.preventDefault();
    window.location.href = "/register";
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={loginSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Email ..."
                name="email"
                required
                value={user.email}
                onChange={onChangeInput}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                required
                autoComplete="on"
                value={user.password}
                onChange={onChangeInput}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <button className="button register__submit" onClick={RenderRegister}>
            {/* <Link to="/register" className="button__text"> */}
            Register
            {/* </Link> */}
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
