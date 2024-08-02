import React from "react";
import Logo from "../assets/logo.png";
import "./css/header.css";

export default function header() {
  return (
    <header>
      <h1>
        <img src={Logo} alt="logo" />
        NeoChat
      </h1>
      <div>
        <i className="ri-search-line"></i>
      </div>
    </header>
  );
}
