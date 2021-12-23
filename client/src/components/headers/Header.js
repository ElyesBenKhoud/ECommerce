import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const value = useContext(GlobalState);
  return (
    <Header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/"> DevAt Shop</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/"> Products</Link>
        </li>

        <li>
          <Link to="/login"> Login Or Register</Link>
        </li>
      </ul>
    </Header>
  );
};

export default Header;
