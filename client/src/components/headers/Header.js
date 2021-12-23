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

        <li>
          <img src={Close} alt="" width="30" />
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link>
          <img src={Cart} alt="" width="30" />
        </Link>
      </div>
    </Header>
  );
};

export default Header;
