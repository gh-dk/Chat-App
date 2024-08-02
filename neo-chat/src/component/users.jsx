import React, { useState, useEffect } from "react";
import "./css/users.css";
import Userslist from "./usersList";
import axios from "axios";
import Header from "./header";

function users() {
  const [user, setUser] = useState([]);

  const [userSearch, setuserSearch] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_URL}/users`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="users">
      <Header />
      <div className="userListSearch">
        <i className="ri-search-line"></i>
        <input
          value={userSearch}
          onChange={(e) => setuserSearch(e.target.value)}
          placeholder="Search"
        />
        {userSearch.length > 0 ? <i onClick={()=>{setuserSearch('')}} className="ri-close-line"></i> : ""}
      </div>
      <Userslist users={user} />
    </div>
  );
}

export default users;
