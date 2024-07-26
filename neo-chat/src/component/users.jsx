import React from "react";
import "./css/users.css";

import Userslist from "./usersList";

export default function users() {
  return (
    <div className="users">
      <header>
        <h1>NeoChat</h1>
        <div>
          <i className="ri-search-line"></i>
        </div>
      </header>
      <Userslist />
    </div>
  );
}
