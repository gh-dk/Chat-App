import React, { useEffect, useState } from "react";
import "./css/home.css";
import Chats from "./chats";
import { NavLink, useLocation, Link } from "react-router-dom";

export default function home() {
  const location = useLocation();
  const [path, setpath] = useState();
  useEffect(() => {
    setpath(location.pathname);
  }, [location]);
  return (
    <div className="homepage">
      <header>
        <h1>NeoChat</h1>
        <div>
          <i className="ri-search-line"></i>
        </div>
      </header>

      <section className="chatfilter">
        <Link to="/" className={path == "/chats" ? "active" : ""}>
          <div>All</div>
        </Link>

        <Link
          to="/people"
          className={path == "/people" ? "active" : ""}
        >
          <div>People</div>
        </Link>

        <Link
          to="/group"
          className={path == "/group" ? "active" : ""}
        >
          <div>Group</div>
        </Link>
      </section>

      <Chats />
    </div>
  );
}
