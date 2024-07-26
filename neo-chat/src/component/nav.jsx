import React from "react";
import { NavLink } from "react-router-dom";
import "./css/nav.css";

export default function Nav({ currentPath }) {
  console.log(currentPath);

  return (
    <div className="nav">
      <NavLink
        to="/chats" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="ri-chat-3-line"></i>
      </NavLink>

      <NavLink
        to="users"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="ri-user-line"></i>
      </NavLink>
      
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <i className="ri-settings-2-line"></i>
      </NavLink>
    </div>
  );
}
