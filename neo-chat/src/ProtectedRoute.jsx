// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import api from './Layout/api';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       return false;
//     }

//     try {
//       // Verify the token with your backend if needed
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/auth" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { validateToken } from "./Layout/api";
// import api from "./Layout/api";

const ProtectedRoute = ({ component: Component}) => {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    console.log("Protected Route");
    const isAuthenticated = async () => {
      try {
        const res = await validateToken(); // An endpoint to validate the token
        if (res.status != 200) {
          setIsAuth(false);
          console.log(res);
          return;
        }
      } catch (error) {
        console.log(error);
        setIsAuth(false);
      }
    };

    isAuthenticated();
  }, []);

  return <>{isAuth ? <Component /> : <Redirect to={'/auth'}/>}</>;
};

export default ProtectedRoute;
