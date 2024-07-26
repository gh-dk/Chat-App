import React,{useState,useEffect} from "react";
import "./css/users.css";
import Userslist from "./usersList";
import axios from 'axios';


function users() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/users`);
        setUser(response.data)
      } catch (error) {
        console.log("Error fetching users:",error);
      }
    }
    fetchUser();
  }, []);
  
  return (
    <div className="users">
      <header>
        <h1>NeoChat</h1>
        <div>
          <i className="ri-search-line"></i>
        </div>
      </header>
      <Userslist users={user} />
    </div>
  );
}

export default users;
