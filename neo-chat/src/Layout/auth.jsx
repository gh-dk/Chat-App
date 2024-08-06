// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import api from "./api";
// import "./auth.css";

// export default function Auth() {
//   const [page, setPage] = useState("login");
//   const [formData, setFormData] = useState({ email: "", password: "", name: "", avatar: "" });
//   const history = useHistory();

//   // Handle input changes for form fields
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle login submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/users/login", {
//         email: formData.email,
//         password: formData.password,
//       });
//       localStorage.setItem("accessToken", response.data.accessToken);
//       localStorage.setItem("refreshToken", response.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       history.push("/chats");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please check your credentials and try again.");
//     }
//   };

//   // Handle signup submission
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/users", {
//         username: formData.name,
//         email: formData.email,
//         password: formData.password,
//         avatar: formData.avatar, // Include avatar in signup data
//       });
//       localStorage.setItem("accessToken", response.data.accessToken);
//       localStorage.setItem("refreshToken", response.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       history.push("/chats");
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="auth">
//       {page === "login" ? (
//         <form className="form login" onSubmit={handleLogin}>
//           <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/26aa942b41f6c4959d6feb68814dd598.png?resize=1200x900&vertical=center" alt="Login" />
//           <h3>Login form</h3>
//           <p>lorem lorem lorem lorem</p>
//           <input
//             type="text"
//             placeholder="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <button type="submit">Login</button>
//           <br />
//           <p className="nextpagemsg">
//             Don't have an Account?{" "}
//             <span onClick={() => setPage("signup")}>Signup</span>
//           </p>
//         </form>
//       ) : (
//         <form className="form signup" onSubmit={handleSignup}>
//           <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/4a1054d82b00fd5b6544f1f3d33b3c6c.png" alt="Signup" />
//           <h3>Signup form</h3>
//           <p>lorem lorem lorem lorem</p>
//           <input
//             type="text"
//             placeholder="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             placeholder="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             name="avatar"
//             value={formData.avatar}
//             onChange={handleInputChange}
//           />
//           <button type="submit">Signup</button>
//           <br />
//           <p className="nextpagemsg">
//             Already have an Account?{" "}
//             <span onClick={() => setPage("login")}>Login</span>
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./api";
import "./auth.css";
import axios from "axios";

export default function Auth() {
  const [page, setPage] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "", avatar: "" });
  const history = useHistory();

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('user',JSON.stringify(response.data.user));
      // console.log("line 169 authjsx", response)

      history.push("/chats");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://localhost:3002/users", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar, // Include avatar in signup data
      });

      history.push("/chats");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth">
      {page === "login" ? (
        <form className="form login" onSubmit={handleLogin}>
          <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/26aa942b41f6c4959d6feb68814dd598.png?resize=1200x900&vertical=center" alt="Login" />
          <h3>Login form</h3>
          <p>lorem lorem lorem lorem</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Login</button>
          <br />
          <p className="nextpagemsg">
            Don't have an Account?{" "}
            <span onClick={() => setPage("signup")}>Signup</span>
          </p>
        </form>
      ) : (
        <form className="form signup" onSubmit={handleSignup}>
          <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/4a1054d82b00fd5b6544f1f3d33b3c6c.png" alt="Signup" />
          <h3>Signup form</h3>
          <p>lorem lorem lorem lorem</p>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
          />
          <button type="submit">Signup</button>
          <br />
          <p className="nextpagemsg">
            Already have an Account?{" "}
            <span onClick={() => setPage("login")}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
}

