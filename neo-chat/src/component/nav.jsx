import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./css/nav.css";

export default function Nav() {
  const location = useLocation();

  return (
    <div className="nav">
      <NavLink
        to="/chats"
        className={({ isActive }) =>
          isActive ||
          location.pathname.startsWith("/chats") ||
          location.pathname.startsWith("/people") ||
          location.pathname.startsWith("/group")
            ? "active"
            : ""
        }
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
